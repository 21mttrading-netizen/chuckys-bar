# Chucky's Bar — Website Project

## Core Rules
- Always invoke the front-end design skill before writing any front-end code. Every session, no exceptions.
- This is a client website for a real business. Everything must look professional, polished, and branded.
- Read `brand_assets/brand-guidelines.md` before any design work.
- Reference photos in `brand_assets/` for the venue's look and feel.

## Tech Stack
- HTML + CSS + vanilla JavaScript (single-page landing site)
- No frameworks needed — keep it simple and fast
- Mobile-first responsive design
- Deploy-ready for Vercel (static site)

## Design Principles
- Bold, vibrant, high-energy — matches the bar's personality
- Dark backgrounds with bright accent colors (red, blue, neon)
- Large hero imagery, strong CTAs
- Must feel like a nightlife/entertainment venue, NOT a corporate site
- Smooth animations and transitions — no jank
- Typography should be bold and impactful

## Screenshot Workflow
- After building or modifying the site, start a local server and take screenshots using Puppeteer
- Save screenshots to `temporary_screenshots/` folder
- Do a 2-pass review: compare what you built against any reference provided, fix mismatches
- Name screenshots descriptively (e.g., `hero-section.png`, `menu-section.png`)
- For animated/dynamic elements, skip screenshot comparison — just write clean code

## Puppeteer Setup
- Use Puppeteer to take screenshots at viewport 1440x900 (desktop) and 390x844 (mobile)
- Launch with `--no-sandbox` flag
- Screenshot the full page plus individual sections

## Sections to Include
1. **Hero** — Big bold intro with venue photos, name, tagline
2. **About** — What Chucky's Bar is about, the vibe
3. **Events** — Weekly schedule (DJs Fri/Sat, live music Sun, comedy nights, etc.)
4. **Menu/Specials** — Cocktail specials, food highlights
5. **Gallery** — Venue photos
6. **Location & Hours** — Map embed, address, phone, hours
7. **Contact/CTA** — Call to action, social links

## Important
- Do NOT push to GitHub unless explicitly told to
- Always test on localhost first
- When making changes, show on localhost before deploying
- South African audience — use ZAR (R) for prices, local phone format
