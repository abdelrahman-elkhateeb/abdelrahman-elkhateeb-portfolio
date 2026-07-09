"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Github, Linkedin, Mail, Terminal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

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
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Contact_Node
          </span>

          <h2 className="mt-3 font-orbitron text-3xl font-bold tracking-tighter text-foreground md:text-5xl">
            Let&apos;s Connect
          </h2>

          <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
            Open to frontend opportunities, freelance work, collaborations, and
            building high-performance web experiences.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {contactLinks.map((item, index) => {
            const Icon = item.icon;
            const isExternal = item.label !== "Email";

            return (
              <Link
                key={item.label}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative h-full border-l-2 border-primary/30 p-4 transition-all duration-500 hover:border-primary"
                >
                  <div className="absolute left-0 top-0 h-[1px] w-full scale-x-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

                  <div className="relative h-full min-h-48 border border-white/10 p-6 transition-colors group-hover:border-primary/50">
                    <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary" />
                    <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary" />

                    <div className="mb-8 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                        Contact_Log_{index + 1}
                      </span>

                      <div className="border border-primary/20 p-2 transition-all group-hover:bg-primary/10">
                        <Icon size={20} className="text-primary" />
                      </div>
                    </div>

                    <h3 className="font-orbitron text-2xl font-bold tracking-tighter text-foreground transition-colors group-hover:text-primary">
                      {item.label}
                    </h3>

                    <p className="mt-4 break-words font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary">
                      {item.value}
                    </p>

                    <div className="mt-8 flex items-center gap-3 border-t border-white/5 pt-4">
                      <Terminal size={12} className="text-primary opacity-70" />
                      <span className="font-mono text-[10px] uppercase text-muted-foreground/50">
                        CHANNEL_ACTIVE
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Button
            onClick={handleCopyEmail}
            variant="outline"
            className="group rounded-sm border-primary/30 bg-transparent font-mono uppercase tracking-widest hover:border-primary hover:bg-primary/10"
          >
            {copied ? (
              <Check className="mr-2 size-4 text-primary" />
            ) : (
              <Copy className="mr-2 size-4 text-primary" />
            )}

            {copied ? "Email Copied" : "Copy Email"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}