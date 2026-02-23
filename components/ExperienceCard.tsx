"use client";

import { milestones } from "@/lib";
import { Terminal, ChevronRight, ArrowDown, AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ExperienceCard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
      className="flex flex-col items-center w-full mx-auto p-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {milestones.map((item, index) => (
        <div key={item.id} className="w-full flex flex-col items-center">

          <motion.div variants={itemVariants} className="w-full">
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

              <CardContent className="space-y-6">
                {/* --- Section: Problem & Solution --- */}
                <div className="grid gap-3 mx-2">
                  {/* Problem Block */}
                  <div className="bg-destructive/5 p-3 border-l-4 border-destructive/50">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle size={14} className="text-destructive" />
                      <span className="text-[10px] font-bold uppercase text-destructive tracking-widest">The_Challenge</span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {item.problem}
                    </p>
                  </div>

                  {/* Solution Block */}
                  <div className="bg-primary/5 p-3 border-l-4 border-primary/50">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 size={14} className="text-primary" />
                      <span className="text-[10px] font-bold uppercase text-primary tracking-widest">The_Solution</span>
                    </div>
                    <p className="text-xs md:text-sm text-foreground/90 leading-relaxed font-medium italic">
                      {item.solution}
                    </p>
                  </div>
                </div>

                {/* --- Section: Highlights --- */}
                <div className="space-y-2 pl-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2 tracking-[0.2em] px-2 opacity-70">
                    &gt; Key_Impact_Metrics
                  </p>
                  {item.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 group text-sm">
                      <ChevronRight size={14} className="mt-1 text-primary shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      <span className="text-foreground/90">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Terminal Footer */}
                <div className="flex items-center gap-2 pt-2 pl-2 border-t border-border/30 opacity-60">
                  <span className="text-[10px] text-primary font-bold">root@portfolio:~$ execute --success</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-primary"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Spacer / Arrow between cards */}
          {index !== milestones.length - 1 && (
            <motion.div
              variants={itemVariants}
              className="py-6 flex flex-col items-center gap-1 opacity-40 text-primary"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowDown size={20} strokeWidth={3} />
              </motion.div>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Scroll_For_More</span>
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
}