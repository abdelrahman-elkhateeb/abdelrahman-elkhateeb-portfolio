
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
import { Briefcase, Code2, GraduationCap, MapPin } from "lucide-react";

const projectsData = [
  {
    title: "Lumina – E-Learning Platform",
    description:
      "Full-stack MERN e-learning platform with role-based dashboards, Stripe payments, Google OAuth, placement tests, and an in-browser IDE.",
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
      "Modern weather app focused on clean state separation using TanStack Query for server state and Zustand for client preferences.",
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
    title: "Student Guide Platform",
    description:
      "Mobile-first academic platform that centralizes schedules, course resources, locations, TA information, and GPA tracking tools.",
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
    title: "The Wild Oasis – Hotel Management Dashboard",
    description:
      "Internal hotel management dashboard built with React, Supabase, TanStack Query, and advanced reusable component patterns.",
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
    summary:
      "Built enterprise-grade SharePoint solutions for German clients, focusing on reusable UI systems, advanced property panes, and scalable frontend architecture.",
    achievements: [
      "Developed 36+ SPFx React WebParts for enterprise SharePoint environments.",
      "Built reusable React and Fluent UI components to accelerate delivery across multiple solutions.",
      "Designed advanced SPFx property panes that simplified content management for non-technical users.",
      "Collaborated with cross-functional teams to deliver scalable and maintainable frontend solutions.",
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
    summary:
      "Designed and developed a modern corporate website that showcases the company's industrial wiring solutions while providing a fast and professional user experience.",
    achievements: [
      "Built a responsive corporate website using Next.js and TypeScript.",
      "Implemented modern UI components with Shadcn UI and Tailwind CSS.",
      "Optimized performance and Core Web Vitals for faster page loads.",
      "Delivered a mobile-first experience across all major devices and browsers.",
    ],
  },
];

const stats = [
  {
    value: "36+",
    label: "Enterprise Components",
    icon: Briefcase,
  },
  {
    value: "15+",
    label: "Projects Built",
    icon: Code2,
  },
  {
    value: "2025",
    label: "Computer Science Graduate",
    icon: GraduationCap,
  },
  {
    value: "Cairo",
    label: "Egypt",
    icon: MapPin,
  },
];

const tech = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Zustand",
  "TanStack Query",
  "Node.js",
  "MongoDB",
];

const skillGroups = [
  {
    title: "Frontend",
    code: "FRONTEND_MODULE",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Redux Toolkit",
      "Zustand",
      "TanStack Query",
    ],
  },

  {
    title: "Backend",
    code: "BACKEND_MODULE",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Supabase",
      "Firebase",
    ],
  },

  {
    title: "Tools",
    code: "DEV_TOOLS",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "Vercel",
      "Figma",
      "VS Code",
    ],
  },

  {
    title: "Learning",
    code: "LOADING...",
    skills: ["C#", "ASP.NET", "Frontend System Design"],
  },
];

export {
  experiences, projectsData, words, stats, tech, skillGroups
};

