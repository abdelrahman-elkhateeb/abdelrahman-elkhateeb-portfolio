import Container from "@/components/shared/Container"
import SectionHeader from "@/components/shared/SectionHeader"
import Reveal from "@/components/shared/Reveal"

import { ABOUT_PARAGRAPH } from "./data"

export default function About() {

  return (
    <section tabIndex={-1} id="about"  className="bg-background py-14">
      <Reveal asChild>
      <Container>
        <SectionHeader eyebrow="01" title="About" />
        <p
          className="text-muted-foreground m-0 mt-[22px] max-w-[640px] text-pretty text-[14.5px] leading-[1.65] md:text-[15px] md:leading-[1.7]">
          {ABOUT_PARAGRAPH}
        </p>
      </Container>
      </Reveal>
    </section>
  )
}
