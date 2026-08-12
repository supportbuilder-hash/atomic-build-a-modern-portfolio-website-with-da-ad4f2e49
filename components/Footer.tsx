"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail } from 'lucide-react';

const footerLinks = [
  { label: "Home", href: "/", key: "home" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "Contact", href: "/contact", key: "contact" },
];

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <Linkedin className="h-5 w-5" aria-hidden="true" />,
  github: <Github className="h-5 w-5" aria-hidden="true" />,
  twitter: <Twitter className="h-5 w-5" aria-hidden="true" />,
  email: <Mail className="h-5 w-5" aria-hidden="true" />,
};

const socials = [
  { key: "linkedin", href: "https://linkedin.com/in/abubakar-ba", label: "LinkedIn" },
  { key: "github", href: "https://github.com/abubakar-ba", label: "GitHub" },
  { key: "twitter", href: "https://twitter.com/abubakar_ba", label: "Twitter" },
  { key: "email", href: "mailto:hello@abubakar.dev", label: "Email" },
];

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const navT = (Array.isArray(t.raw("nav")) ? {} : t.raw("nav")) as Record<string, string>;

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block font-display text-xl font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
            >
              Abubakar
              <span className="text-[var(--primary)]">.</span>
            </Link>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3
              className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
            >
              {t("footer.navHeading")}
            </h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => {
                const label = navT[link.key] ?? link.label;
                const isAnchor = link.href.startsWith("#");
                const resolvedHref = isAnchor && pathname !== "/"
                  ? "/" + link.href
                  : link.href;

                return (
                  <Link
                    key={link.key}
                    href={resolvedHref}
                    onClick={(e) =>
                      isAnchor
                        ? handleAnchorClick(e as React.MouseEvent<HTMLAnchorElement>, link.href)
                        : undefined
                    }
                    className="text-sm text-[var(--foreground)]/60 hover:text-[var(--accent)] transition-colors duration-200 w-fit"
                  >
                    {label}
                  </Link>
                );
              })}
              <a
                href="/resume.pdf"
                download
                className="text-sm text-[var(--foreground)]/60 hover:text-[var(--accent)] transition-colors duration-200 w-fit"
              >
                {t("footer.resume")}
              </a>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
              {t("footer.socialHeading")}
            </h3>
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.key}
                  href={s.href}
                  target={s.key !== "email" ? "_blank" : undefined}
                  rel={s.key !== "email" ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 hover:bg-[var(--primary)]/5 transition-all duration-200"
                >
                  {socialIcons[s.key]}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            {t("footer.copyright")}
          </p>
          <p className="text-xs text-[var(--muted-foreground)]/60">
            {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}