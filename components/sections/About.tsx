import SectionHeader from "@/components/SectionHeader"

const ABOUT_PARAGRAPH =
  "I'm Abdelrahman Elkhateeb, a computer science graduate working out of Cairo. I build the internal tooling most people never see — SharePoint front-ends, WebParts, and the small systems that keep an organisation's day moving. Before that I built a full site for an industrial wiring manufacturer, where a buyer decides whether you're credible in about a second. What I like is the unglamorous half: making something load fast, behave predictably, and still be there after the person who asked for it has moved on. The degree finished in 2025 — the work started earlier."

export default function About() {
  return (
    <section id="about" style={{ background: "#0b0c14" }} className="py-14">
      <div className="mx-auto w-full max-w-290 px-4.5">
        <SectionHeader eyebrow="01" title="About" />
        <p
          className="m-0 mt-[22px] max-w-[640px] text-pretty text-[14.5px] leading-[1.65] md:text-[15px] md:leading-[1.7]"
          style={{ color: "rgba(233,233,237,0.6)" }}
        >
          {ABOUT_PARAGRAPH}
        </p>
      </div>
    </section>
  )
}
