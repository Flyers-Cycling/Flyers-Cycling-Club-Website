# Flyers voice guide

How Flyers sounds, on the website, in emails, and on social. This is the standard for every page. If a draft breaks a rule here, fix the draft.

## Who we are, in one line

Developing lifelong cyclists, one ride at a time.

The full mission lives in `siteConfig.mission` (`src/data/site.ts`). Quote it from there. Don't retype or paraphrase it on a page.

## Who we're talking to

1. **Parents and guardians** deciding whether to trust volunteers with their kid.
2. **Riders**, especially new and nervous ones, but also riders trying to compete at very high levels, including podium chasers.
3. **Current members** who need a fact fast: when, where, what to bring, how to register.
4. **Volunteers and adult riders** who might coach, lead rides, or help at events.
5. **Sponsors and donors** who want to know what their money does.

When these conflict, the earlier one wins.

## How we sound

A friendly coach talking to a parent at the trailhead. Warm, plain, specific, and sure of itself. Not an ad agency, not a brochure, not a chatbot.

Durango DEVO is the closest model. Their lines work because they are short and they say what they mean: "Developing lifelong cyclists, one ride at a time." "Interest in racing is not required." We borrow the attitude, not the words.

### Principles

1. **Lead with the rider's experience.** Fun, friends, confidence, skills, and a love of riding come first. Racing is there for riders who want it.
2. **Be specific.** "Tuesdays 6-7:30 PM at the skills park" beats "flexible, high-quality practices." If you don't know the detail yet, use a `TODO(board)` placeholder instead of an adjective.
3. **Welcome beginners out loud.** You don't need to be fast, race, or own an expensive bike.
4. **Be confident, not defensive.** Say what Flyers does. Don't compare us to other clubs or "expensive programs." Those clubs are often our riders' NICA teams, coaches, and friends.
5. **Say each fact once per page, where it matters.** Fees and ages go on program pages and the FAQ, not the home page, header, or cards.
6. **Be honest about the full cost.** The fee, what it covers, what it doesn't (bike, gear, race entries, kit, travel), and how to ask for help.
7. **Thank people like neighbors.** Gratitude plus a real outcome, not a list of logo placements.
8. **Say so when you don't know.** If a fact isn't confirmed, mark it. Never write around a gap.

### Community, not just programs

Flyers is community based. Our programs exist because Utah has a deep cycling community: riders, coaches, parents, sponsors, and donors. Copy should make that visible by naming real people and real places (once confirmed), and by inviting adults in as riders, volunteers, and coaches.

## Hard rules

These come from Randall and the board. No exceptions.

- **No em dashes (—).** Use a hyphen, a colon, or a full stop. En dashes are fine for number ranges (K–6, $50–$150).
- **No throat-clearing.** Start with the substance. No "In today's world...", "Welcome to...", or "Here's everything you need to know."
- **No stock closings.** No "In conclusion", no "Ready to ride? Join the adventure!" wrap-ups on every section.
- **No paired contrasts** like "It's not just X, it's Y."
- **No neat triads by habit.** Lists of three are fine when there really are three things. Don't force them.
- **Vary sentence length.** A short line after a long one is good. Ten sentences of the same length read as machine-written.
- **No fence-sitting.** Don't write "While some say X, others say Y" when we have a view.
- **Banned words:** delve, tapestry, testament, crucial, underscore, vibrant, synergy, seamless(ly), next-level, world-class (in our own copy), radically, unified hub/platform, leverage, elevate, empower (unless quoting the mission), journey, unlock, strictly, "just $X", "only $X".
- **At most one exclamation point per page.**

## Style

- **Program names:** Flyers XC, Flyers XC Devo, Flyers XC Comp, Flyers Enduro/Gravity, Jr. Flyers. "Flyers" alone means the whole club. Use "Lake Mountain Bicycle Club, Inc." only where the legal entity matters (tax, legal, footer, prospectus).
- **Headings:** short and human, about 8 words at most. Write them in sentence case. Display headings are uppercased by CSS.
- **Body:** 7th-8th grade reading level. Second person ("your rider"). Active voice.
- **Numbers:** numerals ("3 programs", "$50"). En dash for ranges.
- **Dates:** human format ("Sat, Jan 2"). Never raw ISO strings on a page.
- **Bold:** at most one key fact per paragraph. Never a whole phrase.
- **Buttons:** verb first, 1-4 words. "Register for XC", "See the schedule", "Donate".

## Before and after

| Instead of                                                                   | Write                                                                                       |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| "Competitive Progression Without the Multi-Thousand-Dollar Price Tag"        | "Great coaching. Low cost. Every kid welcome."                                              |
| "One Cycling Club. Three Dirt Pathways. Built for Every Local Kid."          | "Mountain biking for Utah kids, K through college."                                         |
| "Why are fees only $50 or $150 when other clubs cost thousands?"             | "Why is registration so affordable?"                                                        |
| "Gravity skills make safer, faster all-around riders… next-level confidence" | "Learning to descend well makes riders safer on every trail, including their NICA courses." |
| "Pairs seamlessly with fall NICA racing at Westlake, Lehi, Cedar Valley…"    | "Winter through summer riding that fits around your fall school team."                      |
| "It's not just a bike club, it's a family."                                  | "Most of our riders came for the riding and stayed for their friends."                      |

## Each program's voice

All three programs share one club voice. The emphasis shifts.

| Program               | Lead with                                                    | Keep in the background                |
| --------------------- | ------------------------------------------------------------ | ------------------------------------- |
| Jr. Flyers            | Play, first trail skills, and safety. Talk to parents first. | Racing. Don't mention it.             |
| Flyers XC Devo        | Riding with friends, skills, fitness, all year.              | Results and podiums.                  |
| Flyers XC Comp        | Training, race preparation, and team support at races.       | Comparing riders to each other.       |
| Flyers Enduro/Gravity | Control, progression, and descending safely.                 | "Sending it." Speed for its own sake. |

## Checklist before you ship copy

1. Did you start with the substance?
2. Search the text for "—". Zero results.
3. Search for each banned word.
4. Is every fact in `site.ts` or a content collection, or marked `TODO(board)`?
5. Read it aloud. Does it sound like a coach or like an ad?
