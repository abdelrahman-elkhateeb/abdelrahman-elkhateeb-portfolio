import MilestonesCard from "../MilestonesCard";
import SectionHeading from "../TypeWriterAnimation";

export default function Milestones() {
  return (
    <section className="container mx-auto px-4 " id="work">
      <SectionHeading text="Milestone" tagType="h2" />
      <div className="flex gap-5">
        <MilestonesCard />
      </div>
    </section>
  )
}