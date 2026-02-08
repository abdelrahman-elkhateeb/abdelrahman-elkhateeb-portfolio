"use client"

import { projectsData } from "@/lib"
import { motion } from "framer-motion"
import { ExternalLink, Github, Terminal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProjectCard() {
  return (
    <>
      {projectsData.map((project, index) => {

        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            key={index}
            className={`group relative p-4 mb-12 border-l-2 border-primary/30 hover:border-primary transition-all duration-500`}
          >
            {/* The "Scanner" line effect on hover */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

            <div>
              {/* IMAGE CONTAINER with "Angular Clip" */}
              <div className="relative overflow-hidden aspect-video lg:aspect-square border border-white/10 group-hover:border-primary/50 transition-colors">
                {/* Decorative HUD Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary z-10" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary z-10" />

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale-[50%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* CONTENT SECTION */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1 font-mono">Project_Log_{index + 1}</span>
                    <h3 className={`font-orbitron text-2xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors`}>
                      {project.title}
                    </h3>
                  </div>

                  <Link href={project.link} target="_blank" className="p-2 border border-primary/20 hover:bg-primary/10 transition-all rounded-sm">
                    {project.type === "GitHub" ? <Github size={20} /> : <ExternalLink size={20} />}
                  </Link>
                </div>

                {/* PROJECT DETAILS as "Data Points" */}
                <ul className="space-y-4">
                  {project.details.map((point, i) => (
                    <li key={i} className="relative pl-6 text-sm text-muted-foreground font-mono uppercase tracking-tight leading-relaxed border-b border-white/5 pb-2">
                      <Terminal size={12} className="absolute left-0 top-1 text-primary opacity-70" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Bottom Status Bar Decal */}
                <div className="pt-4 flex items-center gap-4">
                  <div className="h-1 w-20 bg-primary/20 overflow-hidden">
                    <motion.div
                      initial={{ x: '-100%' }}
                      whileInView={{ x: '100%' }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="h-full w-full bg-primary"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/50">SYSTEM_READY</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  )
}