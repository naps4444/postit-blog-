"use client";

import React from "react";
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

const Hero = () => {
  return (
    <>
      <div className="bg-[url(/herobg.svg)] bg-cover bg-center py-8 mx-auto">
        <div className="mx-auto py-4 md:px-4 flex flex-col gap-10 w-11/12 container">
          <h1 className="text-black text-[50px] font-bold mt-[150px] md:text-[70px] md:font-semibold">
            Stay Curious.
          </h1>

          <p className="text-black w-[250px] md:w-[420px] text-[20px]">
            Lorem ipsum dolor sit ameetur adipiscing elit. Coctetur egestas
            massa velit aliquam. Molestim bibendum hnt ipsum orci, platea
            aliquam id ut.
          </p>

          {/* Hover Effect with Framer Motion */}
          <motion.div
            initial="initial"
            whileHover="hover"
            variants={backgroundVariant}
            className="rounded-md border-[1px] border-[#0086B0] overflow-hidden w-fit"
          >
            <Link
              href="/blog"
              className="block px-8 md:px-4 md:py-auto lg:px-10 py-3 font-semibold text-sm md:text-base text-white bg-[#0086B0] hover:text-[#0086B0] hover:bg-white focus:outline-none"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="w-11/12 container md:px-4 xl:px-5 py-14 mx-auto">
        <div className="bg-[url(/homesub.svg)] bg-cover bg-center flex flex-col justify-center items-center py-8">
          <div className="text-center px-4">
            <h1 className="font-bold">
              Try Post<span className="text-[#0086B0]">it</span>.
            </h1>

            <p className="mt-5 text-[#414141]">
              Do you want to write or discover stories from writers on any
              topic?
            </p>
          </div>

          <div className="md:w-6/12 flex  lg:w-4/12 justify-center px-2 mx-auto mt-10">
            <input
              type="text"
              className="w-7/12 lg:w-8/12 py-2 px-2 rounded-s-lg outline-none"
              placeholder="Enter Email address"
            />
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={backgroundVariant}
              className="rounded-e-lg w-4/12 overflow-hidden"
            >
              <Link
                href="/subscribe"
                className="bg-[#0086B0] text-white text-sm p-2 text-center font-semibold hover:text-[#0086B0] hover:bg-white focus:outline-none block"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
