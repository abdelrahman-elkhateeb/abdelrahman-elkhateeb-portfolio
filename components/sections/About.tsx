"use client";

import { stats, tech } from "@/lib";
import { motion } from "motion/react";



export default function About() {
  return (
    <section id="about" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Profile_Record
          </span>

          <h2 className="mt-3 font-orbitron text-4xl font-bold tracking-tight md:text-5xl">
            About Me
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative border-l-2 border-primary/30 p-5 transition-all duration-500 hover:border-primary"
          >
            <div className="absolute top-0 left-0 h-[1px] w-full scale-x-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

            <div className="relative overflow-hidden border border-white/10 p-8 transition-colors group-hover:border-primary/50">
              <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-primary" />

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                User_Profile
              </span>

              <p className="mt-8 font-mono text-sm leading-8 text-muted-foreground">
                I&apos;m Abdelrahman Elkhateeb, a Frontend Developer focused on
                building scalable and high-performance web applications using
                React, Next.js, and TypeScript.
              </p>

              <p className="mt-6 font-mono text-sm leading-8 text-muted-foreground">
                I have experience developing enterprise solutions, reusable UI
                systems, and interactive user experiences. I enjoy turning
                complex problems into clean, maintainable products.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {tech.map((item) => (
                  <div
                    key={item}
                    className="border border-primary/20 px-3 py-2 font-mono text-xs uppercase tracking-wider text-primary transition-colors hover:bg-primary/10"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="group relative border-l-2 border-primary/30 p-4 transition-all duration-500 hover:border-primary"
                >
                  <div className="relative border border-white/10 p-6 transition-colors group-hover:border-primary/50">
                    <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary" />
                    <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-primary" />

                    <Icon className="mb-4 text-primary" size={20} />

                    <h3 className="font-orbitron text-3xl font-bold">
                      {stat.value}
                    </h3>

                    <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}