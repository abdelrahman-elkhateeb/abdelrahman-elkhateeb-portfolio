"use client"

import { projectsData } from "@/lib"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProjectCard() {
  return (
    <>
      {projectsData.map((project, index) => {
        const isFeatured = index === 0;
        const gridClassName = `project${index + 1}`;

        return (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut"
            }}
            viewport={{ once: true, margin: "-100px" }}
            key={index}
            className={`${gridClassName} group flex flex-col`}>

            <div className={`relative overflow-hidden rounded-3xl mb-6
        ${isFeatured ? 'aspect-[16/10] lg:aspect-square' : 'aspect-video'}`}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`${isFeatured ? 'text-3xl' : 'text-xl'} font-bold tracking-tight text-foreground`}>
                  {project.title}
                </h3>
                <Link href={project.link} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                  {project.type === "GitHub" ? <Github size={24} /> : <ExternalLink size={24} />}
                </Link>
              </div>

              <ul className="space-y-3">
                {project.details.map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                    <span className="text-primary/60 mt-1.5 shrink-0">—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

          </motion.div >
        );
      })}
    </>
  )
}
