"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Cpu, Terminal } from "lucide-react";
import { motion } from "framer-motion";

import CyberCard from "../cyberCard";
import { skillGroups, systemStatus } from "@/lib";


export default function Skills() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % systemStatus.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Skill_Tree
          </span>

          <h2 className="mt-3 font-orbitron text-3xl font-bold tracking-tighter md:text-5xl">
            Tech Stack
          </h2>

          <p className="mt-4 max-w-2xl font-mono text-sm text-muted-foreground">
            Technologies, tools, and frameworks I use to build modern web
            applications.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <CyberCard
              key={group.title}
              delay={index * 0.1}
              topLabel={group.code}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-orbitron text-2xl font-bold">
                  {group.title}
                </h3>

                <div className="border border-primary/20 p-3 transition-all duration-300 group-hover:bg-primary/10">
                  <Cpu className="text-primary" size={20} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="
                      border-primary/20
                      bg-transparent
                      px-3
                      py-1
                      font-mono
                      uppercase
                      tracking-wider
                      transition-all
                      hover:bg-primary/10
                    "
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-2">
                  <Terminal
                    size={12}
                    className="text-primary opacity-70"
                  />

                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
                    {group.status}
                  </span>
                </div>

                <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                  {group.skills.length} modules
                </span>
              </div>
            </CyberCard>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {systemStatus[statusIndex]}
          </span>
        </div>
      </div>
    </section>
  );
}