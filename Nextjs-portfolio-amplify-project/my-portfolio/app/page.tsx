import type { SVGProps } from "react"
import Link from "next/link"
import { ArrowUpRight, Mail, MapPin } from "lucide-react"

/* ---------------------------------- Data ---------------------------------- */

const profile = {
  name: "Fatemeh Feyzipour",
  role: "Aspiring Cloud Engineer",
  location: "Vancouver, BC",
  tagline: "AWS Certified Cloud Practitioner building hands-on, secure cloud infrastructure.",
  intro:
    "I'm an AWS Certified Cloud Practitioner with hands-on experience across S3, CloudFront, EC2, and IAM. I use Infrastructure as Code and generative AI tools to speed up troubleshooting, documentation, and automation. With a strong background in client-facing work and technical documentation, I'm seeking opportunities in cloud support, cloud operations, or junior cloud engineering.",
  email: "fatemehfeizipur@gmail.com",
  // TODO: replace with your GitHub profile URL
  github: "https://github.com/fatemehfeizipour",
  linkedin: "https://www.linkedin.com/in/fatemeh-feyzipour/",
}

const skills = [
  "AWS",
  "EC2",
  "S3",
  "CloudFront",
  "IAM",
  "VPC",
  "RDS",
  "CloudWatch",
  "CloudFormation",
  "AWS CLI",
  "Python",
  "Bash",
  "HTML",
  "CSS",
  "JavaScript",
  "Git & GitHub",
]

type Project = {
  title: string
  description: string
  stack: string[]
  link: string
}

const projects: Project[] = [
  {
    title: "Static Website on S3 + CloudFront with Terraform",
    description:
      "Built and deployed a static website using Amazon S3 for storage and Amazon CloudFront for global content delivery,  exploring multilayer S3 security.",
    stack: ["S3", "CloudFront", "DNS"],
    link: "https://github.com/fatemehfeizipour/Projects/tree/main/terraform-portfolio-project/terraform-nextjs-blog",
  },
  {
    title: "Static Website on S3 + CloudFront with CloudFormation",
    description:
      "Built and deployed a static website using Amazon S3 for storage and Amazon CloudFront for global content delivery, exploring multilayer S3 security.",
    stack: ["IAM", "Security", "AWS"],
    link: "https://github.com/fatemehfeizipour/Projects/tree/main/cloudformation-projects",
  },
  {
    title: "Infrastructure as Code with CloudFormation",
    description:
      "Designed and deployed AWS infrastructure using CloudFormation, including VPCs, subnets, EC2, IAM, Auto Scaling Groups, Load Balancers, and NAT Gateways.",
    stack: ["CloudFormation", "VPC", "EC2"],
    link: "https://github.com/fatemehfeizipour/Projects/tree/main/cloudformation-projects",
  },
  {
    title: "Infrastructure as Code with Terraform",
    description:
      "Designed and deployed AWS infrastructure using Terraform, including VPCs, subnets, EC2, IAM, Auto Scaling Groups, Load Balancers, and NAT Gateways.",
    stack: ["Terraform", "VPC", "EC2"],
    link: "https://github.com/fatemehfeizipour/Projects/tree/main/terraform-portfolio-project/terraform-VPC",
  },
]

type Experience = {
  role: string
  company: string
  period: string
  description: string
}

const experience: Experience[] = [
  {
    role: "Cloud Engineer Intern",
    company: "Cloud Engineer Academy",
    period: "Jan 2026 — Present",
    description:
      "Designing and deploying AWS infrastructure with CloudFormation (VPCs, EC2, IAM, Auto Scaling, Load Balancers, NAT Gateways). Documenting hands-on projects with Git/GitHub, creating architecture diagrams, and leveraging generative AI to accelerate troubleshooting and optimize templates.",
  },
  {
    role: "Immigration Assistant",
    company: "Immigration Firms, Vancouver",
    period: "2021 — 2025",
    description:
      "Managed structured client documentation and multi-step application workflows, ensuring accuracy and regulatory compliance. Produced detailed technical documentation and reports with a high attention to detail.",
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2014 — 2016",
    description:
      "Built and customized responsive websites using HTML, CSS, JavaScript, and WordPress. Worked directly with clients to deliver functional web solutions and handle updates and troubleshooting.",
  },
]

type Education = {
  credential: string
  school: string
  period: string
  detail: string
}

const education: Education[] = [
  {
    credential: "AWS Certified Cloud Practitioner",
    school: "Amazon Web Services",
    period: "2026",
    detail: "Validated foundational knowledge of AWS cloud concepts, services, security, and pricing.",
  },
  {
    credential: "Diploma, Immigration Assistant",
    school: "CDI College, Vancouver",
    period: "2023 — 2024",
    detail: "Graduated with an 87.68 grade. Focused on structured documentation, workflow management, and client communication.",
  },
  {
    credential: "Bachelor's Degree, Accounting",
    school: "Imam Reza International University",
    period: "2007 — 2011",
    detail: "Built a strong foundation in analytical thinking, financial reporting, and detail-oriented work.",
  },
]

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]

/* --------------------------------- Icons ---------------------------------- */

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

/* -------------------------------- Sections -------------------------------- */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e2e8ee] bg-white/80 backdrop-blur-md">
      <div className="h-1 bg-[#1f6f8b]" aria-hidden="true" />
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        <Link href="#top" className="flex items-center gap-2 text-sm font-medium tracking-tight text-[#1c2b36]">
          <span className="size-2.5 rounded-full bg-[#1f6f8b]" aria-hidden="true" />
          {profile.name}
        </Link>
        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-[#5c6b78] transition-colors hover:text-[#1c2b36]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section id="about" className="scroll-mt-20 pt-16 sm:pt-24">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe0ea] bg-[#eef4f8] px-3 py-1 text-sm font-medium text-[#2a5f7a]">
          <span className="size-1.5 rounded-full bg-[#1f6f8b]" aria-hidden="true" />
          AWS Certified Cloud Practitioner
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe0ea] bg-[#eef4f8] px-3 py-1 text-sm font-medium text-[#2a5f7a]">
          Open to cloud roles
        </span>
        <span className="inline-flex items-center gap-2 text-sm text-[#5c6b78]">
          <MapPin className="size-4" aria-hidden="true" />
          {profile.location}
        </span>
      </div>

      <h1 className="mt-6 text-pretty text-4xl font-semibold leading-tight tracking-tight text-[#1c2b36] sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-3 font-serif text-2xl italic text-[#1f6f8b] sm:text-3xl">{profile.role}</p>

      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#5c6b78]">
        {profile.tagline}
      </p>
      <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[#5c6b78]">
        {profile.intro}
      </p>

      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Skills">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-[#cfe0ea] bg-[#eef4f8] px-3 py-1 text-sm font-medium text-[#2a5f7a]"
          >
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-md bg-[#1c2b36] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Mail className="size-4" aria-hidden="true" />
          Get in touch
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-[#e2e8ee] px-4 py-2 text-sm font-medium text-[#1c2b36] transition-colors hover:bg-[#f1f5f8]"
        >
          <GithubIcon className="size-4" />
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-[#e2e8ee] px-4 py-2 text-sm font-medium text-[#1c2b36] transition-colors hover:bg-[#f1f5f8]"
        >
          <LinkedinIcon className="size-4" />
          LinkedIn
        </a>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20 border-t border-[#e2e8ee] pt-16">
      <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#1f6f8b]">
        <span className="h-px w-6 bg-[#1f6f8b]" aria-hidden="true" />
        Selected Work
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border border-[#e2e8ee] bg-white p-6 transition-all hover:border-[#1f6f8b]/50 hover:shadow-[0_1px_20px_-8px_#1f6f8b]"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-medium leading-snug tracking-tight text-[#1c2b36]">{project.title}</h3>
              <ArrowUpRight
                className="size-5 shrink-0 text-[#5c6b78] transition-colors group-hover:text-[#1f6f8b]"
                aria-hidden="true"
              />
            </div>
            <p className="mt-3 flex-1 text-pretty leading-relaxed text-[#5c6b78]">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md bg-[#eef4f8] px-2 py-0.5 text-xs font-medium text-[#2a5f7a]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </a>
        ))}
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-[#e2e8ee] pt-16">
      <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#1f6f8b]">
        <span className="h-px w-6 bg-[#1f6f8b]" aria-hidden="true" />
        Experience
      </h2>

      <ol className="mt-8 flex flex-col gap-8 border-l border-[#cfe0ea] pl-6 sm:border-l-0 sm:pl-0">
        {experience.map((item) => (
          <li
            key={`${item.company}-${item.period}`}
            className="relative flex flex-col gap-1 sm:flex-row sm:gap-8"
          >
            <span
              className="absolute -left-[1.9rem] top-1.5 size-2.5 rounded-full border-2 border-[#1f6f8b] bg-white sm:hidden"
              aria-hidden="true"
            />
            <p className="shrink-0 pt-0.5 text-sm font-medium text-[#2a5f7a] sm:w-40">
              {item.period}
            </p>
            <div>
              <h3 className="font-medium tracking-tight text-[#1c2b36]">
                {item.role} <span className="text-[#1f6f8b]">· {item.company}</span>
              </h3>
              <p className="mt-2 max-w-xl text-pretty leading-relaxed text-[#5c6b78]">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function EducationSection() {
  return (
    <section id="education" className="scroll-mt-20 border-t border-[#e2e8ee] pt-16">
      <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#1f6f8b]">
        <span className="h-px w-6 bg-[#1f6f8b]" aria-hidden="true" />
        Education &amp; Certifications
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {education.map((item) => (
          <div
            key={item.credential}
            className="flex flex-col rounded-xl border border-[#e2e8ee] bg-white p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-medium leading-snug tracking-tight text-[#1c2b36]">
                {item.credential}
              </h3>
              <span className="shrink-0 text-sm font-medium text-[#2a5f7a]">{item.period}</span>
            </div>
            <p className="mt-1 text-sm text-[#1f6f8b]">{item.school}</p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-[#5c6b78]">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-[#e2e8ee] py-16">
      <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#1f6f8b]">
        <span className="h-px w-6 bg-[#1f6f8b]" aria-hidden="true" />
        Contact
      </h2>

      <div className="mt-6 rounded-2xl border border-[#cfe0ea] bg-[#eef4f8] p-8">
        <p className="max-w-xl text-pretty text-2xl font-medium leading-snug tracking-tight text-[#1c2b36]">
          Have a project or a role in mind? I&apos;d love to hear about it.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-4 inline-flex items-center gap-2 font-serif text-2xl italic text-[#1f6f8b] underline-offset-4 hover:underline"
        >
          <Mail className="size-5" aria-hidden="true" />
          {profile.email}
        </a>
      </div>

      <div className="mt-8 flex items-center gap-5">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5c6b78] transition-colors hover:text-[#1c2b36]"
          aria-label="GitHub"
        >
          <GithubIcon className="size-5" />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5c6b78] transition-colors hover:text-[#1c2b36]"
          aria-label="LinkedIn"
        >
          <LinkedinIcon className="size-5" />
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="text-[#5c6b78] transition-colors hover:text-[#1c2b36]"
          aria-label="Email"
        >
          <Mail className="size-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

/* ---------------------------------- Page ---------------------------------- */

export default function Page() {
  return (
    <div id="top" className="relative min-h-screen bg-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[#eef4f8]/60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />
      <SiteHeader />
      <main className="relative mx-auto max-w-3xl px-6">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
      <footer className="border-t border-[#e2e8ee]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-8 text-sm text-[#5c6b78]">
          <span>
            &copy; {new Date().getFullYear()} {profile.name}
          </span>
          <span>Built with care.</span>
        </div>
      </footer>
    </div>
  )
}
