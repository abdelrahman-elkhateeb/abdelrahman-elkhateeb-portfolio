"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Terminal, Cpu } from "lucide-react";

export default function ExperienceFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github size={16} />, label: "github.exe", href: "https://github.com/yourusername" },
    { icon: <Linkedin size={16} />, label: "linkedin.sh", href: "https://linkedin.com/in/yourusername" },
    { icon: <Mail size={16} />, label: "contact.log", href: "mailto:your@email.com" },
  ];

  return (
    <footer className="w-full mt-20 border-t-2 border-border bg-muted/30 font-mono">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          {/* System Status Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Cpu size={18} className="animate-pulse" />
              <span className="text-sm font-bold tracking-tighter uppercase">System_Status: Operational</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-tight max-w-[300px]">
              Built with Next.js & Framer Motion. <br />
              Payload delivered successfully to the client.
            </p>
          </div>

          {/* Social Commands */}
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_var(--primary)]"
                whileHover={{ y: -2, x: -2, boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)" }}
              >
                <span className="opacity-70 group-hover:opacity-100">{link.icon}</span>
                <span className="text-xs font-bold">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <Terminal size={12} />
            <span>&copy; {currentYear} User_Root. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-primary cursor-pointer transition-colors inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Vercel_Deployed: True
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}