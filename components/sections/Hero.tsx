
import HeroExperience from "../HeroModels/HeroExperience"
import HeroText from "../HeroText"
import { Button } from "../ui/button"

export default function Hero() {
  return (
    <section className="hero-gaming-bg h-[90vh]">
      <div className="relative isolate grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center container mx-auto px-4 h-full">
        {/* hero text */}
        <div className="relative z-10 flex flex-col justify-center gap-7 md:py-10">
          <div>
            <HeroText />

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I&apos;m Abdelrahman Elkhateeb, a Frontend Engineer.
            </p>

            <a href="#work">
              <Button variant="link" className="p-0 mt-5 text-lg">see my work</Button>
            </a>
          </div>
        </div>
        
        {/* hero model */}
        <div className="relative z-10 h-full">
          <figure className="w-full h-full">
            <HeroExperience />
          </figure>
        </div>
      </div>
    </section>
  )
}
