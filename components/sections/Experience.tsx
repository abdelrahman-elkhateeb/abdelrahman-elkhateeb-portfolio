import ExperienceCard from "../ExperienceCard";
import TypeWriterAnimation from "../TypeWriterAnimation";

export default function Experience() {
  return (
    <section className="container mx-auto px-4" id="experience">
      <TypeWriterAnimation text="Experience" tagType="h2" />

      <ExperienceCard />
    </section>
  )
}
