export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export interface Experience {
  period: string;
  title: string;
  company: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  sector: string;
  description: string;
  tags: string[];
  featured?: boolean;
  image: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export const brandName = "Abubakar";
export const brandTagline = "Business Analyst · A smart BA";

export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/abubakar-ba",
    handle: "linkedin.com/in/abubakar-ba",
  },
  {
    platform: "GitHub",
    url: "https://github.com/abubakar-ba",
    handle: "github.com/abubakar-ba",
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/abubakar_ba",
    handle: "@abubakar_ba",
  },
  {
    platform: "Email",
    url: "mailto:hello@abubakar.dev",
    handle: "hello@abubakar.dev",
  },
];