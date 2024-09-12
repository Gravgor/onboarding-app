"use client"

import Link from "next/link";
import { motion } from "framer-motion";

export default function NavbarLanding() {
    const linkVariants = {
        hover: { 
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    };

    return (
        <nav className="flex justify-end gap-4 sm:gap-6 py-4 px-6">
            <motion.div whileHover="hover" variants={linkVariants}>
                <Link className="text-sm font-medium text-blue-500 hover:text-gray-900" href="#features">
                    Features
                </Link>
            </motion.div>
            <motion.div whileHover="hover" variants={linkVariants}>
                <Link className="text-sm font-medium text-gray-500 hover:text-gray-900" href="#pricing">
                    Pricing
                </Link>
            </motion.div>
            <motion.div whileHover="hover" variants={linkVariants}>
                <Link className="text-sm font-medium text-gray-500 hover:text-gray-900" href="#about">
                    About
                </Link>
            </motion.div>
        </nav>
    )
}