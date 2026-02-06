
import HeroExperience from "../HeroModels/HeroExperience"
import HeroText from "../HeroText"
import TypeWriterAnimation from "../TypeWriterAnimation"
import { Button } from "../ui/button"

export default function Hero() {
  return (
    <section className="hero-gaming-bg h-[95vh]">
      <div className="relative isolate flex flex-col-reverse xl:flex-row items-center container mx-auto px-4 h-full">
        {/* hero text */}
        <div className="flex flex-col justify-center flex-1">
          <div>
            <HeroText />

            <TypeWriterAnimation text="Hi, I&apos;m Abdelrahman Elkhateeb, a Frontend Engineer." className="md:text-xl pointer-events-none" tagType="p"/>

            <a href="#work">
              <Button variant="link" className="p-0 text-lg">see my work</Button>
            </a>
          </div>
        </div>

        {/* hero model */}
        <figure className="md:flex-1 w-full relative min-h-100 md:min-h-200">
          <div className=" w-full h-full absolute inset-0">
            <HeroExperience />
          </div>
        </figure>
      </div>
    </section>
  )
}
