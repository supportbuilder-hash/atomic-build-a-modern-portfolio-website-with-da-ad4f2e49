"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, BarChart2, CheckCircle, FileText, Layers, Search, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
type brandConstants = any;
const brandConstants: any = [];
import { fadeInUp, staggerContainer, slideInLeft, slideInRight, scaleIn } from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const SKILLS = [
  { icon: Search, label: "Requirements Gathering", desc: "Translating stakeholder needs into clear, actionable specifications." },
  { icon: BarChart2, label: "Data Analysis", desc: "Turning raw data into insights that drive confident decisions." },
  { icon: FileText, label: "Process Documentation", desc: "Mapping workflows and writing specs that teams actually use." },
  { icon: Users, label: "Stakeholder Management", desc: "Bridging the gap between business goals and technical delivery." },
  { icon: TrendingUp, label: "KPI Design", desc: "Defining metrics that measure what truly matters to the business." },
  { icon: Layers, label: "Systems Thinking", desc: "Seeing the whole picture before optimising any single part." },
];

const STATS = [
  { value: "40+", label: "Projects Delivered" },
  { value: "12", label: "Industries Served" },
  { value: "95%", label: "Stakeholder Satisfaction" },
  { value: "8 yrs", label: "Professional Experience" },
];

const FEATURED_PROJECTS = [
  {
    title: "ERP Migration for Retail Chain",
    category: "Process Improvement",
    outcome: "Reduced order-processing time by 38% across 14 store locations.",
    tags: ["ERP", "Gap Analysis", "Change Management"],
  },
  {
    title: "Customer Journey Mapping",
    category: "UX Research",
    outcome: "Identified 6 friction points that lifted NPS by 22 points in one quarter.",
    tags: ["Journey Mapping", "Interviews", "Affinity Diagrams"],
  },
  {
    title: "Financial Reporting Automation",
    category: "Data & Analytics",
    outcome: "Eliminated 120 hours of manual reporting per month through smart automation.",
    tags: ["SQL", "Power BI", "Automation"],
  },
];

const TESTIMONIALS = [
  {
    quote: "Abubakar has a rare ability to make complex requirements feel simple. He kept every stakeholder aligned from kickoff to launch.",
    author: "Fatima Al-Rashid",
    role: "Head of Product, FinServe Ltd",
  },
  {
    quote: "His documentation is the clearest I have ever seen. The dev team had zero ambiguity — we shipped on time and on budget.",
    author: "James Okonkwo",
    role: "Engineering Lead, Nexus Systems",
  },
  {
    quote: "Abubakar spotted a process gap in week one that saved us six figures. He is the kind of analyst you want on every project.",
    author: "Priya Nair",
    role: "COO, Brightpath Logistics",
  },
];

// ─── Hero section ────────────────────────────────────────────────────────────

const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const heroBadge: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section
        id="home"
        className="relative min-h-[92vh] flex items-center bg-[var(--background)]"
      >
        {/* Mesh glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[var(--brand-accent)]/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--brand-accent)]/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36 grid md:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.span
              variants={heroBadge}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--brand-accent)]"
            >
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              {t("hero.badge")}
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--foreground)] leading-[1.05] text-balance"
            >
              {t("hero.greeting")}{" "}
              <span className="text-[var(--brand-accent)]">{brandConstants.name}</span>
              {t("hero.headlineSuffix")}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-lg text-pretty"
            >
              {t("hero.subheadline")}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-6 py-3 text-sm font-semibold text-[var(--brand-accent-foreground)] shadow-[0_4px_24px_-4px_var(--brand-accent)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_8px_32px_-4px_var(--brand-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
              >
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
              >
                {t("hero.cta.secondary")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right visual card */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="hidden md:flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Floating card */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[0_2px_4px_rgba(0,0,0,0.06),0_24px_64px_-12px_rgba(0,0,0,0.25)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-full bg-[var(--brand-accent)]/20 flex items-center justify-center text-2xl font-bold text-[var(--brand-accent)]">
                    A
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{brandConstants.name}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{brandConstants.title}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["Requirements Analysis", "Stakeholder Alignment", "Data-Driven Insights"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-[var(--brand-accent)] shrink-0" aria-hidden="true" />
                      <span className="text-sm text-[var(--muted-foreground)]">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--border)] grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-[var(--foreground)]">40+</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Projects</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--foreground)]">8 yrs</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Experience</p>
                  </div>
                </div>
              </div>
              {/* Decorative dot grid */}
              <div
                aria-hidden="true"
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, var(--brand-accent) 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <Reveal>
        <section className="border-y border-[var(--border)] bg-[var(--card)]">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {STATS.map((stat) => (
                <motion.li key={stat.label} variants={scaleIn} className="text-center">
                  <p className="text-4xl font-bold text-[var(--brand-accent)] tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">{stat.label}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      </Reveal>

      {/* ── Skills / Services ── */}
      <Reveal>
        <section id="about" className="bg-[var(--background)] py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                {t("skills.eyebrow")}
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] text-balance">
                {t("skills.heading")}
              </h2>
              <p className="mt-4 text-lg text-[var(--muted-foreground)] leading-relaxed text-pretty">
                {t("skills.subheading")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {SKILLS.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.label}
                    variants={fadeInUp}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_40px_-8px_rgba(0,0,0,0.2)] ${i === 0 ? "lg:col-span-1" : ""}`}
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-accent)]/15 text-[var(--brand-accent)] transition-colors duration-300 group-hover:bg-[var(--brand-accent)]/25">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 font-semibold text-[var(--foreground)]">{skill.label}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{skill.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Featured Projects ── */}
      <Reveal>
        <section className="bg-[var(--muted)]/40 py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-xl">
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                  {t("projects.eyebrow")}
                </span>
                <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] text-balance">
                  {t("projects.heading")}
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-accent)] hover:underline underline-offset-4 transition-all"
              >
                {t("projects.viewAll")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {FEATURED_PROJECTS.map((project, i) => (
                <Reveal key={project.title} delay={i * 0.1}>
                  <motion.article
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_20px_48px_-8px_rgba(0,0,0,0.22)]"
                  >
                    <span className="mb-4 inline-flex w-fit rounded-full bg-[var(--brand-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-accent)]">
                      {project.category}
                    </span>
                    <h3 className="mb-3 text-lg font-bold text-[var(--foreground)] leading-snug">
                      {project.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {project.outcome}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--muted-foreground)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Testimonials ── */}
      <Reveal>
        <section className="bg-[var(--background)] py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                {t("testimonials.eyebrow")}
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] text-balance">
                {t("testimonials.heading")}
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid md:grid-cols-3 gap-6"
            >
              {TESTIMONIALS.map((t_item, i) => (
                <motion.blockquote
                  key={t_item.author}
                  variants={fadeInUp}
                  className={`rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] flex flex-col gap-5 ${i === 1 ? "md:mt-6" : ""}`}
                >
                  <div className="flex gap-1" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="h-4 w-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="flex-1 text-[var(--foreground)] leading-relaxed text-sm">
                    &ldquo;{t_item.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
                    <div className="h-9 w-9 rounded-full bg-[var(--brand-accent)]/20 flex items-center justify-center text-sm font-bold text-[var(--brand-accent)] shrink-0">
                      {t_item.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{t_item.author}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{t_item.role}</p>
                    </div>
                  </footer>
                </motion.blockquote>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <section className="bg-[var(--brand-accent)] py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--brand-accent-foreground)] text-balance mb-4">
                {t("cta.heading")}
              </h2>
              <p className="text-lg text-[var(--brand-accent-foreground)]/80 mb-10 max-w-xl mx-auto text-pretty">
                {t("cta.subheading")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent-foreground)] px-8 py-3.5 text-sm font-bold text-[var(--brand-accent)] shadow-lg transition-all duration-300 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent-foreground)]"
                >
                  {t("cta.button")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={brandConstants.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand-accent-foreground)]/40 px-8 py-3.5 text-sm font-bold text-[var(--brand-accent-foreground)] transition-all duration-300 hover:border-[var(--brand-accent-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent-foreground)]"
                >
                  {t("cta.resume")}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}