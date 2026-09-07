import Container from "@/components/shared/Container"
import ArrowGlyph from "@/components/shared/ArrowGlyph";
import CopyEmailButton from "./CopyEmailButton";
import { contactEmail, contactLinks } from "@/lib/site-config";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal"

export default function ContactSection() {
  return (
    <section tabIndex={-1} className="bg-background py-14" id="contact">
      <Container>
        <Reveal>
          <SectionHeader eyebrow="05" title="Contact" className="pb-7" />
          <div className="nx-divider" />

          <div className="mt-8 md:mt-11">
            <div
              className="text-foreground text-[40px] leading-[1.05] tracking-[-0.03em] font-medium text-pretty md:max-w-[900px] md:text-[64px]">
              Tell me what you&apos;re building.
            </div>
            <p
              className="text-muted-foreground m-0 mt-[18px] text-pretty text-[15px] leading-[1.65] md:mt-[22px] md:max-w-[560px] md:text-[16px] md:leading-[1.6]">
              Open to mid-level frontend roles — Cairo, remote-friendly. Email is the fastest way to
              reach me, and I answer the same day.
            </p>
          </div>
        </Reveal>

        <div className="mt-11 md:mt-14">
          {/* email row */}
          <div className="flex items-end gap-3.5 pb-5.5 md:items-center md:gap-0 md:pb-0">
            <a
              href={`mailto:${contactEmail}`}
              className="text-inherit nx-contact-row flex min-w-0 flex-1 flex-col gap-3 rounded-lg no-underline md:flex-row md:items-center md:gap-5 lg:gap-10 md:px-4.5 md:py-7">
              <span className="text-ink-tertiary flex-none text-[13px] lg:w-[150px] md:w-[100px]">
                Email
              </span>
              <span
                className="text-foreground nx-contact-value break-all text-[18px] tracking-[-0.01em] [overflow-wrap:anywhere] min-w-0 md:text-[22px]">
                {contactEmail}
              </span>
              <span className="hidden flex-1 md:block" />
              <ArrowGlyph className="nx-card-arrow size-[18px] shrink-0 text-primary" />
            </a>
            <CopyEmailButton />
          </div>

          <div className="nx-divider" />

          {contactLinks.map((link) => (
            <div key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-inherit nx-contact-row flex flex-col gap-3 rounded-lg py-5.5 no-underline md:flex-row md:items-center md:gap-5 lg:gap-10 md:px-4.5 md:py-7">
                <span className="text-ink-tertiary flex-none text-[13px] lg:w-[150px] md:w-[100px]">
                  {link.label}
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-3 md:gap-3">
                  <span
                    className="text-foreground nx-contact-value break-all text-[18px] tracking-[-0.01em] [overflow-wrap:anywhere] min-w-0 md:text-[22px]">
                    {link.value}
                  </span>
                  <span className="md:hidden">
                    <ArrowGlyph className="nx-card-arrow size-[18px] shrink-0 text-primary" />
                  </span>
                </span>
                <span className="hidden md:block">
                  <ArrowGlyph className="nx-card-arrow size-[18px] shrink-0 text-primary" />
                </span>
              </a>
              <div className="nx-divider" />
            </div>
          ))}

          {/* page-terminating rule — not a row separator, not a footer */}
          <div className="mt-14 nx-divider" />
          <div className="h-14" />
        </div>
      </Container>
    </section>
  );
}
