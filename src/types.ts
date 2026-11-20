export interface Link {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "mail";
}

export interface Profile {
  name: string;
  displayName: string;
  title: string;
  tagline: string;
  location: string;
  workMode: string;
  email: string;
  phone: string;
  photo: string;
  summary: string;
  openTo: string[];
  languages: { name: string; level: string }[];
  links: Link[];
}

export interface SkillGroup {
  group: string;
  icon: "code" | "database" | "bot" | "cloud";
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  stack: string[];
}

export interface Project {
  name: string;
  role: string;
  summary: string;
  stack: string[];
  featured: boolean;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface Publication {
  title: string;
  venue: string;
  url: string;
}

export interface ProfileData {
  profile: Profile;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  publication?: Publication;
  site: {
    lang: string;
    sections: string[];
    theme: { mode: string; accent: string; font: string; vibe: string };
  };
}
