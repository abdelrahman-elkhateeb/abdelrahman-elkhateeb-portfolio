
const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

// Import your images
import proj1 from "@/public/images/project (1).png";
import proj2 from "@/public/images/project (2).jpg";
import proj3 from "@/public/images/project (3).png";
import proj4 from "@/public/images/project (4).png";

const projectsData = [
  {
    title: "Lumina — e-learning platform",
    description:
      "Role-based dashboards for admins, instructors and students, Stripe checkout that enrols on success, and an in-browser IDE for exercises.",
    hardPart:
      "Enrolment had to survive a Stripe webhook landing before the student got back, so payment, enrolment and access all resolve from one source of truth.",
    tech: ["MongoDB", "Express", "React", "Stripe", "OAuth"],
    details: [
      "Built a complete MERN e-learning platform with secure authentication, Google OAuth, and role-based access for Admin, Instructor, and Student users.",
      "Integrated Stripe payments to enable secure course purchases and automated enrollment after successful checkout.",
      "Delivered an interactive learning experience with a browser-based IDE, placement-test logic, course management, and instructor dashboards.",
    ],
    image: proj1,
    link: "https://github.com/abdelrahman-elkhateeb/Lumina",
    type: "GitHub",
  },
  {
    title: "Weather Now",
    description:
      "City search and geocoding, current conditions, hourly forecasts and unit switching, in a layout that stays readable on a phone.",
    hardPart:
      "Cached forecast data and user preferences age at different rates, so they had to live in separate stores — otherwise stale weather hides behind a stale UI.",
    tech: ["React", "TanStack Query", "Zustand", "Open-Meteo"],
    details: [
      "Built a responsive weather application with city search, geocoding, current weather, hourly forecasts, and unit switching.",
      "Separated server state and client state by using TanStack Query for API data fetching and Zustand for selected city, units, and UI preferences.",
      "Improved UX with loading states, reusable weather view models, formatted dates, weather-code mapping, and scalable component structure.",
    ],
    image: proj2,
    link: "https://weather-now-phi-ecru.vercel.app/",
    type: "Live Demo",
  },
  {
    title: "Student Guide platform",
    description:
      "Schedules, rooms, TA hours, course resources and GPA tools in one mobile-first interface. Used by 100+ students, Lighthouse 98+.",
    hardPart:
      "Real timetables are messier than any data model — the work was finding one schedule shape that fit every department without a special case per course.",
    tech: ["React", "Tailwind", "Vite", "Vercel"],
    details: [
      "Built a responsive student platform that brings academic schedules, locations, TA information, courses, and key resources into one centralized interface.",
      "Implemented grade and GPA calculators to help students track academic progress and plan more accurately.",
      "Achieved 98+ Lighthouse performance and delivered a simple mobile-first experience used by 100+ students.",
    ],
    image: proj3,
    link: "https://github.com/AhmedHosny2/Student-Guide",
    type: "GitHub",
  },
  {
    title: "The Wild Oasis — hotel dashboard",
    description:
      "Internal dashboard for bookings, cabins, check-in and check-out, with hotel-wide settings and live Supabase data.",
    hardPart:
      "Check-in writes to bookings, cabins and settings in one move — compound components kept that flow from turning into four near-identical forms.",
    tech: ["React", "Supabase", "TanStack Query", "React Hook Form"],
    details: [
      "Built a feature-rich hotel management dashboard with booking workflows, cabin management, check-in/check-out flows, and global hotel settings.",
      "Used TanStack Query with Supabase to handle server state, caching, mutations, authentication, and real-time database interactions.",
      "Applied professional React patterns including compound components, custom hooks, reusable UI architecture, and form handling with React Hook Form.",
    ],
    image: proj4,
    link: "https://the-wild-oasis-dashboard-peach.vercel.app",
    type: "Live Demo",
  },
];

const experiences = [
  {
    id: 1,
    company: "EVIM",
    location: "Berlin, Germany",
    role: "Frontend Developer",
    employmentType: "Contract / Remote",
    period: "Jul 2025 – May 2026",
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
  experiences, projectsData, words, skillGroups
};

