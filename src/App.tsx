import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import dataId from "../data/profile.id.json";
import dataEn from "../data/profile.en.json";
import { Icon } from "./Icon";
import type { ProfileData } from "./types";

type Lang = "id" | "en";

const datasets: Record<Lang, ProfileData> = {
  id: dataId as unknown as ProfileData,
  en: dataEn as unknown as ProfileData,
};

const ui = {
  id: {
    download: "Unduh PDF",
    skills: "Keahlian",
    experience: "Pengalaman",
    projects: "Proyek",
    education: "Pendidikan",
    publication: "Publikasi",
    tech: "Teknologi",
    builtWith: "Dibuat dengan React + Vite.",
    language: "Bahasa",
  },
  en: {
    download: "Download PDF",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    publication: "Publication",
    tech: "Technologies",
    builtWith: "Built with React + Vite.",
    language: "Language",
  },
};

const isReal = (value?: string) =>
  Boolean(value) && !value!.startsWith("_review");

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("62")) {
    const rest = digits.slice(2);
    return `+62 ${rest.slice(0, 3)}-${rest.slice(3, 7)}-${rest.slice(7)}`;
  }
  return phone;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

function Tags({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="tags" aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const query = new URLSearchParams(window.location.search).get("lang");
    if (query === "en" || query === "id") return query;
    const saved = localStorage.getItem("cv-lang");
    return saved === "en" ? "en" : "id";
  });

  const profile = datasets[lang];
  const t = ui[lang];

  useEffect(() => {
    localStorage.setItem("cv-lang", lang);
    document.documentElement.lang = lang;
    document.title = `${profile.profile.name} — ${profile.profile.title}`;
  }, [lang, profile.profile.name, profile.profile.title]);

  const { profile: p, skills, experience, projects, education } = profile;
  const links = p.links.filter((link) => isReal(link.url));
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <div
      className="page"
      style={{ "--accent": profile.site.theme.accent } as CSSProperties}
    >
      <header className="topbar no-print">
        <span className="topbar-name">{p.name}</span>
        <div className="topbar-actions">
          <div className="lang" role="group" aria-label={t.language}>
            <button
              type="button"
              className={lang === "id" ? "active" : ""}
              onClick={() => setLang("id")}
              aria-pressed={lang === "id"}
            >
              ID
            </button>
            <button
              type="button"
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className="button"
            onClick={() => window.print()}
          >
            <Icon name="download" size={15} />
            {t.download}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">
            {p.title} · {p.location}
          </p>
          <h1>{p.name}</h1>
          <p className="tagline">{p.tagline}</p>
          <p className="summary">{p.summary}</p>

          <ul className="contacts">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  <Icon name={link.icon} size={16} />
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`tel:+${p.phone}`}>
                <Icon name="mail" size={16} />
                {formatPhone(p.phone)}
              </a>
            </li>
          </ul>
        </section>

        <Section title={t.skills}>
          <div className="skills">
            {skills.map((group) => (
              <article className="skill" key={group.group}>
                <div className="skill-head">
                  <Icon name={group.icon} size={18} />
                  <h3>{group.group}</h3>
                </div>
                <Tags items={group.items} label={t.tech} />
              </article>
            ))}
          </div>
        </Section>

        <Section title={t.experience}>
          <ol className="timeline">
            {experience.map((job) => (
              <li className="job" key={`${job.company}-${job.period}`}>
                <p className="job-period">{job.period}</p>
                <div className="job-body">
                  <h3>
                    {job.role} <span className="sep">·</span>{" "}
                    <span className="company">{job.company}</span>
                  </h3>
                  <p className="job-location">{job.location}</p>
                  <p className="job-summary">{job.summary}</p>
                  <ul className="bullets">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <Tags items={job.stack} label={t.tech} />
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title={t.projects}>
          <div className="projects featured">
            {featured.map((project) => (
              <article className="project" key={project.name}>
                <p className="project-role">{project.role}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <Tags items={project.stack} label={t.tech} />
              </article>
            ))}
          </div>
          <ul className="projects rest">
            {others.map((project) => (
              <li key={project.name}>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <Tags items={project.stack} label={t.tech} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t.education}>
          {education.map((item) => (
            <div className="education" key={item.school}>
              <div>
                <h3>{item.school}</h3>
                <p>{item.degree}</p>
              </div>
              <p className="job-period">{item.period}</p>
            </div>
          ))}
          {profile.publication && isReal(profile.publication.title) && (
            <div className="publication">
              <p className="project-role">{t.publication}</p>
              <h3>{profile.publication.title}</h3>
              <p>
                {profile.publication.venue} ·{" "}
                <a
                  href={profile.publication.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  DOI
                </a>
              </p>
            </div>
          )}
        </Section>
      </main>

      <footer>
        <p>
          {p.name} ·{" "}
          <a href={`mailto:${p.email}`}>{p.email}</a> ·{" "}
          {formatPhone(p.phone)}
        </p>
        <p className="footer-note">{t.builtWith}</p>
      </footer>
    </div>
  );
}
