---
name: update-people
description: Add, change, or remove a Flyers coach or board member on the Coaches, Board, and About pages.
---

# Update coaches and board members

## Where things live

- One YAML file per entry in `src/content/leadership/`. The schema is in `src/content.config.ts` (`leadership`).
- `coach: true` lists the person on `/coaches`. `boardRole: President` (or Treasurer, Secretary, …) lists them on `/board`. One person can have both.
- `/about` lists every entry in `order`.
- The `Club Board` entry (order 1) is the board's description, not a person. Keep it.

## Fields

```yaml
name: Tim Richards
role: Board president and Flyers Enduro/Gravity coach
programFocus: Flyers Enduro/Gravity # or Flyers XC, Jr. Flyers, Lake Mountain Bicycle Club, Inc.
order: 3
coach: true
boardRole: President # leave out if not on the board
bio: One or two sentences, from the person or the board.
```

## Rules

- Only add people the person has confirmed, with the roles they gave. Don't carry names over from the old lakemountainflyers.com site without confirmation; it's out of date.
- Adults only. Never list minors by full name.
- Bios: use what the person provides. If there's no bio yet, keep it to a factual line about their role and add `# TODO(board): add a short bio and (with consent) a photo.`
- Photos need the person's consent and must be real (AGENTS.md section 5).
- Keep the board list consistent with the club's Form 990.

## Steps

1. Edit or add the YAML file. To remove someone, `git rm` their file, or drop `coach` / `boardRole` if they keep another role.
2. Update the "Open questions for the board" list in AGENTS.md if this answers one.
3. Run `pnpm verify` and `pnpm test:e2e`. Check `/coaches`, `/board`, and `/about`.
