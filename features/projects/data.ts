import type { ProjectEntry } from "./types";

export const projectsData: ProjectEntry[] = [
  {
    slug: "mawasem-store",
    title: "Mawasem — gifting storefront",
    name: "Mawasem storefront",
    category: "E-commerce",
    description:
      "Arabic-first storefront for seasonal gifting: discovery, filtering, wishlist, cart, and a checkout that survives a season switch.",
    descriptionShort:
      "Arabic-first storefront for seasonal gifting: discovery, wishlist, cart, checkout.",
    hardPart:
      "Products, packages, seasons and variants each bend the flow differently, so discovery and checkout had to stay predictable through all of them.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
    ],
    illustration: "mawasem-store",
    illustrationLabel: "Drawing of the Mawasem storefront: season navigation, a seasonal banner and a product grid.",
    link: "https://www.mawasem.org/",
    role: "Frontend developer",
    platforms: ["Web store", "Phone (responsive)"],
    problem: [
      "A retail brand whose range changes with the seasons needed a store customers can shop in Arabic or English, organised by season, collection and brand.",
      "Payments had to work with a local provider, and delivery had to respect delivery areas and free-delivery zones.",
    ],
    built: [
      "I built the storefront customers shop in: discovery by season, collection and brand, filtering, wishlist, cart and a checkout that survives a season switch, in Arabic and English and on a phone screen.",
    ],
    hardParts: [
      {
        title: "Seasons bend every flow",
        text: "Products, packages, seasons and variants each bend the flow differently, so discovery and checkout had to stay predictable through all of them.",
      },
      {
        title: "One store, two directions",
        text: "Arabic reads right to left and English left to right. The whole layout mirrors, not just the words: menus, arrows, product grids and checkout steps all flip to feel native in each language.",
      },
      {
        title: "Delivery that follows the address",
        text: "Each delivery area has its own rules and some deliver free. Checkout shows the right option for the customer’s address before they pay, with store pickup as the alternative.",
      },
    ],
    status: [
      "Mawasem is live at www.mawasem.org, where customers shop in Arabic and English.",
    ],
  },
  {
    slug: "mawasem-dashboard",
    title: "Mawasem — operations dashboard",
    name: "Mawasem operations dashboard",
    category: "Internal tool",
    description:
      "The back office behind the storefront: products, orders, customers, seasons, inventory, employees.",
    descriptionShort:
      "The back office behind the storefront: orders, customers, seasons, inventory.",
    hardPart:
      "Every module is CRUD with its own permissions, filters and data states, so the work was one reusable pattern, not nine near-identical screens.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "shadcn/ui",
    ],
    illustration: "mawasem-dashboard",
    illustrationLabel: "Drawing of the Mawasem dashboard: a module sidebar and an orders table with status filters.",
    noLinkReason: "Internal tool — no public link",
    role: "Frontend developer",
    platforms: ["Admin dashboard"],
    problem: [
      "The team behind the store needed one place to run products, orders, delivery and staff — and not every employee should be able to change everything.",
    ],
    built: [
      "I built the back office behind the storefront: products, categories, collections, seasons, orders, customers, inventory, reports and employees.",
    ],
    hardParts: [
      {
        title: "One pattern, not nine screens",
        text: "Every module is CRUD with its own permissions, filters and data states, so the work was one reusable pattern, not nine near-identical screens.",
      },
      {
        title: "Every employee sees only their part",
        text: "The dashboard runs the whole business, but each employee has a role, and the role decides which screens and actions they can use.",
      },
    ],
    status: [
      "The dashboard is in daily use by the Mawasem team. It is an internal tool, so there is no public link.",
    ],
  },
  {
    slug: "chillwork",
    title: "ChillWork — repair job management",
    name: "ChillWork",
    category: "Field service",
    description:
      "The frontend for a repair-company platform: a customer site for reporting units and following each visit, and a phone-first dashboard for dispatchers and technicians.",
    descriptionShort:
      "Customer site plus a phone-first dashboard for dispatchers and technicians.",
    hardPart:
      "Two apps, three roles, one session — each app proxies the API through its own origin, so HttpOnly auth cookies work and no token ever touches the browser.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "shadcn/ui",
      "Turborepo",
    ],
    illustration: "chillwork",
    illustrationLabel: "Drawing of the ChillWork jobs board: open, on-site and awaiting-approval jobs above an AI triage panel.",
    link: "https://chillwork-frontend.vercel.app",
    dashboardLink: "https://chillwork-dashboard.vercel.app",
    role: "Frontend developer",
    platforms: ["Customer website", "Dispatcher and technician dashboard (phone-first)"],
    problem: [
      "Repair companies for air conditioners, fridges and home appliances often run every job through phone calls, chat messages and paper. A customer describes the fault once, then repeats it to the dispatcher and again to the technician.",
      "Dispatchers book the same technician twice, parts fitted on site get left off the bill, and customers pay for visits that fixed nothing.",
    ],
    built: [
      "I built the frontend for both apps in one Turborepo: the customer site where people report faulty units and follow each visit, and a phone-first dashboard where dispatchers schedule work and technicians record what they did on site. Both talk to one backend.",
    ],
    features: [
      {
        illustration: "chillwork-triage",
        title: "Every request arrives already read",
        text: "Before a request is saved, AI reads each unit’s description and lists likely causes and questions to ask on site. Staff see it; the customer’s own words stay exactly as written.",
      },
      {
        illustration: "chillwork-schedule",
        title: "Scheduling that can’t double-book",
        text: "Dispatchers book visits into a technician’s free hours. A slot that overlaps existing work is refused, not just warned about.",
      },
      {
        illustration: "chillwork-parts",
        title: "Parts approved on the spot",
        text: "On site, the technician proposes catalog parts per unit, and the customer approves or declines each one before it goes in.",
      },
      {
        illustration: "chillwork-invoice",
        title: "An invoice built from what was done",
        text: "Each unit is marked repaired or not repaired. Repaired units cost their approved parts plus one labor fee; a unit left unrepaired costs nothing.",
      },
    ],
    hardParts: [
      {
        title: "Two apps, three roles, one session",
        text: "Customers, dispatchers and technicians each get a different app but sign in once. Each app proxies the API through its own origin, so the session lives in HttpOnly cookies and no token ever touches the browser.",
      },
      {
        title: "A refused booking has to read as an answer",
        text: "If two dispatchers book the same technician for overlapping times at the same second, the server accepts one. The other screen gets a plain message naming the clash, so the dispatcher picks another slot instead of retrying blind.",
      },
      {
        title: "AI that helps but never blocks",
        text: "The triage is a suggestion for staff and is never shown to customers. If the AI service is slow or down, the request still saves and staff handle it by hand, so nobody loses what they wrote.",
      },
    ],
    status: [
      "The MVP is live: the customer site at chillwork-frontend.vercel.app and the dashboard at chillwork-dashboard.vercel.app, both running on one backend.",
      "Next on the roadmap: service reports, recording payments, rescheduling visits and email notifications.",
    ],
  },
  {
    slug: "lumina",
    title: "Lumina — e-learning platform",
    name: "Lumina",
    category: "E-learning",
    description:
      "A full-stack course platform where instructors build video courses, students check their level with a placement test, buy through Stripe and practise in a code editor in the browser.",
    descriptionShort:
      "Video courses, placement tests, Stripe checkout and a code editor in the browser.",
    hardPart:
      "Three roles share one API, so who may create, edit or delete a course, section or lesson is checked on the server for every route, not just hidden in the UI.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Redux Toolkit", "Stripe"],
    illustration: "lumina",
    illustrationLabel: "Drawing of a Lumina exercise: role tabs, a lesson and an in-browser code editor with its output.",
    link: "https://github.com/abdelrahman-elkhateeb/Lumina",
    role: "Full-stack developer",
    platforms: ["Student website", "Instructor and admin dashboards"],
    problem: [
      "Learners buying an online course often can’t tell whether it matches their level until they have paid, and coding courses leave them switching to another tool to try what they just watched.",
      "Instructors need to publish and update their own courses, while someone above them keeps control of the whole catalogue.",
    ],
    built: [
      "I built both sides alone: the Node.js and Express API on MongoDB, and the React client with Redux Toolkit.",
      "Instructors create courses with a preview video, price and category, then add sections, video lessons and a placement test. Students browse, take the test, pay by card through Stripe Checkout, and watch lessons in My Learning, with a code editor that runs JavaScript, TypeScript, Python, Java, C# and PHP, and an AI chat assistant built on Gemini.",
    ],
    hardParts: [
      {
        title: "Three roles, one API",
        text: "Students, instructors and admins all call the same API. Every protected route checks the signed-in user’s role on the server: instructors create courses, sections and lessons, admins moderate and delete them, and students only read what they own.",
      },
      {
        title: "Two ways in, one session",
        text: "Users sign up with email and password or continue with Google. The Google token is verified on the server with Firebase Admin, and both paths end in the same JWT in an HttpOnly cookie, so the rest of the app never knows which one was used.",
      },
      {
        title: "Course video without a media server",
        text: "Preview videos, lesson videos and course images are streamed from the upload straight to Cloudinary, so the API stores only links and never keeps large files on disk.",
      },
    ],
    status: [
      "Lumina was built as a complete MERN project. The source for both the API and the client is on GitHub.",
    ],
  },
  {
    slug: "foodie",
    title: "Foodie — food ordering platform",
    name: "Foodie",
    category: "Food ordering",
    description:
      "Menu, cart, checkout and live order tracking in English and Arabic, with a public demo dashboard for products, orders and sales stats.",
    descriptionShort:
      "Menu, cart, checkout and live order tracking in English and Arabic.",
    hardPart:
      "The order total is computed in a Postgres function, not the browser, so a cart edited in devtools still pays the real price.",
    tech: ["React", "TypeScript", "Supabase", "TanStack Query", "Zustand"],
    illustration: "foodie",
    illustrationLabel: "Drawing of Foodie: live order tracking beside the restaurant’s seven-day activity chart.",
    link: "https://food-ordering-app-pearl-alpha.vercel.app",
    platforms: ["Ordering website", "Restaurant dashboard"],
    problem: [
      "Restaurants that take orders by phone or through big delivery apps lose control of their menu, their customers and a share of every order, and customers keep calling to ask where their food is.",
      "A restaurant needs its own ordering site in Arabic and English that shows each order’s progress without phone calls and gives the owner a clear view of the day.",
    ],
    built: [
      "Two sides of one platform: an ordering site with menu, cart, checkout and live tracking, and a restaurant dashboard with products, orders and sales stats, both in Arabic and English.",
    ],
    hardParts: [
      {
        title: "Prices the browser can’t change",
        text: "The order total is computed in a Postgres function, not the browser, and the order and its items save in one step, so a cart edited in devtools still pays the real price.",
      },
      {
        title: "Live tracking without refreshing",
        text: "When the kitchen moves an order to preparing or out for delivery, the customer’s tracking screen updates by itself within moments.",
      },
      {
        title: "A public demo anyone can try safely",
        text: "Visitors can open the restaurant dashboard and add their own dishes, but database rules stop them from editing the real menu, and deleting a dish that appears in past orders archives it instead.",
      },
    ],
    status: [
      "Foodie is live as a public demo: browse the menu, place an order, then open the restaurant dashboard and move it through the kitchen.",
    ],
  },
  {
    slug: "weather-now",
    title: "Weather Now",
    name: "Weather Now",
    category: "Weather app",
    description:
      "Search any city and see current conditions, an hourly forecast for each day and a seven-day outlook, with temperature, wind and rain units you can switch one by one.",
    descriptionShort:
      "City search, current conditions, hourly and seven-day forecasts, switchable units.",
    hardPart:
      "The forecast is fetched once and cached; switching °C to °F, km/h to mph or mm to inches converts what is on screen instead of asking the API again.",
    tech: ["React", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS", "Open-Meteo"],
    illustration: "weather",
    illustrationLabel: "Drawing of Weather Now: city search, the units menu, current temperature and an hourly forecast row.",
    link: "https://weather-now-phi-ecru.vercel.app/",
    role: "Frontend developer",
    platforms: ["Web app (phone, tablet and desktop)"],
    problem: [
      "Checking the weather should take seconds: type a city, see what it is like now, how today goes hour by hour and what the week looks like, in the units you think in.",
    ],
    built: [
      "I built the whole app with React 19 and TypeScript on the free Open-Meteo API: city search with suggestions, current conditions with feels-like, humidity, wind and rain, an hourly forecast you can switch between days, a seven-day outlook, and loading skeletons for each panel.",
    ],
    hardParts: [
      {
        title: "Switching units never refetches",
        text: "The forecast is cached by TanStack Query under the city’s coordinates, and the unit choice lives separately in Zustand. Changing temperature, wind or rain units, one at a time or all at once, converts the numbers on screen without another request.",
      },
      {
        title: "Search that waits for you",
        text: "City suggestions are debounced and only start after three letters, so typing doesn’t fire a request per key. The forecast loads only when a city is picked and searched.",
      },
      {
        title: "Shape the data once",
        text: "The API returns long flat arrays. They are reshaped once, as they arrive, into what the screen needs, with hourly readings already grouped by day, so picking another day in the hourly panel is instant.",
      },
    ],
    status: [
      "Weather Now is live at weather-now-phi-ecru.vercel.app. It needs no account or API key.",
    ],
  },
  {
    slug: "student-guide",
    title: "Student Guide platform",
    name: "Student Guide",
    category: "Student tool",
    description:
      "A university companion built by a student team: group timetables, office locations, the TA directory, course resources, grade and GPA calculators. Used by 100+ students, Lighthouse 98+.",
    descriptionShort:
      "Timetables, offices, TA directory, grade and GPA tools. 100+ students, Lighthouse 98+.",
    hardPart:
      "One script builds the header for every page, so links, sign-in state and admin-only pages behave the same on twenty pages without copying the menu into each.",
    tech: ["JavaScript", "HTML", "CSS", "Node.js", "Express", "MongoDB"],
    illustration: "student-guide",
    illustrationLabel: "Drawing of the Student Guide schedules page: a group picker above a timetable of days and slots with course and room in each.",
    link: "https://github.com/AhmedHosny2/Student-Guide",
    role: "Frontend developer in a student team",
    platforms: ["Website (phone-friendly)"],
    problem: [
      "Computer science students had their timetables, office locations, TA office hours and course material spread across PDFs, group chats and notice boards.",
      "A group of students set out to put it all in one site any student could open on a phone between lectures.",
    ],
    built: [
      "The team split the work into a plain HTML, CSS and JavaScript client and small Node.js services for users, courses and the TA directory on MongoDB.",
      "On the client I built the shared navigation and its phone menu, the locations, schedules, profile and major-selection pages, and much of the styling and fixes across the other pages.",
    ],
    hardParts: [
      {
        title: "One navigation for twenty pages",
        text: "The header is built by one script instead of being copied into every page. It fixes link paths whether a page sits at the root or in a folder, swaps links for signed-in students, shows admins their requests page, and sends visitors without access back to the login page.",
      },
      {
        title: "Seven timetables, one page",
        text: "Each year and major has its own timetable. Students pick their group from a list and only that table appears, with the course, group and room in every slot.",
      },
      {
        title: "Made for a phone between lectures",
        text: "Most visits happen on a phone in a corridor, so pages were laid out for small screens first and the navigation folds into a phone menu.",
      },
    ],
    status: [
      "Student Guide was used by students in the department. The source is on GitHub under a teammate’s account.",
    ],
  },
  {
    slug: "the-wild-oasis",
    title: "The Wild Oasis — hotel dashboard",
    name: "The Wild Oasis",
    category: "Hotel dashboard",
    description:
      "The staff dashboard for a small cabin hotel: bookings, cabins, check-in and check-out, sales and stay charts, and hotel-wide settings on live Supabase data.",
    descriptionShort:
      "Bookings, cabins, check-in and check-out, sales charts on live Supabase data.",
    hardPart:
      "Filter, sort and page live in the URL and run inside the Supabase query, so the table downloads one page at a time and the neighbouring pages are already fetched.",
    tech: ["React", "Supabase", "TanStack Query", "React Hook Form", "styled-components", "Recharts"],
    illustration: "wild-oasis",
    illustrationLabel: "Drawing of The Wild Oasis bookings table with check-in status for each cabin.",
    link: "https://the-wild-oasis-dashboard-peach.vercel.app",
    role: "Frontend developer",
    platforms: ["Staff dashboard"],
    problem: [
      "A small hotel with a handful of cabins needs its staff to see every booking, welcome guests, take payment and keep prices and rules up to date, without a spreadsheet.",
    ],
    built: [
      "I built the dashboard on Supabase for the database, sign-in and image storage: bookings with filters, sorting and pages, cabin management with photos and discounts, check-in and check-out, a home screen with sales and stay charts for the last 7, 30 or 90 days, hotel settings, staff accounts with avatars, and a dark mode that remembers the choice.",
      "It was built to practise advanced React patterns: compound components for tables, menus and modals, and custom hooks for every piece of data.",
    ],
    hardParts: [
      {
        title: "Filters that live in the URL",
        text: "Status filter, sort order and page number are kept in the address bar and passed straight into the Supabase query, so only one page of bookings is downloaded, a filtered view can be bookmarked, and the next and previous pages are fetched ahead of time.",
      },
      {
        title: "A check-in that adds up",
        text: "Breakfast is priced from the hotel settings for each guest and night. Staff must confirm the guest has paid before the button unlocks, and the new status, payment and total are saved in one update.",
      },
      {
        title: "Today’s guests in one query",
        text: "The home screen asks the database only for guests arriving or leaving today, instead of downloading every booking and filtering in the browser.",
      },
    ],
    status: [
      "The Wild Oasis is live at the-wild-oasis-dashboard-peach.vercel.app.",
    ],
  },
];

export function getProject(slug: string) {
  return projectsData.find(project => project.slug === slug);
}

/** The project after this one, wrapping at the end of the list. */
export function getNextProject(slug: string) {
  const index = projectsData.findIndex(project => project.slug === slug);
  return projectsData[(index + 1) % projectsData.length];
}

/** "https://www.mawasem.org/" → "www.mawasem.org" for display. */
export function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function isSourceLink(url: string) {
  return url.includes("github.com");
}
