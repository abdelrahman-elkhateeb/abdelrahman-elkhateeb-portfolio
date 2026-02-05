"use client";

import { words } from "@/lib";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function HeroText() {
  const duplicatedWords = [...words, ...words];

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="leading-tight text-4xl md:text-6xl font-bold"
    >
      <motion.span variants={item} className="block">shaping</motion.span>

      <motion.span
        variants={item}
        className="inline-block overflow-hidden h-[1.2em] align-middle"
      >
        <motion.div
          className="flex flex-col"
          animate={{ y: [0, "-50%"] }}
          transition={{
            duration: words.length * 2,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedWords.map((word, index) => (
            <span
              key={index}
              className="flex items-center gap-3 h-[1.2em] px-2"
            >
              <div className="relative size-8 md:size-10">
                <Image
                  src={word.imgPath}
                  alt={word.text}
                  fill
                  className="rounded-full dark:bg-white p-1 object-contain"
                />
              </div>
              <span className="whitespace-nowrap">{word.text}</span>
            </span>
          ))}
        </motion.div>
      </motion.span>

      <motion.span variants={item} className="block">into real projects</motion.span>
      <motion.span variants={item} className="block">that deliver results</motion.span>
    </motion.h1>
  );
}