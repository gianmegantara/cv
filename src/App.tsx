import type { CSSProperties } from "react";
import data from "../data/profile.json";
import { Icon } from "./Icon";
import type { ProfileData } from "./types";

const profile = data as unknown as ProfileData;

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

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="Teknologi">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function App() {
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
        <button
          type="button"
          className="button"
          onClick={() => window.print()}
        >
          <Icon name="download" size={15} />
          Unduh PDF
        </button>
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

        <Section title="Keahlian">
          <div className="skills">
            {skills.map((group) => (
              <article className="skill" key={group.group}>
                <div className="skill-head">
                  <Icon name={group.icon} size={18} />
                  <h3>{group.group}</h3>
                </div>
                <Tags items={group.items} />
              </article>
            ))}
          </div>
        </Section>

        <Section title="Pengalaman">
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
                  <Tags items={job.stack} />
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Proyek">
          <div className="projects featured">
            {featured.map((project) => (
              <article className="project" key={project.name}>
                <p className="project-role">{project.role}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <Tags items={project.stack} />
              </article>
            ))}
          </div>
          <ul className="projects rest">
            {others.map((project) => (
              <li key={project.name}>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <Tags items={project.stack} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Pendidikan">
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
              <p className="project-role">Publikasi</p>
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
        <p className="footer-note">Dibuat dengan React + Vite.</p>
      </footer>
    </div>
  );
}
