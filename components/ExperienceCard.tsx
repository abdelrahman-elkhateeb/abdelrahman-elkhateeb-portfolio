"use client"; // ضروري لو شغال Next.js App Router

import { milestones } from "@/lib";
import { Terminal, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ExperienceCard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col gap-8 w-full mx-auto p-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {milestones.map((item) => (
        <motion.div key={item.id} variants={itemVariants}>
          <Card className="font-mono bg-card border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_var(--primary)] overflow-hidden transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">

            {/* Window Header */}
            <div className="bg-muted border-b-2 border-border px-3 py-2 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-[10px] text-muted-foreground truncate max-w-[200px]">
                {item.title.toLowerCase().replace(/\s+/g, '_')}.sh
              </span>
            </div>

            <CardHeader className="space-y-4 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <Terminal size={16} strokeWidth={3} />
                  <CardTitle className="text-lg md:text-xl font-bold uppercase tracking-tighter">
                    {item.title}
                  </CardTitle>
                </div>
                <p className="text-sm font-semibold text-foreground/80 pl-6 italic">
                  {item.role} {item.organization && `// ${item.organization}`}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pl-6">
                {item.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-[10px] border-primary/30 bg-primary/5 text-primary rounded-none px-1.5 py-0"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-muted/40 p-3 border-l-4 border-primary/50 mx-2">
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary/70 font-bold font-sans"># </span>
                  {item.description}
                </p>
              </div>

              <div className="space-y-2 pl-4">
                {item.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2 group text-sm">
                    <ChevronRight size={14} className="mt-1 text-primary shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    <span className="text-foreground/90">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Footer Prompt */}
              <div className="flex items-center gap-2 pt-2 pl-2 border-t border-border/30 opacity-60">
                <span className="text-[10px] text-primary font-bold">root@portfolio:~$</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-4 bg-primary"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}