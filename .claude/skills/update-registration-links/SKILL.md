---
name: update-registration-links
description: Add, swap, or remove a program's registration form link (Flyers XC, Flyers Enduro/Gravity, Jr. Flyers) or change when registration opens.
---

# Update registration links

Use this when the club sends a new registration form link, when registration opens or closes, or when a program moves to a different form.

## Where things live

- `src/data/site.ts` → `registration`:
  - `season` (e.g. `'2027'`) and `opensDate` and `closesDate` (ISO dates, e.g. `'2026-12-01'` and `'2026-12-15'`). Also update `registrationWindowLabel` in `xc.md` and `enduro.md` and the registration event in `src/content/events/`.
  - `forms.xc` and `forms.enduro`: one link per form. Empty string = not open yet. Links can go in early: `liveFormLinks()` hides them until `opensDate` (Utah time), and the daily 2 AM rebuild turns them on.
- `src/content/programs/*.md` → `registrationForm: xc | enduro | later` says which form a program uses. `later` means "Registration opens later" (Jr. Flyers today).
- `registrationStatus` in each program file sets the badge. An `upcoming` program shows as open once its form link is set.
- Logic: `src/lib/registration.ts` (tests in `tests/unit/registration.test.ts`).

## Steps

1. Confirm with the person which program the link is for. Flyers XC and Flyers Enduro/Gravity have separate forms. Never guess a link, and never use a bare `https://www.zeffy.com/`.
2. Paste the full `https://` link into the right `forms` entry in `site.ts`.
3. If a program is opening for the first time (e.g. Jr. Flyers), add a form key to `forms` and to the `RegistrationForm` type, set `registrationForm` in that program file, and update `registrationWindowLabel`.
4. If the open date changes, update `opensDate`, the program files' `registrationWindowLabel`, and any update post in `src/content/updates/` that names the date. Never future-date a post.
5. To close registration, empty the link and set `registrationStatus: closed`.
6. Run `pnpm verify` and `pnpm test:e2e`. Check `/register`, the home page announcement, and each program page's Register button.
7. In the PR, say which buttons now go where.
