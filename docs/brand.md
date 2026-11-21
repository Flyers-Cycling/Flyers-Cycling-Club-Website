# Flyers brand and design system

One club brand, with an optional color for each program. Anything else the club builds later (for example a members area) should use the same design tokens, so it looks like it belongs with the site.

**Source:** the club's Brand Book (Google Doc "Flyers Cycling - Brand Book", v1.1). This file is how the website applies it. Where the two disagree, section 8 lists what's open.

Status: the tokens below exist today in `src/styles/global.css`. The program-theme layer and the shared package are planned (see [plan.md](./plan.md), Phase 2). Items marked `TODO(board)` need answers before they are final.

## 1. Brand architecture

| Level   | Name                  | Primary color                                   | Used for                                                                                  |
| ------- | --------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Club    | Flyers Cycling Club   | Red, with black, slate, gold                    | Header, footer, home page, About, Sponsors, Board, non-profit details, anything club-wide |
| Program | Flyers XC             | Red                                             | XC pages, XC events, XC Devo and XC Comp                                                  |
| Program | Flyers Enduro/Gravity | Pink                                            | Enduro/Gravity pages and events                                                           |
| Program | Jr. Flyers            | Red (Brand Book says Youth Blue: see section 8) | Jr. Flyers pages and events. Shares Flyers XC red and the same logo.                      |

Rules:

- **The club frame never changes.** Header, footer, nav, and type are the same on every page. Only the program accent changes inside a program section.
- **One accent per screen.** A program page uses its own color. Mixed pages (home, schedule, programs list) use each program's color only on that program's card, dot, or tag.
- **Color is never the only signal.** Every program color appears with the program name next to it (WCAG 1.4.1).
- **Flyers XC, XC Devo, XC Comp, and Jr. Flyers all use red.** Tell them apart with the program name, not a second color.
- **Program colors never replace red on club-wide pieces.** (Brand Book.)
- **Keep the Flyers wordmark visible** on every program page, so the family reads as one club.
- **Signature device:** a short red underline stroke under display headlines (pink inside Enduro/Gravity).
- **The one test** (Brand Book): is it black, white, and red; does it look like the same club; does it feel like fun?

## 2. Logos

Rules from the Brand Book:

- The Flyers Enduro wordmark and the Lake Mountain long logo are the foundation. Program lockups are the Flyers mark plus the program name set in Anton.
- Clear space equal to the height of the "F" in Flyers on every side. Minimum 32px tall on screen, 0.5 in in print.
- Use the white or pink logo on black or on photos. Don't stretch, recolor, add effects, rotate, place it on a busy photo, or rebuild a lockup in another font.

`TODO(board)`: we need the source files. Please send SVG or high-resolution PNG versions of:

- The Flyers club logo (full color, one-color white, one-color dark)
- Any Flyers XC or Flyers Enduro/Gravity marks (Jr. Flyers uses the club logo)

Until then, the site uses the files already in `public/`. Don't redraw, trace, or generate a logo.

## 3. Color tokens

Three layers. Components use the top layer whenever it exists.

```
program theme   --program-primary, --program-on-primary, --program-soft, --program-text   (planned)
semantic        surface, text, border, action, focus                                       (planned)
palette         --color-flyers-*                                                            (exists)
```

### Palette (exists, `src/styles/global.css`)

| Token                          | Hex       | Contrast on white    | Use                                                                                                      |
| ------------------------------ | --------- | -------------------- | -------------------------------------------------------------------------------------------------------- |
| `flyers-slate`                 | `#203746` | 12.4:1               | Brand Book "Slate". Menus, accent text, buttons, dark sections.                                          |
| `flyers-slate-dark`            | `#14242e` | 15.9:1               | Brand Book "Black". Dark backgrounds, text on light.                                                     |
| `flyers-charcoal`              | `#212121` | 16.1:1               | Body text on light backgrounds.                                                                          |
| `flyers-red-signature`         | `#da4444` | 4.3:1                | Brand Book "Red". Underlines, large headlines, accents. Not small text or white-text buttons (fails AA). |
| `flyers-red-bright`            | `#d12323` | 5.3:1                | Brand Book "Vivid Red". Hover and emphasis.                                                              |
| `flyers-red`                   | `#b81e1e` | 6.5:1                | Accessible red for buttons and small text. Flyers XC and Jr. Flyers primary.                             |
| `flyers-red-deep`              | `#8f1616` | 9.2:1                | Hover and pressed states.                                                                                |
| `flyers-berry`                 | `#9d112a` | 8.2:1                | Spare accent. No longer the Jr. Flyers color.                                                            |
| `flyers-pink`                  | `#fe6cd0` | 6.3:1 on slate-dark  | Brand Book "Enduro Pink". Bars, dots, underlines, text on dark. Never behind white text (2.5:1).         |
| `flyers-pink-deep`             | `#b8125f` | 6.4:1                | Enduro/Gravity buttons and text on white.                                                                |
| `flyers-pink-dark`             | `#8a0c45` | 9.5:1                | Enduro/Gravity hover.                                                                                    |
| `flyers-pink-bright`           | `#fe6cd0` | 6.3:1 on slate-dark  | Same as `flyers-pink`. Kept so existing classes still work.                                              |
| `flyers-gold`                  | `#f4ce50` | 10.4:1 on slate-dark | Brand Book "Gold". CTAs and callouts on dark, focus ring. Never text on white (1.5:1).                   |
| `flyers-gray-light`            | `#dcdcdc` | 11.6:1 on slate-dark | Brand Book "Light Gray". Secondary text and captions on dark.                                            |
| `flyers-snow`, `flyers-silver` |           |                      | Page background and borders.                                                                             |

### Program theme (planned)

Each program sets the same four variables, so one component works for every program:

| Variable            | Flyers XC              | Flyers Enduro/Gravity | Jr. Flyers             |
| ------------------- | ---------------------- | --------------------- | ---------------------- |
| `--program-primary` | `flyers-red`           | `flyers-pink-deep`    | `flyers-red`           |
| `--program-hover`   | `flyers-red-deep`      | `flyers-pink-dark`    | `flyers-red-deep`      |
| `--program-accent`  | `flyers-red-signature` | `flyers-pink`         | `flyers-red-signature` |
| `--program-soft`    | light red tint         | `flyers-pink-light`   | light red tint         |
| `--program-on-dark` | `flyers-red-bright`    | `flyers-pink-bright`  | white                  |

A program section sets `data-program="xc"` (or `enduro`, `jr-flyers`) on its wrapper, and CSS maps the variables. This replaces the raw hex in `getProgramAccentMeta()` (`src/lib/programs.ts`).

## 4. Type

| Role     | Font             | Notes                                                                                                              |
| -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| Display  | Anton            | Headlines, buttons, program names. One heavy weight, uppercase, tight. Subheads in Anton sentence case, sparingly. |
| Body     | Epilogue         | Regular or Medium, sentence case, generous line spacing. 16px minimum on mobile.                                   |
| Fallback | Arial or Calibri | Office and email, when Anton and Epilogue aren't available.                                                        |

Both come from the Brand Book and are loaded from Google Fonts today. Plan: self-host them so the site serves its own files and don't call a third party.

## 5. Photos

- **Real Flyers photos only.** No AI-generated, stock, or composited images, ever. See AGENTS.md section 5.
- Candid, joyful, in action, riders of every ability. Fun over polish (Brand Book).
- Only use photos the club has media releases for. No full names of minors next to photos.
- When a photo is missing, use a plain block in the program color with a `TODO(board): photo needed` note.

## 6. Components both products share

Build these once and reuse them on every page.

- Program badge and color dot (name + color, never color alone)
- Buttons: primary (program color), secondary (outline), on-dark (gold focus)
- Event card (date, program tag, location, action)
- Person card (adult name, role, program, photo or initials)
- Notice banner (registration open, weather cancellation)
- Form fields with visible labels and 48px touch targets

## 7. Later: other club tools

If the club adds a members area or app later, move the tokens into one shared source file then, and keep anything behind a login (rosters, medical info, waivers) out of this public repo. Not planned for now.

## 8. Brand Book conflicts to resolve

The Brand Book disagrees with itself, or with decisions made since, in a few places. The site follows the right-hand column until Randall decides.

| Topic                                   | Brand Book says                                                                                                           | Site does now                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Club accent                             | Section 1: "Primary accent: Enduro Pink", identity "black, white, and pink". Sections 2, 4, 7: red is the club signature. | Red for the club, pink only for Enduro/Gravity.                                    |
| Jr. Flyers color                        | Youth Blue, given as two different blues (`#5cbce0` and `#1e88e5`).                                                       | Red, per Randall on Nov 21, 2026.                                                  |
| "Black" and "Slate"                     | Section 2 lists both as `#14242e`. Section 4 says Black `#14242e`, Slate `#203746`.                                       | Section 4 values.                                                                  |
| Website theme                           | Black backgrounds and white text everywhere.                                                                              | Dark header, hero, and footer, with light content sections for reading on a phone. |
| Headline underline                      | Pink stroke (section 3) or red underline (section 7).                                                                     | Red for club pages, pink on Enduro/Gravity pages (planned).                        |
| Tagline                                 | "Fast Follows Fun".                                                                                                       | Not used yet.                                                                      |
| "Nation's largest youth enduro program" | Stated as fact.                                                                                                           | Not used. It needs a source before it goes on the site (AGENTS.md section 5).      |
| School teams as "Affiliated"            | Lehi HS, Lehi Jr Devo, Westlake Rolling Thunder, Cedar Valley.                                                            | Not called partners until the board confirms.                                      |
