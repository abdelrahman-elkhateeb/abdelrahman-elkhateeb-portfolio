"use client"

import { counterItems } from "@/lib";
import { Terminal } from "lucide-react";
import CountUp from "react-countup";

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
          </div>
        );
      })}
    </div>
  );
}