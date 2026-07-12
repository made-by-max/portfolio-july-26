# Design System Guide
*Synthesized from: Linear, Paper, Vercel, GitHub*

This document defines the visual language for the site. It's derived from what Linear, Paper, Vercel, and GitHub all do independently but converge on — treat it as the shared grammar of "confident developer-tool minimalism," adapted for a product designer's portfolio.

---

## Core Philosophy

All four references share the same underlying stance:

- **Restraint over decoration.** Nearly everything is grayscale/near-black or near-white. Color is rationed and used only to mark meaning (an accent, a status, a single CTA).
- **Content is the interface.** Product screenshots, code, and UI chrome ARE the imagery. There's very little stock photography or illustration; the "art" is real (or real-looking) product surfaces.
- **Density with breathing room.** Whitespace is generous — sections don't feel cramped, and visual elements have room to sit on their own.
- **Precision as a brand value.** Monospace type, exact alignment, and thin 1px hairlines all signal engineering rigor — this vocabulary should read as "made by someone who cares about pixels."
- **Dark-first, but not always.** Linear, Vercel, and GitHub default dark. Paper defaults to a warm off-white/cream. Both work — pick one as primary and don't mix within a single page.

---

## Color Usage Principles

*(Uses your existing color tokens — this section is about how to apply them, not what they should be.)*

- **Grayscale does most of the work.** The base UI — backgrounds, borders, body text — should live almost entirely in your neutral/gray scale. Color is the exception, not the default.
- **One accent, used sparingly.** Whichever accent you've defined should be reserved for: the primary CTA, active/selected states, link hover, and at most one ambient gradient glow per page. It should never be used as a large surface fill — it's a highlight, not a background.
- **Status/tag chips stay low-key.** Small pill badges (tags, skills, status labels) should use a translucent/low-opacity tint of a color with full-opacity text on top — not solid saturated fills.
- **Pick a mode and commit.** Reference sites are either dark-first (Linear, Vercel, GitHub) or light/warm-neutral (Paper) — don't mix both within the same page.

---

## Typography Feel

*(Uses your existing font and size choices — this section is about tracking, weight, and line-height, not the typeface or scale itself.)*

- **Headlines run tighter, not heavier.** Reference sites lean on tight letter-spacing and a mid-range weight (medium/semibold) rather than black/900 weights — the confidence comes from restraint, not boldness.
- **Body copy stays loose.** Generous line-height (roughly 1.5–1.6) keeps body text easy to scan against the large amount of whitespace elsewhere.
- **Captions and metadata pull back.** Small caption/meta text (timestamps, labels) is often set with a bit of extra letter-spacing and sometimes uppercase, at reduced weight/opacity — treat it as quiet supporting text, not competing with headlines.
- **Monospace as an accent.** If your font stack already includes a monospace variant, reserve it for code, terminal commands, timestamps, or version numbers — used deliberately as a design accent rather than a body font.

---

## Layout & Spacing

- **Grid:** 12-column, centered container, generous max-width (1100–1280px) with large outer margins on desktop.
- **Section rhythm:** Huge vertical spacing between sections (120–200px). Nothing feels cramped — whitespace itself is a brand signal.
- **Alternating layout:** Text block + visual block pattern, alternating left/right down the page (see Vercel's feature sections, Linear's feature blocks).
- **Cards:** 1px hairline border, 8–12px border radius, subtle background elevation (never a heavy drop shadow) — think "outlined," not "floating."
- **Dividers:** Thin 1px full-bleed or container-width hairlines separate major sections instead of heavy color blocks.

---

## Components

**Buttons**
- Primary: solid fill (white-on-dark or accent color), fully rounded or 6–8px radius, medium weight label
- Secondary: outline/ghost, 1px border, transparent background
- Small pill CTAs pair a button with a monospace CLI snippet next to it (`npm i @vercel/connect`) — a strong pattern from Vercel/Linear worth reusing (e.g. pairing a "View Work" button with a small status/meta chip)

**Badges/Tags**
- Small pill shape, colored translucent background, used for labels/status (case study tags, skills, tech stack)

**Code / terminal blocks**
- Dark panel, monospace, subtle syntax-style coloring, thin border, sometimes a mock window chrome (three dots) at top-left

**Navigation**
- Minimal top bar: logo mark (small, often a simple geometric shape) + 3–5 text links + one filled CTA button on the right, all on one thin row, transparent/blurred background over content

**Cards/Screenshots**
- Product screenshots shown inside a subtle browser/app chrome, slightly inset with padding and a soft ambient glow or gradient behind them (never full-bleed edge-to-edge)

**FAQ/Accordion**
- Simple list, hairline divider between items, chevron/plus icon at right

---

## Imagery & Motion

- **No stock photography.** Any imagery is either a real product screenshot, an abstract geometric/particle illustration, or a soft gradient blob used as ambient background lighting.
- **Ambient glow:** A soft, low-opacity colored gradient blob positioned behind a hero screenshot or headline — used once per page as a focal accent, not decoration everywhere.
- **Micro-illustration:** Simple line-based geometric shapes (cubes, hexagons, dot grids) used as small supporting graphics near feature descriptions — never literal/realistic icons.
- **Motion (implied):** Subtle fade/slide-up on scroll, hover states that are quick and understated (opacity/border color shifts, not bouncy transforms).

---

## Application Notes for a Designer Portfolio

Translate the system above like this:
- **Hero:** Name/role as H1, one-line personal positioning statement, single CTA, optional small monospace status chip ("Available for freelance").
- **Case studies as "product cards":** Treat each project like Linear/Vercel treat a feature section — screenshot in a soft-glow frame, short headline area, tag chips for tools/role.
- **Footer:** Dense multi-column sitemap-style footer (as in all four references) — Work, About, Writing, Contact, Socials.
- **Single accent color:** Apply your existing accent color the way described in the Color Usage Principles section — reserved for CTAs, active states, and one glow per page, never a large fill.
