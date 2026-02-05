
import HeroExperience from "../HeroModels/HeroExperience"
import HeroText from "../HeroText"

export default function Hero() {
  return (
    <section className="relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center h-dvh">
      {/* hero text */}
      <div className="flex flex-col justify-center gap-7 md:py-10">
        <div className=''>

          <HeroText />

          <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
            Hi, I&apos;m Abdelrahman Elkhateeb, a Frontend Engineer.
          </p>
        </div>
      </div>
      {/* hero model */}
      <div className="h-full">
        <figure className="w-full h-full">
          <HeroExperience />
        </figure>
      </div>
    </section>
  )
}
