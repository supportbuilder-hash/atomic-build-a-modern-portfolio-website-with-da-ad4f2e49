"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Briefcase as Linkedin, Code2 as Github, Send, CheckCircle, AlertCircle, User, AtSign, MessageSquare, FileText, MessageCircle as Twitter } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/data";

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
        {required && <span className="text-[var(--accent)] ml-1">*</span>}
      </label>
      <div className="relative">
        <span
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            focused ? "text-[var(--accent)]" : "text-[var(--foreground)]/40"
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
          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent)]/30 ${
            error
              ? "border-red-500/60 focus:border-red-500"
              : focused
              ? "border-[var(--accent)]/60"
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
        {required && <span className="text-[var(--accent)] ml-1">*</span>}
      </label>
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
        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent)]/30 resize-none ${
          error
            ? "border-red-500/60 focus:border-red-500"
            : focused
            ? "border-[var(--accent)]/60"
            : "border-white/10 hover:border-white/20"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const platformIconMap: Record<string, React.ReactNode> = {
  LinkedIn: <Linkedin className="h-5 w-5" aria-hidden="true" />,
  GitHub: <Github className="h-5 w-5" aria-hidden="true" />,
  Twitter: <Twitter className="h-5 w-5" aria-hidden="true" />,
  Email: <Mail className="h-5 w-5" aria-hidden="true" />,
};

export default function ContactPage() {
  const t = useTranslations("contactPage");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const setField = (field: keyof FormState) => (val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    else if (form.message.trim().length < 20)
      newErrors.message = "Message must be at least 20 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-16">
        <Reveal>
          <motion.div variants={fadeInUp}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[var(--primary)]/10 text-[var(--accent)] border border-[var(--primary)]/20 mb-4">
              Contact
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t("heroHeading")}
            </h1>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
              {t("heroBody")}
            </p>
          </motion.div>
        </Reveal>
      </section>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form — 3 cols */}
        <motion.div
          className="lg:col-span-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8">
            <h2
              className="text-xl font-bold text-[var(--foreground)] mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t("formHeading")}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">{t("formBody")}</p>

            {status === "success" && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6 text-sm">
                <CheckCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                {t("successMessage")}
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                {t("errorMessage")}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <InputField
                id="name"
                label="Full Name"
                value={form.name}
                onChange={setField("name")}
                error={errors.name}
                placeholder="Abubakar"
                icon={User}
                required
              />
              <InputField
                id="email"
                label="Email Address"
                type="email"
                value={form.email}
                onChange={setField("email")}
                error={errors.email}
                placeholder="hello@example.com"
                icon={AtSign}
                required
              />
              <InputField
                id="subject"
                label="Subject"
                value={form.subject}
                onChange={setField("subject")}
                error={errors.subject}
                placeholder="Project enquiry"
                icon={FileText}
                required
              />
              <TextAreaField
                id="message"
                label="Message"
                value={form.message}
                onChange={setField("message")}
                error={errors.message}
                placeholder="Tell me about your project or challenge..."
                required
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {t("formCta")}
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Sidebar — 2 cols */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Reveal delay={0.1}>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
              <h2
                className="text-lg font-bold text-[var(--foreground)] mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {t("socialHeading")}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-5">{t("socialBody")}</p>
              <ul className="flex flex-col gap-3">
                {(Array.isArray(socialLinks) ? socialLinks : []).map((social) => {
                  const platform = social?.platform ?? "";
                  const url = social?.url ?? "#";
                  const handle = social?.handle ?? "";
                  const icon =
                    platformIconMap[platform] ?? (
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    );
                  return (
                    <li key={platform}>
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)]/40 hover:bg-[var(--card-hover)] transition-all duration-200 group"
                      >
                        <span className="text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors duration-200">
                          {icon}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[var(--foreground)]/60 uppercase tracking-wider">
                            {platform}
                          </p>
                          <p className="text-sm text-[var(--foreground)] truncate">{handle}</p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
              <h3
                className="text-base font-bold text-[var(--foreground)] mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Response time
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                I typically respond within{" "}
                <span className="text-[var(--accent)] font-semibold">24 hours</span> on business
                days. For urgent matters, LinkedIn is the fastest way to reach me.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
