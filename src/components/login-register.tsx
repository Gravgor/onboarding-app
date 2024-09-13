'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUser,
  FiBriefcase,
  FiPackage,
  FiLogIn,
  FiUserPlus,
  FiCheckCircle,
} from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { acceptInvitation } from "@/lib/actions/accept-invite";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  plan: z.enum(["starter", "pro", "enterprise"]),
});

const invitationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type InvitationFormData = z.infer<typeof invitationSchema>;

export const LoginRegisterInvite = () => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isAcceptingInvitation, setIsAcceptingInvitation] = useState(false);
  const [invitationDetails, setInvitationDetails] = useState<{
    email: string;
    company: string;
    role: string;
  } | null>(null);

  const searchParams = useSearchParams();
  const newUser = searchParams.get("newUser");
  const invitationToken = searchParams.get("token");

  const [isLogin, setIsLogin] = useState(newUser ? false : true);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const invitationForm = useForm<InvitationFormData>({
    resolver: zodResolver(invitationSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (invitationToken) {
      setIsLogin(false);
      setIsAcceptingInvitation(true);
      fetchInvitationDetails(invitationToken);
    }
  }, [invitationToken]);

  const fetchInvitationDetails = async (token: string) => {
    try {
      const response = await fetch(`/api/invitation-details?token=${token}`);
      if (response.ok) {
        const data = await response.json();
        setInvitationDetails(data);
      } else {
        setMessage({
          type: "error",
          text: "Invalid or expired invitation.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while fetching invitation details.",
      });
    }
  };

  const handleSubmit = async (
    data: LoginFormData | RegisterFormData | InvitationFormData
  ) => {
    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          //@ts-expect-error we dont want to throw error for if user is accepting invitation
          email: data.email ?? invitationDetails?.email,
          password: data.password,
        });

        if (result?.error) {
          setMessage({ type: "error", text: result.error });
        } else {
          router.push("/dashboard");
        }
      } else if (isAcceptingInvitation) {
        const invitationData = data as InvitationFormData;
        const response = await acceptInvitation(invitationToken as string, invitationData);

        if (response.success === true) {
          setMessage({
            type: "success",
            text: "Invitation accepted successfully! You can now log in.",
          });
          setIsAcceptingInvitation(false);
          setIsLogin(true);
        } else {
          setMessage({
            type: "error",
            text: "Failed to accept invitation",
          });
        }
      } else {
        const registerData = data as RegisterFormData;
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        });

        const result = await response.json();

        if (response.ok) {
          setMessage({
            type: "success",
            text: "Registration successful! Please check your email to verify your account.",
          });
        } else {
          setMessage({
            type: "error",
            text: result.error || "Registration failed",
          });
        }
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  const handleResetPassword = async (data: { email: string }) => {
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Resetting password for...", data.email);
      setMessage({
        type: "success",
        text: "Password reset instructions sent to your email.",
      });
      setIsResetPassword(false);
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  const renderForm = () => {
    if (isResetPassword) {
      return (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          onSubmit={loginForm.handleSubmit(handleResetPassword)}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                {...loginForm.register("email")}
                className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {loginForm.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Reset Password
          </motion.button>
        </motion.form>
      );
    }

    if (isAcceptingInvitation) {
      return (
        <motion.form
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          onSubmit={invitationForm.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          {invitationDetails && (
            <div className="text-center text-gray-300 mb-4">
              <p>You`&apos;`ve been invited to join {invitationDetails.company}</p>
              <p>as a {invitationDetails.role}</p>
            </div>
          )}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400"
            >
              Full Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                {...invitationForm.register("name")}
                className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {invitationForm.formState.errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {invitationForm.formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                {...invitationForm.register("password")}
                className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {invitationForm.formState.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {invitationForm.formState.errors.password.message}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={invitationForm.formState.isSubmitting}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 flex items-center justify-center"
          >
            {invitationForm.formState.isSubmitting ? (
              "Accepting Invitation..."
            ) : (
              <>
                <motion.span className="mr-2">
                  <FiCheckCircle />
                </motion.span>
                Accept Invitation
              </>
            )}
          </motion.button>
        </motion.form>
      );
    }

    return isLogin ? (
      <motion.form
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
        onSubmit={loginForm.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400"
          >
            Email
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              {...loginForm.register("email")}
              className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {loginForm.formState.errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {loginForm.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400"
          >
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              {...loginForm.register("password")}
              className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {loginForm.formState.errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {loginForm.formState.errors.password.message}
            </p>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loginForm.formState.isSubmitting}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 flex items-center justify-center"
        >
          {loginForm.formState.isSubmitting ?
            "Logging in..." : (
              <>
                <motion.span className="mr-2">
                  <FiLogIn />
                </motion.span>
                Login
              </>
            )}
        </motion.button>
      </motion.form>
    ) : (
      <motion.form
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        onSubmit={registerForm.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-400"
          >
            Full Name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              {...registerForm.register("name")}
              className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {registerForm.formState.errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {registerForm.formState.errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400"
          >
            Email
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              {...registerForm.register("email")}
              className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {registerForm.formState.errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {registerForm.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400"
          >
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              {...registerForm.register("password")}
              className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {registerForm.formState.errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {registerForm.formState.errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-400"
          >
            Company Name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiBriefcase className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="companyName"
              {...registerForm.register("companyName")}
              className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {registerForm.formState.errors.companyName && (
            <p className="mt-1 text-sm text-red-500">
              {registerForm.formState.errors.companyName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="plan"
            className="block text-sm font-medium text-gray-400"
          >
            Select Plan
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPackage className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="plan"
              {...registerForm.register("plan")}
              className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          {registerForm.formState.errors.plan && (
            <p className="mt-1 text-sm text-red-500">
              {registerForm.formState.errors.plan.message}
            </p>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={registerForm.formState.isSubmitting}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 flex items-center justify-center"
        >
          {registerForm.formState.isSubmitting ? (
            "Registering..."
          ) : (
            <>
              <motion.span className="mr-2">
                <FiUserPlus />
              </motion.span>
              Register
            </>
          )}
        </motion.button>
      </motion.form>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#111827] p-8 rounded-lg shadow-lg">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-8"
      >
        <FiUser className="mx-auto text-blue-500 text-4xl mb-2" />
        <h2 className="text-3xl font-bold text-blue-500">OnboardEase</h2>
        <p className="text-gray-400">Streamline Your Onboarding</p>
      </motion.div>
      <h3 className="text-2xl font-bold text-center text-white mb-6">
        {isResetPassword
          ? "Reset Password"
          : isAcceptingInvitation
          ? "Accept Invitation"
          : isLogin
          ? "Login to Your Account"
          : "Register Your Company"}
      </h3>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`mb-4 p-2 rounded ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </motion.div>
      )}
      <AnimatePresence mode="wait">{renderForm()}</AnimatePresence>
      <div className="mt-6 text-center space-y-2">
        {!isResetPassword && !isAcceptingInvitation && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-400 hover:text-blue-300 focus:outline-none focus:underline"
          >
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </motion.button>
        )}
        {isLogin && !isResetPassword && !isAcceptingInvitation && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsResetPassword(true)}
            className="block w-full text-sm text-blue-400 hover:text-blue-300 focus:outline-none focus:underline"
          >
            Forgot password?
          </motion.button>
        )}
        {(isResetPassword || isAcceptingInvitation) && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsResetPassword(false);
              setIsAcceptingInvitation(false);
              setIsLogin(true);
            }}
            className="block w-full text-sm text-blue-400 hover:text-blue-300 focus:outline-none focus:underline"
          >
            Back to login
          </motion.button>
        )}
      </div>
    </div>
  );
};