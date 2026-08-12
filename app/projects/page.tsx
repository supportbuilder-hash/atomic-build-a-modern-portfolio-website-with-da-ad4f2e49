"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Star, TrendingUp, Users, CheckCircle, Clock, BarChart2, FileText, Layers, Search, ChevronRight } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
type brandConstants = any;
const brandConstants: any = [];
import { useState } from "react";

// ─── Inline project data ────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  featured: boolean;
  year: string;
  duration: string;
  image: string;
  outcomes?: { label: string; value: string }[];
  challenge?: string;
  solution?: string;
  results?: string[];
}

const PROJECTS: Project[] = [
  {
    id: "crm-overhaul",
    title: "Enterprise CRM Overhaul",
    description:
      "Led end-to-end requirements gathering and process redesign for a 500-seat CRM migration, reducing ticket resolution time and improving agent satisfaction scores.",
    tags: ["Requirements Gathering", "Stakeholder Management", "Process Mapping", "CRM"],
    category: "Digital Transformation",
    featured: true,
    year: "2024",
    duration: "8 months",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e7b5fb6ff7a046d095b2dc4ebed4cf17.jpg",
    outcomes: [
      { label: "Ticket Resolution", value: "−38%" },
      { label: "Agent Satisfaction", value: "+52%" },
      { label: "Data Accuracy", value: "99.1%" },
      { label: "Stakeholders Aligned", value: "14" },
    ],
    challenge:
      "A legacy CRM system with fragmented data silos was causing 40% of customer queries to require manual escalation. Agents lacked a unified view of customer history, and leadership had no real-time reporting capability.",
    solution:
      "Facilitated 30+ discovery workshops across sales, support, and IT. Produced a comprehensive BRD, process flow diagrams, and a phased migration roadmap. Defined acceptance criteria and managed UAT across three business units.",
    results: [
      "Unified customer data model adopted across all departments",
      "Automated escalation rules eliminated 80% of manual handoffs",
      "Real-time executive dashboard deployed on day one of go-live",
      "Zero critical defects in production after UAT sign-off",
    ],
  },
  {
    id: "supply-chain-analytics",
    title: "Supply Chain Analytics Platform",
    description:
      "Defined business requirements for a predictive analytics tool that gave procurement teams 12-week demand forecasting visibility, cutting overstock costs significantly.",
    tags: ["Data Analysis", "Forecasting", "SQL", "Power BI", "Agile"],
    category: "Analytics",
    featured: false,
    year: "2023",
    duration: "6 months",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e30a3bd0205446bc820665c1e8b46d29.jpg",
    outcomes: [
      { label: "Overstock Reduction", value: "−29%" },
      { label: "Forecast Accuracy", value: "91%" },
      { label: "Cost Savings", value: "$1.2M" },
    ],
  },
  {
    id: "digital-onboarding",
    title: "Digital Customer Onboarding",
    description:
      "Redesigned the end-to-end onboarding journey for a fintech client, cutting time-to-active from 11 days to under 48 hours through process automation and UX improvements.",
    tags: ["Process Redesign", "Fintech", "UX Research", "Automation"],
    category: "Process Improvement",
    featured: false,
    year: "2023",
    duration: "4 months",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/2a26cd01de02477db781fec46bc7cfb1.jpg",
    outcomes: [
      { label: "Onboarding Time", value: "−78%" },
      { label: "Drop-off Rate", value: "−44%" },
      { label: "NPS Improvement", value: "+31pts" },
    ],
  },
  {
    id: "hr-self-service",
    title: "HR Self-Service Portal",
    description:
      "Gathered and prioritised requirements for an employee self-service portal, enabling staff to manage leave, payroll queries, and benefits without HR intervention.",
    tags: ["HR Tech", "Requirements Prioritisation", "MoSCoW", "JIRA"],
    category: "Digital Transformation",
    featured: false,
    year: "2022",
    duration: "5 months",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/b09299702c7b4ff1b4e69b8a3c270804.jpg",
    outcomes: [
      { label: "HR Query Volume", value: "−61%" },
      { label: "Employee Adoption", value: "87%" },
      { label: "Processing Time", value: "−3 days" },
    ],
  },
  {
    id: "regulatory-compliance",
    title: "Regulatory Compliance Framework",
    description:
      "Translated complex GDPR and sector-specific regulatory requirements into actionable technical specifications, enabling the engineering team to achieve compliance ahead of deadline.",
    tags: ["GDPR", "Compliance", "Gap Analysis", "Risk Assessment"],
    category: "Compliance",
    featured: false,
    year: "2022",
    duration: "3 months",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d7423a4f39be4da089da500587ae44e1.png",
    outcomes: [
      { label: "Compliance Score", value: "100%" },
      { label: "Delivered", value: "3 wks early" },
      { label: "Risk Items Closed", value: "47" },
    ],
  },
  {
    id: "ecommerce-replatform",
    title: "E-Commerce Replatforming",
    description:
      "Acted as BA lead on a full replatform from a monolithic system to a headless commerce architecture, coordinating requirements across marketing, logistics, and engineering.",
    tags: ["E-Commerce", "Headless CMS", "API Design", "Stakeholder Alignment"],
    category: "Digital Transformation",
    featured: false,
    year: "2024",
    duration: "10 months",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/28753df8e9df4532b7547f1e29b7bd74.webp",
    outcomes: [
      { label: "Page Speed", value: "+65%" },
      { label: "Conversion Rate", value: "+18%" },
      { label: "SKUs Migrated", value: "12,400+" },
    ],
  },
];

const PROJECT_CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))] as const;

const FEATURED_PROJECT = PROJECTS.find((p) => p.featured)!;

// ─── Hover card variant ──────────────────────────────────────────────────────

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.3), 0 8px 24px -8px rgba(0,0,0,0.4)" },
  hover: { y: -6, boxShadow: "0 4px 16px rgba(0,0,0,0.4), 0 24px 48px -12px rgba(0,0,0,0.5)" },
};

// ─── ProjectCard ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations();
  return (
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-white/5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {project.featured && (
          <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-[var(--brand-accent)] px-3 py-1 text-xs font-semibold text-[var(--brand-dark)] tracking-wide">
            <Star className="h-3 w-3" aria-hidden="true" />
            {t("projects.featuredBadge")}
          </span>
        )}
        <span className="absolute top-3 right-3 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-xs text-white/80 border border-white/10">
          {project.year}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-white leading-snug tracking-tight">
            {project.title}
          </h3>
          <span className="shrink-0 flex items-center gap-1 text-xs text-white/50 mt-0.5">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {project.duration}
          </span>
        </div>

        <p className="text-sm text-white/60 leading-relaxed flex-1">{project.description}</p>

        {/* Outcomes */}
        {project.outcomes && (
          <div className="grid grid-cols-3 gap-2 pt-1">
            {project.outcomes.slice(0, 3).map((o) => (
              <div key={o.label} className="rounded-xl bg-white/5 border border-white/8 p-2 text-center">
                <p className="text-sm font-bold text-[var(--brand-accent)] leading-none">{o.value}</p>
                <p className="text-[10px] text-white/50 mt-1 leading-tight">{o.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20 px-2.5 py-0.5 text-[11px] font-medium text-[var(--brand-accent)]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] text-white/40">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[var(--brand-dark)] text-white">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse at center, var(--brand-accent) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-semibold tracking-widest uppercase text-[var(--brand-accent)] mb-4"
            >
              {t("projects.hero.eyebrow")}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold tracking-tight text-white text-balance leading-[1.08] mb-6"
            >
              {t("projects.hero.title")}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/60 leading-relaxed max-w-xl text-pretty"
            >
              {t("projects.hero.subtitle")}
            </motion.p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-12 flex flex-wrap gap-8"
          >
            {(
              Array.isArray(t.raw("projects.hero.stats"))
                ? t.raw("projects.hero.stats")
                : []
            ).map((s: { value: string; label: string }, i: number) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col">
                <span className="text-3xl font-bold text-[var(--brand-accent)]">{s.value}</span>
                <span className="text-sm text-white/50 mt-0.5">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 pb-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {PROJECT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] ${
                    activeCategory === cat
                      ? "bg-[var(--brand-accent)] text-[var(--brand-dark)] border-[var(--brand-accent)]"
                      : "bg-white/5 text-white/60 border-white/10 hover:border-[var(--brand-accent)]/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Projects Grid ────────────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.div key={project.id} variants={scaleIn}>
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-24 text-white/40">
                <Search className="h-10 w-10 mx-auto mb-4 opacity-40" aria-hidden="true" />
                <p className="text-lg">{t("projects.empty")}</p>
              </div>
            )}
          </div>
        </section>
      </Reveal>

      {/* ── Featured Case Study ───────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--brand-accent)]">
                {t("projects.caseStudy.label")}
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
              {/* Header */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={FEATURED_PROJECT.image}
                  alt={FEATURED_PROJECT.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[var(--brand-accent)] mb-3">
                    <Star className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("projects.caseStudy.featured")}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-balance">
                    {FEATURED_PROJECT.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-3 text-sm text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {FEATURED_PROJECT.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BarChart2 className="h-4 w-4" aria-hidden="true" />
                      {FEATURED_PROJECT.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      {FEATURED_PROJECT.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Outcome metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10 border-b border-white/10">
                {FEATURED_PROJECT.outcomes?.map((o) => (
                  <div key={o.label} className="p-6 text-center">
                    <p className="text-2xl font-bold text-[var(--brand-accent)]">{o.value}</p>
                    <p className="text-xs text-white/50 mt-1 tracking-wide">{o.label}</p>
                  </div>
                ))}
              </div>

              {/* Challenge / Solution / Results */}
              <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* Left: Challenge + Solution */}
                <div className="p-8 space-y-8">
                  <motion.div
                    variants={slideInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
                      <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--brand-accent)]">
                        {t("projects.caseStudy.challenge")}
                      </h3>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {FEATURED_PROJECT.challenge}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={slideInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Search className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
                      <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--brand-accent)]">
                        {t("projects.caseStudy.solution")}
                      </h3>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {FEATURED_PROJECT.solution}
                    </p>
                  </motion.div>
                </div>

                {/* Right: Results */}
                <motion.div
                  variants={slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-8"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <TrendingUp className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
                    <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--brand-accent)]">
                      {t("projects.caseStudy.results")}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {FEATURED_PROJECT.results?.map((r, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle
                          className="h-4 w-4 text-[var(--brand-accent)] mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-white/70 leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 pb-32">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl border border-[var(--brand-accent)]/20 bg-[var(--brand-accent)]/5 p-12 text-center relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{ background: "radial-gradient(ellipse at 50% 0%, var(--brand-accent) 0%, transparent 70%)" }}
              />
              <div className="relative">
                <Users className="h-8 w-8 text-[var(--brand-accent)] mx-auto mb-4" aria-hidden="true" />
                <h2 className="text-3xl font-bold text-white tracking-tight mb-3 text-balance">
                  {t("projects.cta.title")}
                </h2>
                <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed text-pretty">
                  {t("projects.cta.subtitle")}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] text-[var(--brand-dark)] px-8 py-3.5 text-sm font-semibold hover:opacity-90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-dark)]"
                >
                  {t("projects.cta.button")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}