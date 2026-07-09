"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ReactNode } from "react";

interface CyberCardProps {
  children: ReactNode;
  href?: string;
  delay?: number;
  className?: string;
  topLabel?: string;
}

export default function CyberCard({
  children,
  href,
  delay = 0,
  className = "",
  topLabel,
}: CyberCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`group relative h-full border-l border-primary/30 pl-4 transition-all duration-500 hover:border-primary ${className}`}
    >
      <div className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

      <div className="relative h-full overflow-hidden border border-white/10 bg-background/40 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/50">
        <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary" />
        <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary" />

        {topLabel && (
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
            {topLabel}
          </span>
        )}

        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {content}
      </Link>
    );
  }

  return content;
}