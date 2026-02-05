"use client";

import { words } from "@/lib";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function HeroText() {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item: Variants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="leading-tight text-4xl md:text-6xl font-bold"
    >
      <motion.span variants={item} className="block">
        shaping
      </motion.span>

      <motion.span
        variants={item}
        className="inline-block overflow-hidden h-[1.2em] align-middle"
      >
        <motion.div
          className="flex flex-col"
          animate={{
            y: ["0%", "-12.5%", "-25%", "-37.5%", "-50%", "-62.5%", "-75%", "-87.5%"],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: [0.9, 0.01, 0.3, 0.99],
            times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
          }}
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="flex items-center gap-2 md:gap-3 h-[1.2em] px-2"
            >
              <Image
                src={word.imgPath}
                alt={word.text}
                width={100}
                height={100}
                className="xl:size-12 md:size-10 size-7 rounded-full dark:bg-white p-1"
              />
              <span className="whitespace-nowrap">{word.text}</span>
            </span>
          ))}
        </motion.div>
      </motion.span>

      <motion.span variants={item} className="block">
        into real projects
      </motion.span>

      <motion.span variants={item} className="block">
        that deliver results
      </motion.span>
    </motion.h1>
  );
}