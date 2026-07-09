"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Github, Linkedin, Mail, Terminal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import CyberCard from "../cyberCard";

const email = "abdelrahmanelkhateeb10@gmail.com";

const contactLinks = [
  {
    label: "Email",
    value: email,
    href: `mailto:${email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/abdelrahman-elkhateeb",
    href: "https://github.com/abdelrahman-elkhateeb",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/abdelrahman-elkhateeb",
    href: "https://linkedin.com/in/abdelrahman-elkhateeb",
    icon: Linkedin,
  },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <section id="contact" className="relative py-24 container mx-auto px-4">
      <div className="grid gap-6 md:grid-cols-3">
        {contactLinks.map((item, index) => {
          const Icon = item.icon;

          return (
            <CyberCard
              key={item.label}
              href={item.href}
              delay={index * 0.1}
              topLabel={`Contact_Log_${index + 1}`}
            >
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-orbitron text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
                  {item.label}
                </h3>

                <div className="border border-primary/20 p-3 transition-all duration-300 group-hover:bg-primary/10">
                  <Icon size={20} className="text-primary" />
                </div>
              </div>

              <p className="break-words font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary">
                {item.value}
              </p>

              <div className="mt-10 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
                <div className="flex items-center gap-3">
                  <Terminal size={12} className="text-primary/70" />

                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
                    CHANNEL_ACTIVE
                  </span>
                </div>

                {item.label === "Email" && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopyEmail();
                    }}
                    className="h-8 rounded-sm border-primary/30 bg-transparent px-2 font-mono text-[10px] uppercase tracking-wider hover:border-primary hover:bg-primary/10"
                  >
                    {copied ? (
                      <Check className="mr-1 size-3 text-primary" />
                    ) : (
                      <Copy className="mr-1 size-3 text-primary" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </div>
            </CyberCard>
          );
        })}
      </div>
    </section>
  );
}