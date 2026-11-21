# Flyers website plan

The working plan for the Flyers Cycling Club website, the front door for all three programs. Tick a box in the same PR that finishes the work. Add new items at the end of the right phase.

Last reviewed: Nov 21, 2026.

## Where we're headed

A site a parent can trust in 2 minutes on a phone, and a member can use every week. Durango DEVO is the model: one club, many groups, clear safety and support pages, and lots of real photos. Flyers has 3 programs instead of 15 age groups, so each program gets its own section with its own color.

Later, a team-management app (rosters, attendance, messages) sits behind a "Member login" link. The site and the app share one design system ([brand.md](./brand.md)).

### What we're borrowing from Durango DEVO

- A clear "how we work" statement (theirs is "age based" and "community based"). Ours: organized by program, age, and ability, and community based.
- A Safety page with a way to report a concern.
- Scholarships with their own page, not one FAQ line.
- Donate, Volunteer, and Sponsors grouped under one "Support" menu.
- A Policies area: rider rules, cancellation and refund, code of conduct.
- Coach resources for volunteers.
- Real impact numbers on the home page, once we have them.

### What we're not borrowing

- Stale event listings. Our schedule hides past events automatically.
- Policies in loose Google Docs. Ours live on the site.
- Numbers that change from page to page. Ours come from one place ([source-of-truth.md](./source-of-truth.md)).

## Phase 0: Foundation (this PR)

- [x] Review AGENTS.md / CLAUDE.md and point it at the new guides
- [x] Voice guide ([voice.md](./voice.md))
- [x] Brand and design system ([brand.md](./brand.md))
- [x] Source-of-truth map ([source-of-truth.md](./source-of-truth.md))
- [x] Project memory updated
- [ ] Randall answers the content questions (bottom of this file)

## Phase 1: Ready for registration (by Dec 1, 2026)

- [ ] Merge PR #8 (Jr. Flyers $35, Flyers XC Devo and Comp)
- [ ] Paste the XC and Enduro/Gravity form links into `siteConfig.registration.forms` (skill: `update-registration-links`)
- [ ] Kickoff ride time and trailhead (skill: `manage-events`)
- [ ] Real Zeffy donate link, so the Donate button works
- [ ] Slack invite, email sign-up, and Google Calendar links on New Families
- [ ] Google Calendar embed on Schedule
- [ ] Update README.md, which still describes the old program ages and "U23"
- [ ] Decide on the custom domain (www.flyerscycling.org) and rename `public/CNAME.example`

## Phase 2: Design system

- [ ] Add the semantic and program-theme token layers to `global.css` (brand.md section 3)
- [ ] Replace raw hex in `getProgramAccentMeta()` with tokens
- [ ] Each program page sets `data-program` so its color comes from one place
- [ ] Confirm the Jr. Flyers color and get logo source files
- [ ] Self-host the two fonts
- [ ] Build the shared components list (brand.md section 6) as Astro components
- [ ] A `/styleguide` page (not in the nav) that shows tokens and components

## Phase 3: Trust and safety

Parents look for these first.

- [ ] Safety page: coach screening and training, two-adult rule, helmet and gear rules, concussion protocol, emergencies, how to report a concern
- [ ] Coaches page with real bios and photos (adults, with consent)
- [ ] Board page with every board member, the EIN, and a 990 or annual report link
- [ ] Policies page: code of conduct, rider rules, waiver, refund and cancellation
- [ ] Scholarships page: what help exists and how to ask privately
- [ ] Volunteer page: roles, time asked, training, how to start

## Phase 4: Program sections

Each program becomes its own section, the way the club runs.

- [ ] Section layout: overview, groups, schedule, coaches, gear, resources, news
- [ ] Flyers XC: separate Devo and Comp pages, with how a rider picks or moves between them
- [ ] Flyers Enduro/Gravity: protective gear rules, bike park days, race support
- [ ] Jr. Flyers: what a first session looks like, a parent's guide, bike sizing
- [ ] Program filter on Schedule and News (events and posts already carry a program)
- [ ] Program-specific photos (real ones, with media releases)

## Phase 5: Member resources

For families already in the club.

- [ ] Parent handbook: how communication works (Slack, email, calendar), weather calls, what to bring
- [ ] Rider knowledge library: bike fit, basic maintenance, trail etiquette, nutrition and hydration, race day basics
- [ ] Coach resources: ride leader checklists, emergency plan, skills progressions
- [ ] Simple contact form that routes to the right person by topic

## Phase 6: Community and support

- [ ] "Support" menu: Donate, Sponsor, Volunteer, Shop
- [ ] Donate reachable from every page
- [ ] Real sponsors only; open sponsorship spots listed separately
- [ ] Confirm every sponsor tier perk before it stays on the site
- [ ] Impact numbers on the home page (riders, rides, volunteer hours, scholarships)
- [ ] Adult riders: how parents and adults can ride, coach, and help
- [ ] Rider and family stories, with permission
- [ ] Newsletter sign-up

## Phase 7: Team app

- [ ] List what the app does first (Randall to decide: rosters, attendance, messages, waivers, payments?)
- [ ] Architecture decision: stack, sign-in, where member data lives
- [ ] Move design tokens into a shared package
- [ ] "Member login" link in the header

## Board and content questions

Open facts the site needs. Resolve one, update the fact in its home ([source-of-truth.md](./source-of-truth.md)), and tick it here.

- [ ] Which NICA teams are formal partners, and which just share riders?
- [ ] What screening and training do Flyers coaches complete (background check provider, concussion, abuse awareness, first aid/CPR)?
- [ ] EIN, the full board list, and a 990 or annual report link
- [ ] Coach bios and photos: Randall Adams (XC), Tim Richards (Enduro/Gravity), Jessie Shepard (Jr. Flyers)
- [ ] Registration form links (Dec 1, 2026) and the Jr. Flyers opening date
- [ ] Real Zeffy links for donations, each tier, and the shop. Real Google Calendar embed. Real Volt store URL.
- [ ] Is Lake Mountain Trails Coalition a current sponsor? What is its URL?
- [ ] What the Enduro/Gravity "gravity rider insurance" is, and why the fee is $150
- [ ] Scholarship details: fee waivers, loaner bikes, who reviews requests
- [ ] Refund policy and waiver links
- [ ] Confirm the club will deliver every sponsor tier perk in `src/content/tiers/`
- [ ] Media releases for the Enduro/Gravity photo (4 riders), and real photos for the home page hero, Flyers XC, and Jr. Flyers
- [ ] Practice days, times, and locations for each program
- [ ] Jr. Flyers brand color, and logo source files
