# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Build a modern portfolio website with dark mode

Additional details provided by the user:
- What's your name or professional alias?: Abubakar
- What is your role or title?: Business Analyst
- Write a short bio or personal tagline: A smart BA
- What is your primary domain?: Other

## Goal
Build a modern dark-mode portfolio website for Abubakar, a Business Analyst, with a homepage, projects page, and contact page using Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Project type
portfolio

## Design system — match this exactly
- Color tokens: `--background: #0A0A12`, `--card: #13131F`, `--border: #2A2A3D`, `--foreground: #F0EEF8`, `--muted-foreground: #9B97B8`, `--primary: #7C3AED`, `--accent: #A78BFA`, `--primary-hover: #6D28D9`, `--accent-glow: rgba(167, 139, 250, 0.15)`, `--primary-glow: rgba(124, 58, 237, 0.12)`, `--card-hover: #1A1A2E`, `--brand-accent: 240 10% 3.9%`
- Fonts: Inter

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`contact`, `contactPage`, `cta`, `footer`, `hero`, `homePage`, `nav`, `navbar`, `projects`, `projectsPage`, `skills`, `testimonials`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
