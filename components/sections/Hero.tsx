import { words } from "@/lib"
import Image from "next/image"
import HeroExperience from "../HeroModels/HeroExperience"

export default function Hero() {
  return (
    <section className="relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center">
      {/* hero text */}
      <div className="flex flex-col justify-center gap-7 md:py-10">
        <div className=''>
          <h1>
            shaping
            <span className="">
              <span className="">
                {words.map((word, index) => (
                  <span key={index} className="flex items-center md:gap-3 gap-1 pd-2">
                    <Image src={word.imgPath} alt={word.text} width={100} height={100} className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50" />
                    <span>{word.text}</span>
                  </span>
                ))}
              </span>
            </span>
            <br />
            into real projects
            <br />
            that deliver results
          </h1>
          <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
            Hi, I&apos;m Abdelrahman Elkhateeb, a Frontend Engineer.
          </p>
        </div>
      </div>
      {/* hero model */}
      <div className="h-dvh">
        <figure className="w-full h-full">
          <HeroExperience />
        </figure>
      </div>
    </section>
  )
}
