import { Briefcase, FolderCheck, Users } from "lucide-react";

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  {
    value: 1,
    suffix: "+",
    label: "Years of Experience",
    icon: Briefcase,
  },
  {
    value: 6,
    suffix: "+",
    label: "Completed Projects",
    icon: FolderCheck,
  },
  {
    value: 90,
    suffix: "%",
    label: "Client Retention Rate",
    icon: Users,
  },
];

// Import your images
import proj1 from "@/public/images/project (1).png"
import proj2 from "@/public/images/project (2).jpg"
import proj3 from "@/public/images/project (3).png"
import proj4 from "@/public/images/project (4).png"

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
const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review: "Adrian brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Frontend Developer",
    date: "January 2023 - Present",
    responsibilities: [
      "Developed and maintained user-facing features for the Hostinger website.",
      "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
      "Optimized web applications for maximum speed and scalability.",
    ],
  },
  {
    review: "Adrian’s contributions to Docker's web applications have been outstanding. He approaches challenges with a problem-solving mindset.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Full Stack Developer",
    date: "June 2020 - December 2023",
    responsibilities: [
      "Led the development of Docker's web applications, focusing on scalability.",
      "Worked with backend engineers to integrate APIs seamlessly with the frontend.",
      "Contributed to open-source projects that were used with the Docker ecosystem.",
    ],
  },
  {
    review: "Adrian’s work on Appwrite’s mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "React Native Developer",
    date: "March 2019 - May 2020",
    responsibilities: [
      "Built cross-platform mobile apps using React Native, integrating with Appwrite's backend services.",
      "Improved app performance and user experience through code optimization and testing.",
      "Coordinated with the product team to implement features based on feedback.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
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

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  projectsData,
  experiences
};
