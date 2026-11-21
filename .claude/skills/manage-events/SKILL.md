---
name: manage-events
description: Add, change, or remove an event (ride, clinic, race, camp, trail day) on the Flyers schedule and home page.
---

# Add or remove an event

Events show on `/schedule`, the home page "Coming up" list (next 3), and matching program pages.

## Where things live

- One YAML file per event in `src/content/events/`, named `NN-short-name.yaml`. The schema is in `src/content.config.ts` (`events`).
- Past events drop off automatically. The site rebuilds daily, and `src/lib/events.ts` hides cards whose last day has passed.

## Fields

```yaml
title: Winter kickoff ride # short, sentence case
startDate: '2027-01-02' # ISO date, quoted
endDate: '2027-01-03' # optional, for multi-day events
timeLabel: Saturday · 10:00 AM – 12:00 PM # or "Time and trailhead coming soon"
program: xc # all | xc | enduro | jr-flyers | community
category: practice # practice | race | clinic | trail-work | registration | meeting
location: Local foothill trailhead
summary: One or two plain sentences on what riders do.
actionLabel: See the camp plan # optional, needs actionUrl
actionUrl: /winter-camp # optional; https://… or a site page starting with /
```

## Steps

1. Get the real date, time, place, and program from the person. If any are unknown, say so in the copy ("Time and trailhead coming soon") and add a `# TODO(board):` comment. Never invent them.
2. To add an event, create the file. To remove one, delete the file with `git rm`. To change one, edit it in place.
3. Keep the voice in docs/voice.md: simple, concise, and warm. Beginners are welcome, and so is competition up to the highest levels. No fees in the summary.
4. If the schedule drops below 2 upcoming events, the e2e schedule filter test (`tests/e2e/site.spec.ts`) may need its counts adjusted. Don't delete the test.
5. Run `pnpm verify` and `pnpm test:e2e`. Check `/schedule` and the home page.

The club plans to keep its full calendar in Google Calendar (`siteConfig.integrations.googleCalendarEmbedUrl`). Site events are for the big dates.
