"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { navLinks } from "@/lib/data";
import { Menu, X, Download } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navT = (Array.isArray(t.raw("nav")) ? {} : t.raw("nav")) as Record<string, string>;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderLink = (link: (typeof navLinks)[0], mobile = false) => {
    const isActive =
      link.href === "/"
        ? pathname === "/"
        : pathname.startsWith(link.href);

    const label = navT[link.key] ?? link.label;

    const baseClass = mobile
      ? `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
          isActive
            ? "text-[var(--accent)] bg-[var(--primary)]/10"
            : "text-[var(--foreground)]/80 hover:text-[var(--accent)] hover:bg-[var(--border)]"
        }`
      : `relative text-sm font-medium transition-all duration-200 ${
          isActive
            ? "text-[var(--accent)]"
            : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
        }`;

    if (link.href.startsWith("#")) {
      const resolvedHref = pathname === "/" ? link.href : "/" + link.href;
      return (
        <Link
          key={link.key}
          href={resolvedHref}
          className={baseClass}
          onClick={(e) => handleAnchorClick(e as React.MouseEvent<HTMLAnchorElement>, link.href)}
        >
          {label}
          {!mobile && isActive && (
            <motion.span
              layoutId="nav-indicator"
              className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--accent)]"
            />
          )}
        </Link>
      );
    }

    return (
      <Link key={link.key} href={link.href} className={baseClass}>
        {label}
        {!mobile && isActive && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--accent)]"
          />
        )}
      </Link>
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--background)]/90 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-lg font-700 text-[var(--foreground)] tracking-tight hover:text-[var(--accent)] transition-colors duration-200"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
          >
            Abubakar
            <span className="text-[var(--primary)] ml-0.5">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => renderLink(link))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-[var(--border)] text-[var(--foreground)]/80 hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all duration-200"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t("navbar.resume")}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-all duration-200"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-[var(--card)]/95 backdrop-blur-xl border-b border-[var(--border)] md:hidden"
          >
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => renderLink(link, true))}
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 mt-2 px-4 py-3 rounded-xl text-base font-medium border border-[var(--border)] text-[var(--foreground)]/80 hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all duration-200"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("navbar.resume")}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}