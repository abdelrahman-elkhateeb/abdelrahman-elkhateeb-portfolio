"use client";

import {
  easeInOut,
  easeOut,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

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
  startDelaySeconds?: number;
  tagType?: MotionTag;
};

export default function TypeWriterAnimation({
  text,
  className = "mt-5 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl",
  tagType = "h1",
  startDelaySeconds = 0,
}: TextAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  const Tag = MotionTags[tagType];

  const letterDelaySeconds = 0.015;
  const letterDurationSeconds = 0.25;
  const boxFadeDurationSeconds = 0.15;

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: startDelaySeconds,
        staggerChildren: letterDelaySeconds,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: "0.25em", filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: "0em",
      filter: "blur(0px)",
      transition: { duration: letterDurationSeconds, ease: easeOut },
    },
  };

  const boxVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0],
      transition: {
        duration: boxFadeDurationSeconds,
        times: [0, 0.2, 1],
        ease: easeInOut,
      },
    },
  };

  return (
    <Tag
      className={`${className} mb-5`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "all" }}
      variants={containerVariants}
    >
      {text.split("").map((char, index) => {
        const displayedChar = char === " " ? "\u00A0" : char;

        return (
          <motion.span
            key={`${index}-${char}`}
            className="relative inline-block"
          >
            <motion.span
              className="inline-block whitespace-pre"
              variants={letterVariants}
            >
              {displayedChar}
            </motion.span>

            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 right-0 bg-current opacity-70"
              variants={boxVariants}
            />
          </motion.span>
        );
      })}
    </Tag>
  );
}
