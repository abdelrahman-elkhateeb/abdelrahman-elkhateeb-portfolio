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
  const letters = text.split("");

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

  const child = {
    visible: {
      opacity: 1,
      display: "inline",
    },
    hidden: {
      opacity: 0,
      display: "none",
    },
  };

  return (
    <MotionComponent
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[0.8em] bg-current ml-1 align-baseline"
      />
    </MotionComponent>
  );
}