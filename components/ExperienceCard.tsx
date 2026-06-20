"use client";

import { experiences } from "@/lib";
import { Terminal, ChevronRight, MapPin, CalendarDays, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, type Variants } from "framer-motion";

export default function ExperienceCard() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
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
      className="flex flex-col items-center w-full mx-auto p-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {experiences.map((item) => (
        <motion.div key={item.id} variants={itemVariants} className="w-full">
          <Card className="font-mono bg-card border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_var(--primary)] overflow-hidden transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">
            {/* Window Header */}
            <div className="bg-muted border-b-2 border-border px-3 py-2 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>

              <span className="text-[10px] text-muted-foreground truncate max-w-[220px]">
                {item.company.toLowerCase().replace(/\s+/g, "_")}.experience
              </span>
            </div>

            <CardHeader className="space-y-4 pb-3">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <Terminal size={16} strokeWidth={3} />
                  <CardTitle className="text-lg md:text-xl font-bold uppercase tracking-tighter">
                    {item.role}
                  </CardTitle>
                </div>

                <div className="space-y-2 pl-6">
                  <p className="text-sm md:text-base font-semibold text-foreground/90">
                    {item.company}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-primary" />
                      {item.employmentType}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary" />
                      {item.location}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={14} className="text-primary" />
                      {item.period}
                    </span>
                  </div>
                </div>
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
              {/* Summary */}
              <div className="bg-primary/5 p-3 border-l-4 border-primary/50 mx-2">
                <p className="text-xs md:text-sm text-foreground/90 leading-relaxed font-medium">
                  {item.summary}
                </p>
              </div>

              {/* Achievements */}
              <div className="space-y-2 pl-4">
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2 tracking-[0.2em] px-2 opacity-70">
                  &gt; Key_Achievements
                </p>

                {item.achievements.map((achievement) => (
                  <div key={achievement} className="flex items-start gap-2 group text-sm">
                    <ChevronRight
                      size={14}
                      className="mt-1 text-primary shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />

                    <span className="text-foreground/90 leading-relaxed">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}