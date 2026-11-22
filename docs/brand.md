# Flyers brand and design system

One club brand, with an optional color for each program. Anything else the club builds later (for example a members area) should use the same design tokens, so it looks like it belongs with the site.

**Source:** the club's Brand Book (Google Doc "Flyers Cycling - Brand Book", v1.1). This file is how the website applies it. Where the two disagree, section 8 lists what's open.

Status: the palette and the program-theme layer below exist today in `src/styles/global.css` (see [plan.md](./plan.md), Phase 2). Items marked `TODO(board)` need answers before they are final.

## 1. Brand architecture

| Level   | Name                  | Primary color                | Used for                                                                                  |
| ------- | --------------------- | ---------------------------- | ----------------------------------------------------------------------------------------- |
| Club    | Flyers Cycling Club   | Red, with black, slate, gold | Header, footer, home page, About, Sponsors, Board, non-profit details, anything club-wide |
| Program | Flyers XC             | Red                          | XC pages, XC events, XC Devo and XC Comp                                                  |
| Program | Flyers Enduro/Gravity | Pink                         | Enduro/Gravity pages and events                                                           |
| Program | Jr. Flyers            | Youth Blue `#1e88e5`         | Jr. Flyers pages and events. Has its own Junior Flyers logo.                              |

Rules:

- **The club frame never changes.** Header, footer, nav, and type are the same on every page. Only the program accent changes inside a program section.
- **One accent per screen.** A program page uses its own color. Mixed pages (home, schedule, programs list) use each program's color only on that program's card, dot, or tag.
- **Color is never the only signal.** Every program color appears with the program name next to it (WCAG 1.4.1).
- **Flyers XC, XC Devo, and XC Comp all use red.** Tell them apart with the program name, not a second color.
- **Program colors never replace red on club-wide pieces.** (Brand Book.)
- **Keep the Flyers wordmark visible** on every program page, so the family reads as one club.
- **Signature device:** a short red underline stroke under display headlines (pink inside Enduro/Gravity).
- **The one test** (Brand Book): is it black, white, and red; does it look like the same club; does it feel like fun?

## 2. Logos

Rules from the Brand Book:

- The Flyers Enduro wordmark and the Lake Mountain long logo are the foundation. Program lockups are the Flyers mark plus the program name set in Anton.
- Clear space equal to the height of the "F" in Flyers on every side. Minimum 32px tall on screen, 0.5 in in print.
- Use the white or pink logo on black or on photos. Don't stretch, recolor, add effects, rotate, place it on a busy photo, or rebuild a lockup in another font.

Files: `public/images/brand/` (SVG, traced from the club's PNGs) and `public/images/brand/png/`.

The Junior Flyers logo (`jr-flyers-logo-blue.svg` and `jr-flyers-logo-white.svg`) came from the club's original Illustrator PDF (Nov 2026), so it is true vector art, not a trace. Its blue is `#00ADEF`, a lighter cyan than the Youth Blue `#1e88e5` the site uses for Jr. Flyers accents. TODO(board): confirm whether Youth Blue should change to match the logo. They're published on the site at [/brand](../src/pages/brand.astro). Still needed:

- Program lockups (Flyers XC, Flyers Enduro/Gravity) and the Flyers Enduro script wordmark
- The Lake Mountain long logo

Don't redraw or generate a logo. The SVGs were traced directly from the club's PNG files; replace them with original vector files if the club finds them.

## 3. Color tokens

Three layers. Components use the top layer whenever it exists.

```
program theme   --program-primary, --program-accent, --program-soft, --program-ink        (exists)
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
| `flyers-red`                   | `#b81e1e` | 6.5:1                | Accessible red for buttons and small text. Flyers XC primary.                                            |
| `flyers-red-deep`              | `#8f1616` | 9.2:1                | Hover and pressed states.                                                                                |
| `flyers-blue`                  | `#1e88e5` | 4.3:1 on slate-dark  | Brand Book "Youth Blue", Jr. Flyers. Bars, dots, accents. Not behind white text (3.7:1).                 |
| `flyers-blue-deep`             | `#1565c0` | 5.8:1                | Jr. Flyers buttons and text on white.                                                                    |
| `flyers-blue-dark`             | `#0d47a1` | 8.6:1                | Jr. Flyers hover and badge text.                                                                         |
| `flyers-blue-bright`           | `#64b5f6` | 7.2:1 on slate-dark  | Jr. Flyers text on dark.                                                                                 |
| `flyers-berry`                 | `#9d112a` | 8.2:1                | Spare accent. No longer the Jr. Flyers color.                                                            |
| `flyers-pink`                  | `#fe6cd0` | 6.3:1 on slate-dark  | Brand Book "Enduro Pink". Bars, dots, underlines, text on dark. Never behind white text (2.5:1).         |
| `flyers-pink-deep`             | `#b8125f` | 6.4:1                | Enduro/Gravity buttons and text on white.                                                                |
| `flyers-pink-dark`             | `#8a0c45` | 9.5:1                | Enduro/Gravity hover.                                                                                    |
| `flyers-pink-bright`           | `#fe6cd0` | 6.3:1 on slate-dark  | Same as `flyers-pink`. Kept so existing classes still work.                                              |
| `flyers-gold`                  | `#f4ce50` | 10.4:1 on slate-dark | Brand Book "Gold". CTAs and callouts on dark, focus ring. Never text on white (1.5:1).                   |
| `flyers-gray-light`            | `#dcdcdc` | 11.6:1 on slate-dark | Brand Book "Light Gray". Secondary text and captions on dark.                                            |
| `flyers-snow`, `flyers-silver` |           |                      | Page background and borders.                                                                             |

### Program theme (exists)

Each program sets the same variables in `src/styles/global.css`, so one component works for every program. A wrapper sets `data-program="xc"` (or `enduro`, `jr-flyers`), and everything inside it uses the `*-program*` utilities. Outside a wrapper they fall back to the club red. `programTheme()` in `src/lib/programs.ts` turns a content key (`xc`, `enduro`, `jr`, `jr-flyers`, `all`, ...) into the right `data-program` value.

| Utility                      | Use                                  | Flyers XC (and club)   | Flyers Enduro/Gravity | Jr. Flyers           |
| ---------------------------- | ------------------------------------ | ---------------------- | --------------------- | -------------------- |
| `bg-program`, `text-program` | Buttons, check marks, white-text bg  | `flyers-red`           | `flyers-pink-deep`    | `flyers-blue-deep`   |
| `bg-program-hover`           | Button hover                         | `flyers-red-deep`      | `flyers-pink-dark`    | `flyers-blue-dark`   |
| `*-program-accent`           | Bars, dots, borders, headline stroke | `flyers-red-signature` | `flyers-pink`         | `flyers-blue`        |
| `bg-program-soft`            | Badge and callout tint               | `flyers-red-light`     | `flyers-pink-light`   | `flyers-blue-light`  |
| `text-program-ink`           | Small text and links on white        | `flyers-red-deep`      | `flyers-pink-dark`    | `flyers-blue-dark`   |
| `text-program-on-dark`       | Text on slate                        | white                  | `flyers-pink-bright`  | `flyers-blue-bright` |

Use `<ProgramBadge program="..."/>` (`src/components/programs/ProgramBadge.astro`) for program tags: it pairs the color dot with the program name. The `flyers-stroke` class adds the signature underline under a display headline, in the program accent.

Rule of thumb: never write a program's hex or a `flyers-pink-*` / `flyers-blue-*` class inside a program page or card. Set `data-program` and use the program utilities.

## 4. Type

| Role     | Font             | Notes                                                                                                              |
| -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| Display  | Anton            | Headlines, buttons, program names. One heavy weight, uppercase, tight. Subheads in Anton sentence case, sparingly. |
| Body     | Epilogue         | Regular or Medium, sentence case, generous line spacing. 16px minimum on mobile.                                   |
| Fallback | Arial or Calibri | Office and email, when Anton and Epilogue aren't available.                                                        |

Both come from the Brand Book. The site serves its own copies (the `@fontsource/anton` and `@fontsource/epilogue` packages, Latin subset), so pages make no third-party font requests.

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

## 8. Brand Book decisions (Randall, Nov 21 2026)

| Topic                                   | Decision                                                                    |
| --------------------------------------- | --------------------------------------------------------------------------- |
| Club accent                             | Red. Pink is Flyers Enduro/Gravity only.                                    |
| Jr. Flyers color                        | Youth Blue `#1e88e5`.                                                       |
| "Black" and "Slate"                     | Black `#14242e`, Slate `#203746`.                                           |
| Website theme                           | Dark header, hero, and footer. Reading sections stay light.                 |
| "Nation's largest youth enduro program" | Confirmed by Randall. Used on the Enduro/Gravity page.                      |
| Voice on results                        | Welcome every rider, from first-timers to podium chasers. Celebrate effort. |
| Tagline                                 | "Fast Follows Fun". Shown on /brand.                                        |
| School teams as "Affiliated"            | Still not called partners until the board confirms.                         |
