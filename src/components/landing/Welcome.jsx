"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// Background animation variants
const backgroundVariant = {
  initial: {
    backgroundColor: "#0086B0",
    color: "#ffffff",
    borderColor: "transparent",
  },
  hover: {
    backgroundColor: "#ffffff",
    color: "#0086B0",
    borderColor: "#0086B0",
    transition: {
      delay: 0.1,
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

// Text animation variants
const textVariant = {
  initial: { y: 0 },
  hover: {
    y: -5, // Subtle lift effect
    transition: {
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

const Welcome = () => {
  const { data: session } = useSession();

  return (
    <div className="w-11/12 px-5 container py-8 mx-auto">
      {/* Grid layout with custom column fractions for md+ screens */}
      <div className="grid md:grid-cols-[2fr_3fr] items-center gap-12">
        {/* Left Content */}
        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Welcome, {session?.user?.username || "Guest"}!
          </h1>
          <p className="text-gray-700 lg:w-full leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Coctetur
            egestas massa velit aliquam. Molestie bibendum hendrerit ipsum orci,
            platea aliquam id ut.
          </p>

          {/* Navigation Buttons */}
          <div className="flex justify-between md:justify-start mt-6 sm:gap-6">
            {/* My Stories Link */}
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={backgroundVariant}
              className="rounded-md border-[1px] border-[#0086B0] overflow-hidden"
            >
              <Link
                href="/blog"
                className="block px-8 md:px-4 md:py-auto lg:px-10 py-3 font-semibold text-sm md:text-base text-white bg-[#0086B0] hover:text-[#0086B0] hover:bg-white focus:outline-none"
              >
                My Stories
              </Link>
            </motion.div>

            {/* Go to Feed Link */}
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={backgroundVariant}
              className="rounded-md border-[1px] border-[#0086B0] overflow-hidden"
            >
              <Link
                href="/myblog"
                className="block px-8 md:px-4 md:py-auto lg:px-10 py-3 font-semibold text-sm md:text-base text-white bg-[#0086B0] hover:text-[#0086B0] hover:bg-white focus:outline-none"
              >
                Go to Feed
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex justify-center">
          <Image
            src="/welcome.svg"
            alt="Welcome illustration"
            width={500}
            height={500}
            className="object-contain md:w-[600px] lg:w-[700px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
