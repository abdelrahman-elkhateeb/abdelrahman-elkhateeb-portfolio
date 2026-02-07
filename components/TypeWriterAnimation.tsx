"use client";

import { motion } from "framer-motion";

const MotionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

type MotionTag = keyof typeof MotionTags;

type TextAnimationProps = {
  text: string;
  className?: string;
  tagType?: MotionTag;
  startDelaySeconds?: number;
};

export default function TypeWriterAnimation({
  text,
  className = "mt-5 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl",
  tagType = "h1",
  startDelaySeconds = 0,
}: TextAnimationProps) {
  const MotionComponent = MotionTags[tagType];
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: startDelaySeconds,
      },
    },
  };

  const letterVariant = {
    visible: { opacity: 1, display: "inline" },
    hidden: { opacity: 0, display: "none" },
  };

  return (
    <MotionComponent
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`${className} flex flex-wrap`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span variants={letterVariant} key={charIndex}>
              {char}
            </motion.span>
          ))}
          {wordIndex !== words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}

      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-0.5 bg-current ml-1 align-baseline"
      />
    </MotionComponent>
  );
}