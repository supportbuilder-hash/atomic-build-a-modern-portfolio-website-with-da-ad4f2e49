"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Briefcase as Linkedin, Code2 as Github, Send, CheckCircle, AlertCircle, User, AtSign, MessageSquare, FileText } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
type brandConstants = any;
const brandConstants: any = [];
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";
import { useTranslations } from "next-intl";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  icon: Icon,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder: string;
  icon: React.ElementType;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[var(--foreground)]/80">
        {label}
        {required && <span className="text-[var(--brand-accent)] ml-1">*</span>}
      </label>
      <div className="relative">
        <span
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            focused ? "text-[var(--brand-accent)]" : "text-[var(--foreground)]/40"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/30 ${
            error
              ? "border-red-500/60 focus:border-red-500"
              : focused
              ? "border-[var(--brand-accent)]/60"
              : "border-white/10 hover:border-white/20"
          }`}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[var(--foreground)]/80">
        {label}
        {required && <span className="text-[var(--brand-accent)] ml-1">*</span>}
      </label>
      <div className="relative">
        <span
          className={`absolute left-3 top-3.5 transition-colors duration-200 ${
            focused ? "text-[var(--brand-accent)]" : "text-[var(--foreground)]/40"
          }`}
        >
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
        </span>
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={5}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/30 resize-none ${
            error
              ? "border-red-500/60 focus:border-red-500"
              : focused
              ? "border-[var(--brand-accent)]/60"
              : "border-white/10 hover:border-white/20"
          }`}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const SOCIAL_LINKS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "abubakar-ba",
    href: brandConstants.socials.linkedin,
    icon: Linkedin,
    description: "Connect professionally",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20 hover:border-blue-400/40",
    iconColor: "text-blue-400",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "abubakar-ba",
    href: brandConstants.socials.github,
    icon: Github,
    description: "See my work",
    color: "from-white/10 to-white/5",
    border: "border-white/10 hover:border-white/25",
    iconColor: "text-white/80",
  },
  {
    id: "email",
    label: "Email",
    handle: brandConstants.email,
    href: `mailto:${brandConstants.email}`,
    icon: Mail,
    description: "Drop me a line",
    color: "from-[var(--brand-accent)]/20 to-[var(--brand-accent)]/5",
    border: "border-[var(--brand-accent)]/20 hover:border-[var(--brand-accent)]/50",
    iconColor: "text-[var(--brand-accent)]",
  },
];

export default function ContactPage() {
  const t = useTranslations();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const updateField = (field: keyof FormState) => (val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = t("contact.form.errors.nameRequired");
    else if (form.name.trim().length < 2) newErrors.name = t("contact.form.errors.nameTooShort");

    if (!form.email.trim()) newErrors.email = t("contact.form.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = t("contact.form.errors.emailInvalid");

    if (!form.subject.trim()) newErrors.subject = t("contact.form.errors.subjectRequired");

    if (!form.message.trim()) newErrors.message = t("contact.form.errors.messageRequired");
    else if (form.message.trim().length < 20)
      newErrors.message = t("contact.form.errors.messageTooShort");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // EmailJS-ready handler — replace with real EmailJS call when configured
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // emailjs.sendForm("SERVICE_ID", "TEMPLATE_ID", formRef.current!, "PUBLIC_KEY")
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
      >
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[var(--brand-accent)]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Page Hero */}
        <Reveal className="mb-16 md:mb-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] border border-[var(--brand-accent)]/20 mb-5">
              {t("contact.hero.badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] mb-5 text-balance">
              {t("contact.hero.title")}
            </h1>
            <p className="text-lg text-[var(--foreground)]/60 leading-relaxed text-pretty">
              {t("contact.hero.subtitle")}
            </p>
          </div>
        </Reveal>

        {/* Two-column layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start"
        >
          {/* Contact Form — left (3 cols) */}
          <motion.div variants={slideInLeft} className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_16px_48px_-12px_rgba(0,0,0,0.3)]">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
                {t("contact.form.heading")}
              </h2>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--brand-accent)]/15 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-[var(--brand-accent)]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">
                    {t("contact.form.success.title")}
                  </h3>
                  <p className="text-[var(--foreground)]/60 text-sm max-w-xs">
                    {t("contact.form.success.body")}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] border border-[var(--brand-accent)]/20 hover:bg-[var(--brand-accent)]/20 transition-all duration-200"
                  >
                    {t("contact.form.success.again")}
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      id="name"
                      label={t("contact.form.nameLabel")}
                      value={form.name}
                      onChange={updateField("name")}
                      error={errors.name}
                      placeholder={t("contact.form.namePlaceholder")}
                      icon={User}
                      required
                    />
                    <InputField
                      id="email"
                      label={t("contact.form.emailLabel")}
                      type="email"
                      value={form.email}
                      onChange={updateField("email")}
                      error={errors.email}
                      placeholder={t("contact.form.emailPlaceholder")}
                      icon={AtSign}
                      required
                    />
                  </div>

                  <InputField
                    id="subject"
                    label={t("contact.form.subjectLabel")}
                    value={form.subject}
                    onChange={updateField("subject")}
                    error={errors.subject}
                    placeholder={t("contact.form.subjectPlaceholder")}
                    icon={FileText}
                    required
                  />

                  <TextAreaField
                    id="message"
                    label={t("contact.form.messageLabel")}
                    value={form.message}
                    onChange={updateField("message")}
                    error={errors.message}
                    placeholder={t("contact.form.messagePlaceholder")}
                    required
                  />

                  {status === "error" && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {t("contact.form.errorMessage")}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_4px_24px_-4px_var(--brand-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        {t("contact.form.submitting")}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        {t("contact.form.submit")}
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-[var(--foreground)]/40 text-center">
                    {t("contact.form.privacy")}
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Social Links Panel — right (2 cols) */}
          <motion.div variants={slideInRight} className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                {t("contact.social.heading")}
              </h2>
              <p className="text-sm text-[var(--foreground)]/55 leading-relaxed">
                {t("contact.social.subheading")}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {SOCIAL_LINKS.map((social, i) => (
                <Reveal key={social.id} delay={i * 0.1}>
                  <motion.a
                    href={social.href}
                    target={social.id !== "email" ? "_blank" : undefined}
                    rel={social.id !== "email" ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br ${social.color} border ${social.border} transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]`}
                    aria-label={`${social.label}: ${social.handle}`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <social.icon className={`h-5 w-5 ${social.iconColor}`} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-accent)] transition-colors duration-200">
                        {social.label}
                      </p>
                      <p className="text-xs text-[var(--foreground)]/50 truncate">{social.handle}</p>
                      <p className="text-xs text-[var(--foreground)]/40 mt-0.5">{social.description}</p>
                    </div>
                  </motion.a>
                </Reveal>
              ))}
            </div>

            {/* Availability card */}
            <Reveal delay={0.35}>
              <div className="rounded-2xl border border-[var(--brand-accent)]/15 bg-[var(--brand-accent)]/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-accent)] opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--brand-accent)]" />
                  </span>
                  <span className="text-xs font-semibold text-[var(--brand-accent)] uppercase tracking-widest">
                    {t("contact.availability.badge")}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--foreground)] mb-1">
                  {t("contact.availability.title")}
                </p>
                <p className="text-xs text-[var(--foreground)]/55 leading-relaxed">
                  {t("contact.availability.body")}
                </p>
              </div>
            </Reveal>

            {/* Resume download */}
            <Reveal delay={0.45}>
              <Link
                href={brandConstants.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium border border-white/10 text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:border-white/25 hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                {t("contact.resume.button")}
              </Link>
            </Reveal>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}