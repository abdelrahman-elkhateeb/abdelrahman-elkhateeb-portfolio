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
import proj2 from "@/public/images/project (2).png"
import proj3 from "@/public/images/project (3).png"

const projectsData = [
  {
    title: "Lumina",
    description: "Full-stack MERN e-learning platform featuring secure auth, Stripe payments, and an in-browser IDE.",
    details: [
      "Built a full-stack MERN e-learning platform with secure backend authentication, Google OAuth, and role-based access control (Admin, Instructor, Student), providing tailored dashboards and permissions.",
      "Enabled secure course purchasing through Stripe API integration, allowing students to enroll seamlessly while giving admins full control over course content, structure, and pricing.",
      "Delivered an interactive learning experience by integrating a live in-browser IDE, a chatbot assistant, and a placement test system to guide course decisions, with instructors managing full CRUD operations."
    ],
    image: proj1,
    link: "https://github.com/abdelrahman-elkhateeb/Lumina",
    type: "GitHub"
  },
  {
    title: "Admin Dashboard (ShadCN UI)",
    description: "A scalable, production-ready admin interface built with Shadcn UI and interactive data visualizations.",
    details: [
      "Addressed the complexity of admin workflows by building a clear, scalable dashboard interface with intuitive navigation, a collapsible sidebar, and dark mode support.",
      "Enabled faster, data-driven decisions by transforming complex datasets into actionable visual insights using interactive charts and advanced data tables.",
      "Improved usability, reliability, and maintainability through reusable UI components, validated forms, and accessibility-first patterns—making the dashboard production-ready."
    ],
    image: proj2,
    link: "https://shadcn-dashboard-two-lovat.vercel.app/",
    type: "Live Demo"
  },
  {
    title: "Student Guide",
    description: "Mobile-first platform for academic resources, scheduling, and GPA tracking with 98+ Lighthouse performance.",
    details: [
      "Built a responsive, mobile-first student platform that brings together locations, TA information, schedules, courses, and key resources in one place, achieving 98+ Lighthouse performance.",
      "Helped students track their academic progress by providing easy-to-use grade and GPA calculators for faster and more accurate planning.",
      "Delivered a simple and intuitive interface that centralized academic tools and peer-guided course resources, adopted by 100+ students as a daily reference."
    ],
    image: proj3,
    link: "https://github.com/AhmedHosny2/Student-Guide",
    type: "GitHub"
  }
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

const milestones = [
  {
    id: 5,
    role: "Frontend Developer (Contract / Remote)",
    title: "EVIM - Enterprise Solutions (Germany Company) 🇩🇪",
    techStack: ["React.js", "TypeScript", "Fluent UI", "SPFx"],
    problem: "Enterprise clients struggled with rigid SharePoint interfaces and complex content management for non-technical staff.",
    solution: "Delivered highly customizable SPFx solutions for German enterprise clients, simplifying internal operations and improving the authoring experience.",
    highlights: [
      "Scaled frontend delivery by developing 36+ high-performance React WebParts optimized for complex enterprise environments.",
      "Accelerated development cycles by building a library of reusable UI components using React and Fluent UI.",
      "Simplified complex configurations by designing advanced SPFx property panes for non-technical users.",
      "Ensured long-term maintainability through clean code practices and consistent UI patterns."
    ]
  },
  {
    id: 1,
    role: "Frontend Developer",
    title: "Student Guide Platform",
    techStack: ["React.js", "JavaScript", "Mobile-First Design"],
    problem: "Students faced fragmented access to academic resources, leading to confusion and wasted time searching for tools.",
    solution: "Engineered a centralized digital hub to consolidate all department tools into a single, high-performance interface.",
    highlights: [
      "Achieved a 98+ Lighthouse performance score through optimized asset loading and clean architecture.",
      "Automated GPA calculations with a 100% accurate dynamic engine for academic planning.",
      "Centralized academic resources and peer-guided tools, reaching 100+ daily active student users.",
      "Prioritized UX by delivering a responsive, mobile-first design for on-the-go access."
    ]
  },
  {
    id: 3,
    role: "Full-Stack Developer",
    title: "Lumina – E-Learning Platform",
    techStack: ["React.js", "Node.js", "MongoDB", "Redux Toolkit"],
    problem: "Traditional e-learning lacks hands-on practice and personalized tracking, resulting in lower student engagement.",
    solution: "Architecting a scalable MERN ecosystem featuring live coding environments and data-driven learning paths.",
    highlights: [
      "Bridged the gap between theory and practice by integrating a live, browser-based IDE for students.",
      "Optimized global state management and data flow between client and REST API using Redux Toolkit.",
      "Automated personalized learning flows using placement-based logic for course enrollment.",
      "Empowered instructors with full CRUD operations and real-time analytics dashboards."
    ]
  },
  {
    id: 2,
    role: "MERN Stack Developer & Team Leader",
    title: "TaskTrackr – Project Management System",
    organization: "Digital Egypt Pioneers Initiative (DEPI)",
    techStack: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Jest"],
    problem: "Lack of structured oversight in team projects led to unauthorized data access and difficulty in tracking mission priorities.",
    solution: "Developed a secure, role-based project management system to enforce data integrity and improve team workflow visibility.",
    highlights: [
      "Awarded 2nd Place in a national competition for delivering a high-quality React graduation project.",
      "Led a development team to ship a production-ready system with secure RBAC (Role-Based Access Control).",
      "Enhanced decision-making by implementing advanced filtering, real-time notifications, and priority-based sorting.",
      "Ensured reliability by applying Unit Testing using Jest and React Testing Library to critical components."
    ]
  },
  {
    id: 4,
    role: "Frontend Developer (Freelance)",
    title: "IPS Wirings - Corporate Website",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    problem: "The company needed a high-end digital presence to showcase their industrial wiring solutions and attract premium clients through a modern, trustworthy interface.",
    solution: "Developed a high-performance, visually engaging corporate website focusing on conversion-driven design and seamless cross-platform accessibility.",
    highlights: [
      "Engineered a modern, responsive UI using Next.js and Shadcn UI, resulting in a premium look and feel that aligns with the brand's identity.",
      "Optimized Core Web Vitals and image delivery to ensure fast loading speeds, crucial for retaining potential B2B clients.",
      "Implemented a mobile-first architectural approach, ensuring 100% cross-browser and cross-device compatibility.",
      "Focused on UX execution by creating intuitive navigation paths to the company's portfolio and services."
    ]
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
  milestones
};
