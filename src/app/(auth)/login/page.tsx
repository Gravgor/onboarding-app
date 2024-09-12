import { LoginRegisterInvite } from "@/components/login-register";
import { Suspense } from "react";


export default function Auth() {
return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginRegisterInvite />
      </Suspense>
    </div>
)
}
