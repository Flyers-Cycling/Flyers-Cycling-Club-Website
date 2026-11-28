# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, Cursor, Copilot, etc.) and human contributors working on the **Flyers Cycling Club** website. `CLAUDE.md` imports this file, so this is the one place to keep instructions.

For human-facing setup and content editing, see [README.md](./README.md) and [CONTRIBUTING.md](./CONTRIBUTING.md). For what each page is for, its main buttons, and its open placeholders, see [docs/content-spec.md](./docs/content-spec.md). For the latest site review and peer comparison, see [docs/site-evaluation.md](./docs/site-evaluation.md). For voice, brand, where facts live, and the roadmap, see [docs/voice.md](./docs/voice.md), [docs/brand.md](./docs/brand.md), [docs/source-of-truth.md](./docs/source-of-truth.md), and [docs/plan.md](./docs/plan.md).

## Quick rules

Read the full sections below, but never break these:

1. **Tooling:** pnpm (≥ 10) with Node 22. Never use npm or yarn, and don't commit another lockfile.
2. **CI must pass before merging.** Run `pnpm verify` before every commit and `pnpm test:e2e` after markup changes. A human approves every merge.
3. **Club facts live in content, not components.** Programs, events, FAQs, people, and updates are YAML/Markdown in `src/content/`. Global facts (registration links, mission, contact, minimum ages) are in `src/data/site.ts`.
4. **Program rules:**
   - Flyers XC: cross-country riding, racing, and endurance, in two groups: Flyers XC Devo (riding and skills, less focus on racing) and Flyers XC Comp (competitive racing). Ages 10–22 (U23), grade 5 and up, Jan 1–Aug. 5th and 6th graders must be accepted by a coach, not all of them can ride XC, and most join Jr. Flyers (Randall, Nov 27 2026). The overlap with Jr. Flyers is on purpose, so advanced Jr. Flyers can ride in Flyers XC.
   - Flyers Enduro/Gravity: ages 10–18 (minimum age 10), Jan–Aug, with its own registration form.
   - Jr. Flyers: K–6, summer only (Jun 1–mid-August), registers later than the other two.
   - Riders can join more than one program.
5. **Tone:** all riders welcome. Follow docs/voice.md. No em dashes in copy. Lead with programs and what riders do. Program cards (home page and /programs) show each program's ages and grades so families can tell at a glance who it's for (Randall, Nov 27 2026). Fees appear only on program detail pages and in the FAQ, never on the home page, header, or program cards.
6. **Never invent facts, people, or photos.** Use `TODO(board): …` placeholders (section 5).

**Project skills** in `.claude/skills/` walk through common edits: `update-registration-links`, `manage-events`, and `update-people`.

---

## 1. What this site is, and who it serves

Flyers Cycling Club is the public home of three youth mountain bike programs run by **Lake Mountain Bicycle Club, Inc.**, a volunteer-run 501(c)(3) in Utah:

| Program               | Who                                                         | Season                      | Fee  |
| --------------------- | ----------------------------------------------------------- | --------------------------- | ---- |
| Jr. Flyers            | Grades K–6 (ages 5–12)                                      | Jun 1–mid-Aug (summer only) | $35  |
| Flyers XC             | Ages 10–22 (U23); grade 5 and up, 5th–6th by coach approval | Jan 1–Aug                   | $50  |
| Flyers Enduro/Gravity | Ages 10–18 (grades 5–12)                                    | Jan–Aug                     | $150 |

The programs run outside the fall NICA (Utah High School Cycling League) season and are meant to work alongside local school teams, not compete with them.

**Audiences, in priority order.** When they conflict, the earlier one wins:

1. **Parents and guardians** deciding whether to trust volunteers with their kid. They need to know: is it safe, who runs it, what does it really cost, what's the time commitment, how do I sign up.
2. **Riders**, especially new and nervous ones. They need to know they belong even if they're not fast.
3. **Volunteers**, mostly parents. They need to know what's asked of them and what training they'll get.
4. **Sponsors and donors.** They need to know what their money does and that the organization is legitimate.

Most visitors are parents on a phone. Write and design for them first.

---

## 2. Commands

Node ≥ 22 (`.nvmrc`), pnpm ≥ 10.

```bash
pnpm install          # install
pnpm dev              # dev server at http://localhost:4321
pnpm verify           # astro check + tsc, eslint, prettier --check, build, vitest
pnpm test:e2e         # Playwright + axe WCAG 2.1 AA (needs a build; CI runs it)
pnpm format           # prettier --write (run before committing)
```

Run `pnpm verify` before every commit. Run `pnpm test:e2e` when you change markup, pages, interactive components, or colors. CI (`.github/workflows/ci.yml`) runs everything on PRs to `main`.

---

## 3. Where things live

- `src/content/**`: all club facts, as Markdown/YAML collections validated by Zod in `src/content.config.ts`. Programs, tiers, sponsors, events, FAQs, leadership, updates.
- `src/data/site.ts`: global facts: legal entity, fees, contact, integration URLs (Zeffy, Volt, calendar), socials, and the NICA team list.
- `src/pages/`: routes. `src/components/{home,layout,programs,sponsors}/`: UI.
- `src/lib/`: pure logic with unit tests (`pathway.ts`, `programs.ts`, `sponsors.ts`, `urls.ts`).
- `src/styles/global.css`: Tailwind v4 `@theme` brand tokens (`flyers-red`, `flyers-slate`, `flyers-gold`, …) and print styles.
- `src/layouts/PrintLayout.astro` + `/sponsors/prospectus`: the printable sponsor PDF.
- `tests/unit/`: Vitest. `tests/e2e/site.spec.ts`: Playwright + axe.

**Single source of truth.** A club fact (fee, age range, school names, legal name, email, season dates) lives in exactly one place: `site.ts` or a content collection. Components and pages read it from there; they don't retype it. Today many components hardcode "$50 or $150", the five school names, and "100% volunteer-led". When you touch one of those, replace the literal with a reference to `siteConfig` or the collection.

**Always use `withBase()`** from `src/lib/urls.ts` for internal links and `/public` assets. The site deploys under a GitHub Pages sub-path.

---

## 4. Voice, brand, and the plan

- **Voice:** [docs/voice.md](./docs/voice.md) is the standard for all copy. Read it before writing or editing any user-facing text. The short version: a friendly coach talking to a parent at the trailhead. Warm, plain, specific. Lead with the rider's experience. Racing is optional.
- **Hard rules from the club:** no em dashes (use a hyphen, colon, or full stop; en dashes are fine in number ranges), no throat-clearing openers or stock closings, no "it's not just X, it's Y", no forced lists of three, and none of the banned words listed in voice.md.
- **Brand and design system:** [docs/brand.md](./docs/brand.md). One club frame (slate, red, gold) with a color per program: Flyers XC red, Flyers Enduro/Gravity pink (`#fe6cd0`), Jr. Flyers Youth Blue (`#00adef`, matching its logo). Flyers XC and Flyers Enduro/Gravity use the Flyers logo; Jr. Flyers has its own Junior Flyers logo. The public version is the `/brand` page.
- **Where facts live:** [docs/source-of-truth.md](./docs/source-of-truth.md) maps every club fact to its one home and says whether it's confirmed.
- **The plan:** [docs/plan.md](./docs/plan.md) is the phased roadmap. Tick its boxes in the PR that finishes the work.

---

## 5. Truthfulness rules (non-negotiable)

This is a youth organization that asks families for trust and donors for money. Content must be true.

- **Never invent** people, quotes, testimonials, rider stories, sponsor names, statistics ("thousands of families"), partnerships, awards, certifications, dates, or prices. If a section needs a fact you don't have, leave a clearly marked placeholder (`TODO(board): …`) and list it in your PR description. Don't fill it with plausible-sounding copy.
- **Placeholder links stay visible as placeholders.** Many Zeffy URLs are currently the bare `https://www.zeffy.com/`. Don't add more. When you see one, flag it. Never present an "open slot" as if it were a real sponsor.
- **"Partner" means a confirmed relationship.** Only call a NICA team, trail group, or business a "partner" if the board has confirmed it. Otherwise write "riders from Westlake, Lehi, …" or "we schedule around fall NICA seasons".
- **Safety claims must match practice.** Only say "background-checked", "NICA-licensed", "first-aid/CPR certified", or give coach-to-rider ratios if the board confirms them. NICA coaches complete background checks, concussion training (CDC HEADS UP), and athlete-abuse awareness training. Name which of these Flyers coaches actually complete.
- **Tax language:** write "tax-deductible". Randall chose this over "to the extent allowed by law" (Nov 2026). Never write "100% tax-deductible" next to sponsor benefits. Sponsor perks can change what's deductible, and the treasurer or a tax professional should approve any tax wording. Don't give tax advice.
- **No AI-generated images. Ever.** Every photo on the site must be a real photo of real Flyers riders, coaches, trails, or events, supplied by the club. Don't generate, upscale-with-AI, composite, or "fill in" images, and don't use stock photos presented as Flyers. If a section needs an image you don't have, leave the existing one or a plain brand-colored block and add a `TODO(board): photo needed` note. Logos and simple SVG brand shapes are fine.
- **Minors' privacy:** no full names of minors alongside photos. Use only photos the club has media releases for. Alt text describes what is actually in the image and doesn't embellish it.
- **Don't future-date posts.** An update's `publishedDate` must not be later than the day it ships.

---

## 6. Non-profit best practices the site should meet

Use this as the checklist for new pages and reviews. It's drawn from peer clubs and nonprofit transparency guidance (Candid/GuideStar, Form 990 disclosure).

**Trust and transparency**

- Publish the legal name, the EIN (it's public record anyway), board member names and roles, and a link to the latest Form 990 or a simple annual report. Keep the website's board list consistent with the 990.
- Report impact with real numbers once the board provides them: riders served, volunteer hours, trail-work hours, scholarships given.

**Safety and youth protection.** Parents look for this first, and the site doesn't have it yet.

- A Safety page covering coach screening and training, the two-adult rule (no adult alone with a minor), ratios, helmet and gear rules, the concussion protocol, emergency plans, and who to contact with a concern.
- A rider/parent code of conduct, and links to the waiver and the refund policy.

**Access**

- One clear, dignified scholarship and assistance path: what's available (fee waivers, loaner bikes or gear) and how to ask confidentially. Mention it wherever cost is discussed.
- Plain statements that beginners are welcome and that racing is optional.

**Volunteers**

- What roles exist, the time commitment, the training and screening involved, and how to start. Lead with "you don't need to be fast" (ride leaders, sweeps, tent crew, trail days).

**Donors and sponsors**

- "Donate" should be reachable from every page. Tie each giving level to a concrete outcome. Thank sponsors as community members, and keep sponsor logos accurate and current.

**Real people**

- Named leaders with short bios and photos (adults only, with consent), and rider and parent stories with permission. Generic role cards ("XC Coaching Leads") don't build trust.

---

## 7. Engineering conventions

- **Astro 5 static output, TypeScript strict.** No client framework. Interactive bits are small vanilla `<script>` blocks; keep them progressive-enhancement friendly.
- **Content schema changes:** update `src/content.config.ts`, every affected entry, the CONTRIBUTING.md examples, and any tests. Volunteers edit YAML in the GitHub web UI, so keep field names obvious and the Zod errors useful.
- **Accessibility (WCAG 2.1 AA, enforced by axe in CI):** one `<h1>` per page, labelled `<section>`s (`aria-labelledby`), visible focus, touch targets of at least 48px (`min-h-12`), and AA contrast using the brand tokens. Never convey meaning by color alone. Respect `prefers-reduced-motion`.
- **Styling:** use the `flyers-*` Tailwind tokens from `global.css`, not raw hex. Prettier sorts Tailwind classes, so run `pnpm format`.
- **Images:** put photos in `public/images/`, compress them (aim for under 300 KB for content images), always set `width`/`height`, and use `loading="lazy"` below the fold.
- **New pages:** add the route to `EXPECTED_HTML_FILES` in `tests/unit/static-build.test.ts` and to the axe route list in `tests/e2e/site.spec.ts`. Give each page a specific `title` and `description` through `BaseLayout`.
- **Links:** external links in content use `target="_blank" rel="noopener noreferrer"`. Internal links go through `withBase()`.
- **No secrets in the repo.** Form endpoints come from `PUBLIC_*` env vars.

---

## 8. Workflow for agents

1. Read the relevant content collection and `site.ts` before editing copy. The fact you need is probably already there.
2. Keep diffs focused. Do content/voice changes and structural refactors in separate commits.
3. When you change copy, re-read it against docs/voice.md. When you add facts, check them against section 5.
4. Run `pnpm verify` (and `pnpm test:e2e` for UI changes) and report the results honestly.
5. In the PR description, list any `TODO(board)` placeholders and any claims that need board confirmation.

### Open questions for the board

The list of facts agents can't verify lives in the "Board and content questions" section of [docs/plan.md](./docs/plan.md). Don't publish copy that depends on an open question. When one is answered, update the fact in its home and tick the box.
