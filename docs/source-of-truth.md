# Source of truth: where each club fact lives

Every club fact lives in exactly one place. Pages and components read it from there. This file is the map: it says where to edit a fact and whether it's confirmed. It doesn't repeat the values, so it can't drift out of date.

Status key: **Confirmed** (by Randall or the board, with the date), **Needs board** (placeholder on the site), **Stale** (known to be wrong).

## Club

| Fact                          | Where to edit                                        | Status                                                                |
| ----------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| Club name, legal entity       | `siteConfig.name`, `siteConfig.legalEntity`          | Confirmed                                                             |
| Mission and focus areas       | `siteConfig.mission`                                 | Confirmed (Randall, Nov 2026)                                         |
| EIN                           | `siteConfig.einPlaceholder`                          | Needs board                                                           |
| Contact email                 | `siteConfig.contact`                                 | Confirmed (old domain, keep until the new domain is live)             |
| Socials                       | `siteConfig.socials`                                 | Needs board (only @flyers_xc listed)                                  |
| School teams riders come from | `siteConfig.nicaPartners`                            | Needs board: which are formal partners                                |
| Brand colors and fonts        | `src/styles/global.css` (see [brand.md](./brand.md)) | Confirmed: XC red, Enduro/Gravity pink, Jr. Flyers blue (Nov 21 2026) |
| Help with costs               | `siteConfig.costHelp`                                | Confirmed: some help, ask a coach. Kinds of help need board           |

## Programs

One file each in `src/content/programs/`: `xc.md`, `enduro.md`, `jr-flyers.md`. Ages, grades, season, fee, what the fee covers, practice rhythm, who it's for, gear, and the NICA note all live in the frontmatter.

| Fact                                             | Status                                                                                                                                                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Flyers XC ages (10–22, U23), season, fee, groups | Confirmed (Randall, Nov 21 2026). Devo and Comp groups in `xc.md`. Grade 5 and up, with 5th and 6th graders by coach approval (Randall, Nov 27 2026).                                                   |
| Flyers Enduro/Gravity ages, season               | Confirmed. Minimum age is `siteConfig.enduroMinimumAge`.                                                                                                                                                |
| Enduro/Gravity fee and insurance                 | Needs board: what the gravity insurance is, and why $150                                                                                                                                                |
| Jr. Flyers grades, season                        | Confirmed                                                                                                                                                                                               |
| Jr. Flyers fee                                   | Confirmed $35 (Randall, Nov 21 2026)                                                                                                                                                                    |
| Practice days                                    | Confirmed Nov 21 2026. In each program's `practiceSchedule`.                                                                                                                                            |
| Practice times, locations                        | Needs board for all three programs                                                                                                                                                                      |
| Races each program follows                       | Confirmed Nov 21 2026. In the XC and Enduro/Gravity program files.                                                                                                                                      |
| Flyers XC 2027 race dates                        | `src/content/races/`, one file per series. ICUP and WRS races 1–6 from organizer sites (Nov 22 2026). Pro Cup date TBD.                                                                                 |
| Flyers XC optional endurance races               | `src/content/races/05-icup-endurance.yaml`, `06-bwr-utah.yaml` (`optional: true`). Wasatch 50, Gooseberry Epic and BWR Utah dates from organizer sites (Nov 28 2026). Brian Head Odyssey 2027 date TBD. |
| Flyers Enduro/Gravity 2027 race dates            | `src/content/races/04-youth-enduro-series.yaml`. Youth Enduro Series 2027 dates not posted yet (checked Nov 28 2026). TBD; Randall confirmed no dates yet (Nov 28 2026).                                |

## Registration

| Fact                             | Where to edit                                | Status                                                     |
| -------------------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| Opening date (Dec 1, 2026)       | `siteConfig.registration.opensDate`          | Confirmed                                                  |
| XC closing date (Dec 15, 2026)   | `siteConfig.registration.closesDates.xc`     | Confirmed (Randall, Nov 27 2026)                           |
| Enduro/Gravity closing date      | `siteConfig.registration.closesDates.enduro` | Needs board: Tim Richards to confirm                       |
| XC and Enduro/Gravity form links | `siteConfig.registration.forms`              | Confirmed (Randall, Nov 22 2026). Hidden until `opensDate` |
| Jr. Flyers opening date          | `registrationWindowLabel` in `jr-flyers.md`  | Needs board                                                |
| Refund policy                    | `siteConfig.refundPolicy`                    | Confirmed: no refunds (Randall, Nov 22 2026)               |
| Waiver                           | `/onboarding` (link when ready)              | Needs board: Randall is writing it                         |

## People

| Fact                      | Where to edit               | Status                                                                                 |
| ------------------------- | --------------------------- | -------------------------------------------------------------------------------------- |
| Coaches                   | `src/content/leadership/`   | Names confirmed. Bios and photos needed.                                               |
| Board                     | `src/content/leadership/`   | Tim Richards (president) confirmed. Rest needed.                                       |
| Coach screening, training | `siteConfig.coachScreening` | Confirmed (background check, head-coach training). Provider and other training needed. |

## Events and communications

| Fact                        | Where to edit                                       | Status                                                   |
| --------------------------- | --------------------------------------------------- | -------------------------------------------------------- |
| Club events                 | `src/content/events/`                               | Kickoff Jan 2, 2027 confirmed; time and trailhead needed |
| Winter camp                 | `src/data/winter-camp.ts`                           | Registration link and BLM permit needed                  |
| Google Calendar embed       | `siteConfig.integrations.googleCalendarEmbedUrl`    | Needs board                                              |
| Slack invite, email sign-up | `src/pages/onboarding.astro` (move to `siteConfig`) | Needs board                                              |
| News posts                  | `src/content/updates/`                              | Confirmed per post                                       |

## Money

| Fact                        | Where to edit                          | Status                                           |
| --------------------------- | -------------------------------------- | ------------------------------------------------ |
| Donate, sponsor, shop links | `siteConfig.integrations.zeffy*Url`    | Needs board: all are the bare zeffy.com link     |
| Sponsor tiers and perks     | `src/content/tiers/`                   | Needs board: confirm each perk will be delivered |
| Sponsors                    | `src/content/sponsors/`                | Confirmed                                        |
| Kit store                   | `siteConfig.integrations.voltKitStore` | Open Dec 1–15 confirmed. Needs board: Volt URL   |
| Fee summary line            | `siteConfig.feePhilosophy`             | Check it matches the program fees                |

## When a fact changes

1. Edit it in the one place listed above.
2. Update its status here.
3. If it was an open board question, tick it off in [plan.md](./plan.md).
4. Run `pnpm verify`.
