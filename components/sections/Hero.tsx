
import { ExternalLink, Github, Linkedin } from "lucide-react"
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

            <TypeWriterAnimation text="Hi, I&apos;m Abdelrahman Elkhateeb, a Frontend Engineer." className="md:text-xl" tagType="p" />

            <a href="#projects">
              <Button variant="link" className="p-0 text-lg">see my work</Button>
            </a>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 font-mono mt-6">
              {/* GitHub Button */}
              <a
                href="https://github.com/abdelrahman-elkhateeb"
                target="_blank"
                className="group relative flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 md:px-6 md:py-3 border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_white] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all w-full sm:w-auto"
              >
                <Github size={20} className="shrink-0" />
                <span className="font-bold uppercase tracking-widest text-xs md:text-sm whitespace-nowrap">
                  Execute_GitHub
                </span>
              </a>

              {/* LinkedIn Button */}
              <a
                href="https://www.linkedin.com/in/abdelrahman-elkhateeb"
                target="_blank"
                className="group flex items-center justify-center gap-2 bg-transparent text-foreground px-4 py-3 md:px-6 md:py-3 border-2 border-border hover:border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_var(--primary)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all w-full sm:w-auto"
              >
                <Linkedin size={20} className="text-primary shrink-0" />
                <span className="font-bold uppercase tracking-widest text-xs md:text-sm whitespace-nowrap">
                  Connect_LinkedIn
                </span>
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
              </a>
            </div>
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
