
const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

// Import your images
import type { StaticImageData } from "next/image";
import proj1 from "@/public/images/project (1).png";
import proj2 from "@/public/images/project (2).jpg";
import proj3 from "@/public/images/project (3).png";
import proj4 from "@/public/images/project (4).png";
import mawasemStore from "@/public/images/mawasem-store.png";
import mawasemDashboard from "@/public/images/mawasem-dashboard.png";

type ProjectEntry = {
  title: string;
  description: string;
  descriptionShort: string;
  hardPart: string;
  hardPartShort: string;
  tech: string[];
  image: StaticImageData;
  /** Absent (not empty) when a project has no public link — see project 2. */
  link?: string;
  /** Shown instead of the arrow/link when `link` is absent. */
  noLinkReason?: string;
};

const projectsData: ProjectEntry[] = [
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

const contactEmail = "abdelrahmanelkhateeb10@gmail.com";

const contactLinks = [
  {
    label: "GitHub",
    value: "github.com/abdelrahman-elkhateeb",
    href: "https://github.com/abdelrahman-elkhateeb",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/abdelrahman-elkhateeb",
    href: "https://linkedin.com/in/abdelrahman-elkhateeb",
  },
  {
    label: "Frontend Mentor",
    value: "frontendmentor.io/profile/abdelrahman-elkhateeb",
    href: "https://frontendmentor.io/profile/abdelrahman-elkhateeb",
  },
];

const experiences = [
  {
    id: 1,
    company: "EVIM",
    location: "Berlin, Germany",
    role: "Frontend Developer",
    employmentType: "Remote",
    period: "Jul 2025 – present",
    techStack: ["React.js", "TypeScript", "Fluent UI", "SPFx"],
    headline:
      "Shipped 36+ SPFx WebParts into enterprise SharePoint — and the reusable React and Fluent UI layer every one of them was built on.",
    highlights: [
      "Advanced property panes let non-technical staff change content without a developer.",
      "The component library carried across solutions, so each new one started further along.",
    ],
  },

  {
    id: 2,
    company: "IPS Wirings",
    location: "Egypt",
    role: "Frontend Developer",
    employmentType: "Freelance",
    period: "2026",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    headline:
      "Designed and built the corporate site for an industrial wiring company, brief to deploy, on my own.",
    highlights: [
      "Mobile-first across the browsers and devices their customers actually arrive on.",
      "Core Web Vitals optimised, because an industrial buyer judges credibility in a second.",
    ],
  },
];

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind",
      "shadcn/ui",
      "Redux Toolkit",
      "Zustand",
      "TanStack Query",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "Supabase"],
  },
  {
    title: "Tools",
    skills: ["GitHub", "Postman", "Vercel", "VS Code"],
  },
];

export {
  experiences, projectsData, words, skillGroups, contactEmail, contactLinks
};

