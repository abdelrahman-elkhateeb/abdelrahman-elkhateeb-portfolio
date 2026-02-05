
import HeroExperience from "../HeroModels/HeroExperience"
import HeroText from "../HeroText"
import { Button } from "../ui/button"

export default function Hero() {
  return (
    <section className="hero-gaming-bg h-[90vh]">
      <div className="relative isolate flex flex-col-reverse xl:flex-row items-center container mx-auto px-4 h-full">
        {/* hero text */}
        <div className="flex flex-col justify-center flex-1">
          <div>
            <HeroText />

            <p className="text-white-50 md:text-xl relative pointer-events-none">
              Hi, I&apos;m Abdelrahman Elkhateeb, a Frontend Engineer.
            </p>

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
