"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { contactEmail, contactLinks } from "@/lib";
import SectionHeader from "@/components/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

function ArrowGlyph() {
  return (
    <svg className="nx-card-arrow h-[18px] w-[18px] flex-none" viewBox="0 0 256 256" fill="#9184d9">
      <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
    </svg>
  );
}

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { ref, visible } = useReveal<HTMLDivElement>();

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(contactEmail);
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <section style={{ background: "#0b0c14" }} className="py-14" id="contact">
      <div className="mx-auto w-full max-w-290 px-4.5">
        <div ref={ref} data-reveal className={visible ? "is-visible" : ""}>
          <SectionHeader eyebrow="05" title="Contact" className="pb-7" />
          <div className="nx-divider" />

          <div className="mt-8 md:mt-11">
            <div
              className="text-[40px] leading-[1.05] tracking-[-0.03em] font-medium text-pretty md:max-w-[900px] md:text-[64px]"
              style={{ color: "#e9e9ed" }}
            >
              Tell me what you&apos;re building.
            </div>
            <p
              className="m-0 mt-[18px] text-pretty text-[15px] leading-[1.65] md:mt-[22px] md:max-w-[560px] md:text-[16px] md:leading-[1.6]"
              style={{ color: "rgba(233,233,237,0.6)" }}
            >
              Open to mid-level frontend roles — Cairo, remote-friendly. Email is the fastest way to
              reach me, and I answer the same day.
            </p>
          </div>
        </div>

        <div className="mt-11 md:mt-14">
          {/* email row */}
          <div className="flex items-end gap-3.5 pb-5.5 md:items-center md:gap-0 md:pb-0">
            <a
              href={`mailto:${contactEmail}`}
              className="nx-contact-row flex min-w-0 flex-1 flex-col gap-3 rounded-lg no-underline md:flex-row md:items-center md:gap-10 md:px-4.5 md:py-7"
              style={{ color: "inherit" }}
            >
              <span className="flex-none text-[13px] md:w-[150px]" style={{ color: "rgba(233,233,237,0.45)" }}>
                Email
              </span>
              <span
                className="nx-contact-value break-all text-[18px] tracking-[-0.01em] md:break-normal md:text-[22px]"
                style={{ color: "#e9e9ed" }}
              >
                {contactEmail}
              </span>
              <span className="hidden flex-1 md:block" />
              <ArrowGlyph />
            </a>
            <button
              type="button"
              aria-label="Copy email address"
              onClick={(e) => {
                e.preventDefault();
                handleCopyEmail();
              }}
              className="nx-icon-btn relative flex h-11 w-11 flex-none items-center justify-center rounded-lg md:ml-4.5 md:h-12 md:w-12"
            >
              <Copy
                size={18}
                className="nx-copy-icon absolute"
                style={{ opacity: copied ? 0 : 1 }}
              />
              <Check
                size={18}
                className="nx-copy-icon absolute"
                style={{ opacity: copied ? 1 : 0 }}
              />
            </button>
          </div>

          <div className="nx-divider" />

          {contactLinks.map((link) => (
            <div key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nx-contact-row flex flex-col gap-3 rounded-lg py-5.5 no-underline md:flex-row md:items-center md:gap-10 md:px-4.5 md:py-7"
                style={{ color: "inherit" }}
              >
                <span className="flex-none text-[13px] md:w-[150px]" style={{ color: "rgba(233,233,237,0.45)" }}>
                  {link.label}
                </span>
                <span className="flex flex-1 items-center gap-3 md:gap-3">
                  <span
                    className="nx-contact-value break-all text-[18px] tracking-[-0.01em] md:break-normal md:text-[22px]"
                    style={{ color: "#e9e9ed" }}
                  >
                    {link.value}
                  </span>
                  <span className="md:hidden">
                    <ArrowGlyph />
                  </span>
                </span>
                <span className="hidden md:block">
                  <ArrowGlyph />
                </span>
              </a>
              <div className="nx-divider" />
            </div>
          ))}

          {/* page-terminating rule — not a row separator, not a footer */}
          <div className="mt-14 nx-divider" />
          <div className="h-14" />
        </div>
      </div>
    </section>
  );
}
