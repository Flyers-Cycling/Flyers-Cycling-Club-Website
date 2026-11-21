# Flyers brand and design system

One club brand, with a color for each program. The public website and the future team-management app both build on the same design tokens, so a Flyers XC page and a Flyers XC roster screen look like they belong together.

Status: the tokens below exist today in `src/styles/global.css`. The program-theme layer and the shared package are planned (see [plan.md](./plan.md), Phase 2). Items marked `TODO(board)` need answers before they are final.

## 1. Brand architecture

| Level   | Name                  | Primary color          | Used for                                                                                                   |
| ------- | --------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| Club    | Flyers Cycling Club   | Slate, with red + gold | Header, footer, home page, About, Sponsors, Board, anything club-wide                                      |
| Program | Flyers XC             | Red                    | XC pages, XC events, XC Devo and XC Comp                                                                   |
| Program | Flyers Enduro/Gravity | Pink                   | Enduro/Gravity pages and events                                                                            |
| Program | Jr. Flyers            | Berry (placeholder)    | Jr. Flyers pages and events. `TODO(board)`: confirm the Jr. Flyers color. Berry sits very close to XC red. |

Rules:

- **The club frame never changes.** Header, footer, nav, and type are the same on every page. Only the program accent changes inside a program section.
- **One accent per screen.** A program page uses its own color. Mixed pages (home, schedule, programs list) use each program's color only on that program's card, dot, or tag.
- **Color is never the only signal.** Every program color appears with the program name next to it (WCAG 1.4.1).
- **XC Devo and XC Comp share Flyers XC red.** Tell them apart with a label, not a second color.

## 2. Logos

`TODO(board)`: we need the source files. Please send SVG or high-resolution PNG versions of:

- The Flyers club logo (full color, one-color white, one-color dark)
- Any Flyers XC, Flyers Enduro/Gravity, and Jr. Flyers marks
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
| `flyers-red`                   | `#b81e1e` | 6.5:1                | Club accent and Flyers XC primary. White text OK.                        |
| `flyers-red-deep`              | `#8f1616` | 9.2:1                | Hover and pressed states.                                                |
| `flyers-berry`                 | `#9d112a` | 8.2:1                | Jr. Flyers primary (placeholder).                                        |
| `flyers-pink`                  | `#e6197d` | 4.4:1                | Enduro/Gravity bars, dots, blocks. Not for small text.                   |
| `flyers-pink-deep`             | `#b8125f` | 6.4:1                | Enduro/Gravity buttons and text on white.                                |
| `flyers-pink-dark`             | `#8a0c45` | 9.5:1                | Enduro/Gravity hover.                                                    |
| `flyers-pink-bright`           | `#f472b6` | 6.0:1 on slate-dark  | Enduro/Gravity text on dark slate only.                                  |
| `flyers-gold`                  | `#f4ce50` | 10.4:1 on slate-dark | Highlights and focus ring on dark surfaces. Never text on white (1.5:1). |
| `flyers-snow`, `flyers-silver` |           |                      | Page background and borders.                                             |

### Program theme (planned)

Each program sets the same four variables, so one component works for every program:

| Variable            | Flyers XC           | Flyers Enduro/Gravity | Jr. Flyers       |
| ------------------- | ------------------- | --------------------- | ---------------- |
| `--program-primary` | `flyers-red`        | `flyers-pink-deep`    | `flyers-berry`   |
| `--program-hover`   | `flyers-red-deep`   | `flyers-pink-dark`    | (darker berry)   |
| `--program-accent`  | `flyers-red`        | `flyers-pink`         | `flyers-berry`   |
| `--program-soft`    | light red tint      | `flyers-pink-light`   | light berry tint |
| `--program-on-dark` | `flyers-red-bright` | `flyers-pink-bright`  | white            |

A program section sets `data-program="xc"` (or `enduro`, `jr-flyers`) on its wrapper, and CSS maps the variables. This replaces the raw hex in `getProgramAccentMeta()` (`src/lib/programs.ts`).

## 4. Type

| Role    | Font              | Notes                                                |
| ------- | ----------------- | ---------------------------------------------------- |
| Display | Barlow Condensed  | Headings, buttons, program names. Uppercased by CSS. |
| Body    | Plus Jakarta Sans | Everything else. 16px minimum on mobile.             |

Both are loaded from Google Fonts today. Plan: self-host them so the site and the app share the same files and don't call a third party.

## 5. Photos

- **Real Flyers photos only.** No AI-generated, stock, or composited images, ever. See AGENTS.md section 5.
- Kids riding, coaching moments, and group shots beat posed podium photos.
- Only use photos the club has media releases for. No full names of minors next to photos.
- When a photo is missing, use a plain block in the program color with a `TODO(board): photo needed` note.

## 6. Components both products share

These are the pieces the website and the app should both use. Build them once.

- Program badge and color dot (name + color, never color alone)
- Buttons: primary (program color), secondary (outline), on-dark (gold focus)
- Event card (date, program tag, location, action)
- Person card (adult name, role, program, photo or initials)
- Notice banner (registration open, weather cancellation)
- Form fields with visible labels and 48px touch targets

## 7. Sharing with the team app

The app doesn't exist yet. When it does:

1. Move the palette and program-theme tokens into one source file (for example `packages/design-tokens/tokens.json`) in a pnpm workspace.
2. Generate the CSS variables and Tailwind `@theme` from that file for both the site and the app.
3. The website stays public and static. Anything behind a login (rosters, attendance, medical info, waivers) lives in the app, never in this repo.
4. The site links to the app from a "Member login" item in the header.

Write an architecture decision record before picking the app's stack or sign-in provider.
