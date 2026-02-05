"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import img from "@/public/avatar.png";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";

export default function Navbar() {
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        <Avatar>
          <Image src={img} alt="user profile" />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>

        {/* Desktop Navigation */}
        <section className="hidden md:flex items-center gap-6 w-full justify-center">
          <a href="#work" className="text-sm font-medium hover:text-primary">
            work
          </a>
          <Link href="#skills" className="text-sm font-medium hover:text-primary">
            skills
          </Link>
          <Link href="#experience" className="text-sm font-medium hover:text-primary">
            experience
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
            testimonials
          </Link>
        </section>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Theme */}
          <div className='relative'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
                <NavigationMenuItem>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <section className="flex flex-col gap-4 mt-6 p-4">
                <Link href="#work">work</Link>
                <Link href="#skills">skills</Link>
                <Link href="#experience">experience</Link>
                <Link href="#testimonials">testimonials</Link>
              </section>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}
