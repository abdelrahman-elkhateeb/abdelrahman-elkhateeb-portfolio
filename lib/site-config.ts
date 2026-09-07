const givenName = "Abdelrahman";
const familyName = "Elkhateeb";

export const siteConfig = {
  givenName,
  familyName,
  name: `${givenName} ${familyName}`,
  title: `${givenName} ${familyName} Portfolio`,
  description: "Frontend developer portfolio showcasing projects, skills, and experience. Explore my work and get in touch!",
};

export const contactEmail = "abdelrahmanelkhateeb10@gmail.com";

export const contactLinks = [
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

export const NAV_LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Tech stack", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const socialLinks = { github: contactLinks[0].href, linkedin: "https://www.linkedin.com/in/abdelrahman-elkhateeb", frontendMentor: "https://www.frontendmentor.io/profile/abdelrahman-elkhateeb" };
