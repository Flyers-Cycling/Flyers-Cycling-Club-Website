# Flyers brand and design system

One club brand, with an optional color for each program. Anything else the club builds later (for example a members area) should use the same design tokens, so it looks like it belongs with the site.

Status: the tokens below exist today in `src/styles/global.css`. The program-theme layer and the shared package are planned (see [plan.md](./plan.md), Phase 2). Items marked `TODO(board)` need answers before they are final.

## 1. Brand architecture

| Level   | Name                  | Primary color           | Used for                                                                                  |
| ------- | --------------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| Club    | Flyers Cycling Club   | Red, black, slate, gold | Header, footer, home page, About, Sponsors, Board, non-profit details, anything club-wide |
| Program | Flyers XC             | Red                     | XC pages, XC events, XC Devo and XC Comp                                                  |
| Program | Flyers Enduro/Gravity | Pink                    | Enduro/Gravity pages and events                                                           |
| Program | Jr. Flyers            | Red                     | Jr. Flyers pages and events. Shares Flyers XC red and the same logo.                      |

Rules:

- **The club frame never changes.** Header, footer, nav, and type are the same on every page. Only the program accent changes inside a program section.
- **One accent per screen.** A program page uses its own color. Mixed pages (home, schedule, programs list) use each program's color only on that program's card, dot, or tag.
- **Color is never the only signal.** Every program color appears with the program name next to it (WCAG 1.4.1).
- **Flyers XC, XC Devo, XC Comp, and Jr. Flyers all use red.** Tell them apart with the program name, not a second color.

## 2. Logos

`TODO(board)`: we need the source files. Please send SVG or high-resolution PNG versions of:

- The Flyers club logo (full color, one-color white, one-color dark)
- Any Flyers XC or Flyers Enduro/Gravity marks (Jr. Flyers uses the club logo)
- The brand kit the palette came from (the Canva brand kit referenced in `global.css`)

Until then, the site uses the files already in `public/`. Don't redraw, trace, or generate a logo.

## 3. Color tokens

Three layers. Components use the top layer whenever it exists.

```
program theme   --program-primary, --program-on-primary, --program-soft, --program-text   (planned)
semantic        surface, text, border, action, focus                                       (planned)
palette         --color-flyers-*                                                            (exists)
```

### Palette (exists, `src/styles/global.css`)

| Token                          | Hex       | Contrast on white    | Use                                                                      |
| ------------------------------ | --------- | -------------------- | ------------------------------------------------------------------------ |
| `flyers-slate`                 | `#203746` | 12.4:1               | Club primary. Header, footer, dark sections.                             |
| `flyers-slate-dark`            | `#14242e` | 15.9:1               | Darkest surface.                                                         |
| `flyers-charcoal`              | `#212121` | 16.1:1               | Club black. Body text and black brand elements.                          |
| `flyers-red`                   | `#b81e1e` | 6.5:1                | Club accent and Flyers XC primary. White text OK.                        |
| `flyers-red-deep`              | `#8f1616` | 9.2:1                | Hover and pressed states.                                                |
| `flyers-berry`                 | `#9d112a` | 8.2:1                | Spare accent. No longer the Jr. Flyers color.                            |
| `flyers-pink`                  | `#e6197d` | 4.4:1                | Enduro/Gravity bars, dots, blocks. Not for small text.                   |
| `flyers-pink-deep`             | `#b8125f` | 6.4:1                | Enduro/Gravity buttons and text on white.                                |
| `flyers-pink-dark`             | `#8a0c45` | 9.5:1                | Enduro/Gravity hover.                                                    |
| `flyers-pink-bright`           | `#f472b6` | 6.0:1 on slate-dark  | Enduro/Gravity text on dark slate only.                                  |
| `flyers-gold`                  | `#f4ce50` | 10.4:1 on slate-dark | Highlights and focus ring on dark surfaces. Never text on white (1.5:1). |
| `flyers-snow`, `flyers-silver` |           |                      | Page background and borders.                                             |

### Program theme (planned)

Each program sets the same four variables, so one component works for every program:

| Variable            | Flyers XC           | Flyers Enduro/Gravity | Jr. Flyers        |
| ------------------- | ------------------- | --------------------- | ----------------- |
| `--program-primary` | `flyers-red`        | `flyers-pink-deep`    | `flyers-red`      |
| `--program-hover`   | `flyers-red-deep`   | `flyers-pink-dark`    | `flyers-red-deep` |
| `--program-accent`  | `flyers-red`        | `flyers-pink`         | `flyers-red`      |
| `--program-soft`    | light red tint      | `flyers-pink-light`   | light red tint    |
| `--program-on-dark` | `flyers-red-bright` | `flyers-pink-bright`  | white             |

A program section sets `data-program="xc"` (or `enduro`, `jr-flyers`) on its wrapper, and CSS maps the variables. This replaces the raw hex in `getProgramAccentMeta()` (`src/lib/programs.ts`).

## 4. Type

| Role    | Font              | Notes                                                |
| ------- | ----------------- | ---------------------------------------------------- |
| Display | Barlow Condensed  | Headings, buttons, program names. Uppercased by CSS. |
| Body    | Plus Jakarta Sans | Everything else. 16px minimum on mobile.             |

Both are loaded from Google Fonts today. Plan: self-host them so the site serves its own files and don't call a third party.

## 5. Photos

- **Real Flyers photos only.** No AI-generated, stock, or composited images, ever. See AGENTS.md section 5.
- Kids riding, coaching moments, and group shots beat posed podium photos.
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
