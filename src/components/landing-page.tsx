"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import {
  UserPlus,
  Settings,
  Users,
  Rocket,
  ChevronLeft,
  ChevronRight,
  ClipboardCheckIcon,
  FileTextIcon,
  BarChartIcon,
  ChevronDown,
  Briefcase,
  CheckCircle
} from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export const Hero = () => {
    return (
      <section className="w-full py-24 md:py-32 lg:py-40">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-10 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-3xl mx-auto leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                Streamline Your Employee Onboarding
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-400 text-xl md:text-2xl">
              Simplify compliance, enhance efficiency, and create a great first impression for your new hires.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
              <Link href="/login?newUser=true" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
                Get Started
              </Link>
              <Link href="/demo" className="bg-transparent hover:bg-gray-800 text-blue-400 border border-blue-400 px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
                View Demo
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Easy Employee Addition</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Customizable Workflows</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Compliance Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

export const Features = () => {
  const features = [
    { icon: <ClipboardCheckIcon className="h-12 w-12 mb-4 text-blue-400" />, title: "Compliance Tracking", description: "Ensure all legal requirements are met with ease." },
    { icon: <FileTextIcon className="h-12 w-12 mb-4 text-blue-400" />, title: "Document Management", description: "Centralize and organize all onboarding documents." },
    { icon: <BarChartIcon className="h-12 w-12 mb-4 text-blue-400" />, title: "Progress Tracking", description: "Monitor onboarding progress in real-time." },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-400">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const HowItWorks = () => {
  const steps = [
    { icon: <UserPlus className="w-12 h-12 text-blue-400" />, title: "Sign Up", description: "Create your account in minutes" },
    { icon: <Settings className="w-12 h-12 text-blue-400" />, title: "Customize", description: "Tailor the onboarding process to your needs" },
    { icon: <Users className="w-12 h-12 text-blue-400" />, title: "Invite", description: "Add new hires to the platform" },
    { icon: <Rocket className="w-12 h-12 text-blue-400" />, title: "Onboard", description: "Guide employees through a smooth onboarding experience" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + steps.length) % steps.length);
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-blue-400"
        >
          How It Works
        </motion.h2>
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 shadow-lg rounded-lg p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  {currentIndex + 1}
                </div>
                {steps[currentIndex].icon}
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">{steps[currentIndex].title}</h3>
              <p className="text-gray-300">{steps[currentIndex].description}</p>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12 bg-gray-800 rounded-full p-2 shadow-md"
          >
            <ChevronLeft className="w-6 h-6 text-blue-400" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12 bg-gray-800 rounded-full p-2 shadow-md"
          >
            <ChevronRight className="w-6 h-6 text-blue-400" />
          </button>
        </div>
        <div className="flex justify-center mt-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export const PricingPlans = () => {
  const plans = [
    { name: "Starter", price: "$29", features: ["Basic onboarding", "Up to 10 employees", "Email support"] },
    { name: "Pro", price: "$79", features: ["Advanced onboarding", "Up to 100 employees", "Priority support", "Custom branding"] },
    { name: "Enterprise", price: "Custom", features: ["Full-scale onboarding", "Unlimited employees", "24/7 support", "API access"] }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-blue-400"
        >
          Pricing Plans
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6 text-blue-400">{plan.price}</p>
                <ul className="mb-8 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-gray-300">{feature}</li>
                  ))}
                </ul>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">Choose Plan</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const FAQ = () => {
  const faqs = [
    { question: "How long does implementation take?", answer: "Typically, our implementation process takes 2-4 weeks, depending on your specific needs and customizations." },
    { question: "Can I integrate with my existing HR software?", answer: "Yes, we offer integrations with many popular HR and payroll systems. Contact us for specific integration details." },
    { question: "Is my data secure?", answer: "Absolutely. We use industry-standard encryption and security practices to keep your data safe and compliant with regulations." }
  ];

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-blue-400"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
                <CollapsibleTrigger className="flex justify-between items-center w-full text-left px-4 py-2 bg-gray-800 rounded-lg shadow-sm hover:bg-gray-700 transition-colors">
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <ChevronDown className={`h-5 w-5 text-blue-400 transition-transform duration-200 ${openItems.includes(index) ? 'transform rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <AnimatePresence initial={false}>
                  {openItems.includes(index) && (
                    <CollapsibleContent forceMount>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pt-2 pb-4 text-gray-300 bg-gray-800 rounded-b-lg">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    </CollapsibleContent>
                  )}
                </AnimatePresence>
              </Collapsible>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const CTA = () => {
  return (
    <section className="py-16 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-white"
        >
          Ready to streamline your onboarding?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 text-gray-100"
        >
          Get started today and see the difference for yourself.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button className="bg-white text-blue-600 hover:bg-gray-100">Start Free Trial</Button>
        </motion.div>
      </div>
    </section>
  )
}
