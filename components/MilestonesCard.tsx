"use client"

import { counterItems } from "@/lib";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function MilestonesCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {counterItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="group relative p-6 border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40 group-hover:border-primary transition-colors" />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-primary animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  Metric_00{index + 1}
                </span>
              </div>
              <Icon className="w-5 h-5 text-primary/40 group-hover:text-primary group-hover:rotate-12 transition-all duration-500" />
            </div>

            <div className="flex flex-col space-y-1">
              <span className="font-mono text-xs text-primary/60 uppercase tracking-tighter">
                {item.label}
              </span>

              <div className="text-4xl font-mono font-bold sm:text-5xl text-foreground group-hover:text-primary transition-colors duration-500">
                <CountUp
                  end={item.value}
                  suffix={item.suffix}
                  enableScrollSpy
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <div className="h-[2px] flex-grow bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: index * 0.5 }}
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                />
              </div>
              <span className="font-mono text-[8px] text-muted-foreground/30">L_STAT: OK</span>
            </div>

            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />
          </div>
        );
      })}
    </div>
  );
}