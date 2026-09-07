import type { ProjectEntry } from "./types";
import proj1 from "@/public/images/project (1).png";
import proj2 from "@/public/images/project (2).jpg";
import proj3 from "@/public/images/project (3).png";
import proj4 from "@/public/images/project (4).png";
import mawasemStore from "@/public/images/mawasem-store.png";
import mawasemDashboard from "@/public/images/mawasem-dashboard.png";

export const projectsData: ProjectEntry[] = [
  {
    title: "Mawasem — gifting storefront",
    description:
      "Arabic-first storefront for seasonal gifting: discovery, filtering, wishlist, cart, and a checkout that survives a season switch.",
    descriptionShort:
      "Arabic-first storefront for seasonal gifting: discovery, wishlist, cart, checkout.",
    hardPart:
      "Products, packages, seasons and variants each bend the flow differently, so discovery and checkout had to stay predictable through all of them.",
    hardPartShort:
      "Packages, seasons and variants each bend the flow — discovery had to stay predictable.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
    ],
    image: mawasemStore,
    link: "https://www.mawasem.org/",
  },
  {
    title: "Mawasem — operations dashboard",
    description:
      "The back office behind the storefront: products, orders, customers, seasons, inventory, employees.",
    descriptionShort:
      "The back office behind the storefront: orders, customers, seasons, inventory.",
    hardPart:
      "Every module is CRUD with its own permissions, filters and data states, so the work was one reusable pattern, not nine near-identical screens.",
    hardPartShort:
      "Nine CRUD modules, one reusable pattern instead of nine near-identical screens.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "shadcn/ui",
    ],
    image: mawasemDashboard,
    noLinkReason: "Internal tool — no public link",
  },
  {
    title: "Lumina — e-learning platform",
    description:
      "Role-based dashboards for admins, instructors and students, Stripe checkout that enrols on success, and an in-browser IDE for exercises.",
    descriptionShort:
      "Role-based dashboards, Stripe checkout that enrols on success, in-browser IDE.",
    hardPart:
      "Enrolment had to survive a Stripe webhook landing before the student got back, so payment, enrolment and access all resolve from one source of truth.",
    hardPartShort:
      "Enrolment had to survive a Stripe webhook landing before the student got back.",
    tech: ["MongoDB", "Express", "React", "Stripe", "OAuth"],
    image: proj1,
    link: "https://github.com/abdelrahman-elkhateeb/Lumina",
  },
  {
    title: "Weather Now",
    description:
      "City search and geocoding, current conditions, hourly forecasts and unit switching, in a layout that stays readable on a phone.",
    descriptionShort:
      "City search, current conditions, hourly forecasts and unit switching.",
    hardPart:
      "Cached forecasts and user preferences age at different rates, so they live in separate stores — otherwise stale weather hides behind a stale UI.",
    hardPartShort:
      "Forecasts and preferences age at different rates, so they live in separate stores.",
    tech: ["React", "TanStack Query", "Zustand", "Open-Meteo"],
    image: proj2,
    link: "https://weather-now-phi-ecru.vercel.app/",
  },
  {
    title: "Student Guide platform",
    description:
      "Schedules, rooms, TA hours, course resources and GPA tools in one mobile-first interface. Used by 100+ students, Lighthouse 98+.",
    descriptionShort:
      "Schedules, rooms, TA hours and GPA tools. 100+ students, Lighthouse 98+.",
    hardPart:
      "Real timetables are messier than any data model — the work was one schedule shape that fit every department without a special case per course.",
    hardPartShort:
      "One schedule shape had to fit every department without a special case per course.",
    tech: ["React", "Tailwind", "Vite", "Vercel"],
    image: proj3,
    link: "https://github.com/AhmedHosny2/Student-Guide",
  },
  {
    title: "The Wild Oasis — hotel dashboard",
    description:
      "Internal dashboard for bookings, cabins, check-in and check-out, with hotel-wide settings on live Supabase data.",
    descriptionShort:
      "Bookings, cabins, check-in and check-out on live Supabase data.",
    hardPart:
      "Check-in writes to bookings, cabins and settings in one move — compound components kept that flow from turning into four near-identical forms.",
    hardPartShort:
      "Check-in writes to bookings, cabins and settings in one move.",
    tech: ["React", "Supabase", "TanStack Query", "React Hook Form"],
    image: proj4,
    link: "https://the-wild-oasis-dashboard-peach.vercel.app",
  },
];

