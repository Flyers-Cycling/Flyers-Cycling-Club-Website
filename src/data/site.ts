export interface NicaPartnerTeam {
  name: string;
  school: string;
  city: string;
}

export const siteConfig = {
  name: 'Flyers Cycling Club',
  shortName: 'Flyers',
  tagline: 'Youth mountain biking in Utah. All riders welcome.',
  legalEntity: 'Lake Mountain Bicycle Club, Inc.',
  // Approved by Randall (Nov 2026). A modernized version of the lakemountainflyers.com mission.
  mission: {
    statement:
      'Flyers Cycling Club helps young riders become lifelong mountain bikers. Through our programs, we build skills, fitness, and friendships in a club that welcomes every rider, whatever their skill level, gender, or fitness.',
    focusAreas: [
      { title: 'Fun', body: 'Riding with friends comes first, in every program.' },
      {
        title: 'Skills and training',
        body: 'Coaching that meets each rider where they are, from first trail skills to race training.',
      },
      {
        title: 'Racing, if you want it',
        body: 'Flyers XC Devo for riders who want to ride with less focus on racing, and Flyers XC Comp for competitive racing. We support both.',
      },
      {
        title: 'Education',
        body: 'Bike safety, bike care, and trail etiquette for riders and families.',
      },
      { title: 'Service', body: 'Giving back through trail days and volunteering.' },
    ],
  },
  nonProfitStatus: '501(c)(3) Non-Profit Organization',
  einPlaceholder: 'Available upon request for corporate & foundation matching',
  region: 'Utah',
  feePhilosophy: {
    rangeLabel: '$35–$150',
    shortSummary: '$35–$150 registration covers a t-shirt and insurance',
    detail:
      "Every Flyers program is run by volunteers. Registration is $35–$150, depending on the program, and covers a club t-shirt and rider insurance. Sponsors and donors pay for the rest, so cost doesn't keep kids off the trail.",
  },
  // Flyers XC and Flyers Enduro/Gravity each have their own registration form, opening Dec 1.
  // Jr. Flyers registers later (registrationForm: later in src/content/programs/jr-flyers.md).
  registration: {
    season: '2027',
    opensDate: '2026-12-01',
    // Links from Randall (Nov 22, 2026). They stay hidden until opensDate (Utah time), then the
    // daily rebuild turns every Register button on. While a link is empty or it's before
    // opensDate, that program's buttons say "Registration opens Dec 1" and go to /register.
    forms: {
      xc: 'https://www.zeffy.com/en-US/ticketing/flyers-xc-registration' as string,
      enduro: 'https://www.zeffy.com/en-US/ticketing/flyers-enduro-registration' as string,
    },
  },
  // Confirmed by Randall (Nov 21, 2026). Used on /safety, /coaches, and /volunteer.
  // Say nothing stronger until the board confirms more (see docs/plan.md, board questions).
  coachScreening:
    'Every Flyers coach completes a background check and training from our head coaches. Many are also NICA coaches.',
  // Confirmed by Randall (Nov 21, 2026): some help is available, and families reach out to a coach.
  costHelp: {
    summary:
      "Some help with costs is available. Talk to your rider's coach, or email us. We keep every request private.",
  },
  // Confirmed by Randall (Nov 22, 2026): no refunds. Used on /onboarding and /register.
  refundPolicy:
    "Registration fees and camp payments aren't refundable. If cost is the worry, ask about help before you sign up.",
  // Confirmed by Randall (Nov 21, 2026). Used on /safety and /onboarding.
  weatherCalls:
    "We call off rides for lightning and mud. You'll hear in Slack at least 2 hours before the ride starts.",
  // Home page photo, chosen by Randall (Nov 22, 2026). Media release on file.
  // TODO(board): Randall will swap in a podium photo later. Keep the alt text true to the photo.
  homePhoto: {
    src: '/images/enduro/enduro-berm-pink-jersey.jpg',
    alt: 'A young rider in a pink jersey and full-face helmet leans the bike hard through a dirt berm, kicking up dust.',
    width: 797,
    height: 1200,
  },
  // Home page photo collage. Real club photos. Randall confirmed media releases cover all of them (Nov 22, 2026). `small` is a 640px-wide
  // copy for phones. The hero photo is left out so it doesn't show twice. Order sets the layout
  // (see PhotoCollage.astro).
  // TODO(board): photo needed. Add a Jr. Flyers riding photo when one arrives, so every program shows.
  homeCollage: [
    {
      src: '/images/enduro/enduro-jump-chairlift.jpg',
      small: '/images/home/enduro-jump-chairlift-640.jpg',
      alt: 'A rider in a black and pink kit and full-face helmet sails off a dirt jump at a ski area while people on a chairlift and a crowd on the hillside watch.',
      width: 1200,
      height: 797,
    },
    {
      src: '/images/enduro/enduro-rock-drop.jpg',
      small: '/images/home/enduro-rock-drop-640.jpg',
      alt: 'A rider in a full-face helmet and orange goggles rolls off a red rock ledge on a dusty desert trail lined with juniper trees.',
      width: 797,
      height: 1200,
    },
    {
      src: '/images/xc/xc-slickrock.jpg',
      small: '/images/home/xc-slickrock-640.jpg',
      alt: 'A rider in a white helmet and red and black kit pedals a hardtail across slickrock with sagebrush and juniper trees behind.',
      width: 1024,
      height: 683,
    },
    {
      src: '/images/enduro-iron-springs.jpg',
      small: '/images/home/enduro-iron-springs-640.jpg',
      alt: 'A group of Flyers Enduro/Gravity riders in full-face helmets and black and pink jerseys stand with their bikes in front of race tents.',
      width: 1400,
      height: 1050,
    },
    {
      src: '/images/xc/xc-overlook-group.jpg',
      small: '/images/home/xc-overlook-group-640.jpg',
      alt: 'A Flyers XC group stands with their bikes on slickrock in front of a large sandstone boulder, with desert canyons and a blue sky behind them.',
      width: 1400,
      height: 788,
    },
    {
      src: '/images/enduro/enduro-berm-desert.jpg',
      small: '/images/home/enduro-berm-desert-640.jpg',
      alt: 'A rider in a pink and black jersey, chest protector, and goggles carves a sandy berm between juniper trees as people watch.',
      width: 1200,
      height: 797,
    },
    {
      src: '/images/coaches/head-coaches.jpg',
      small: '/images/home/head-coaches-640.jpg',
      alt: 'Jessie, Tim, and Randall standing together outdoors in Flyers shirts, with mountains behind them.',
      width: 1400,
      height: 788,
    },
  ],
  // Riders per program, from Randall (Nov 22, 2026). Shown on the home page.
  // TODO(board): update after each season, and add volunteer hours and families helped when known.
  impact: {
    season: '2026',
    riders: {
      'jr-flyers': 238,
      enduro: 73,
      xc: 20,
    },
  },
  // Enduro/Gravity has a minimum age. Shown on the Enduro/Gravity page, /register, and the FAQ.
  enduroMinimumAge: 10,
  contact: {
    email: 'info@lakemountainflyers.com',
    sponsorshipEmail: 'info@lakemountainflyers.com',
    location: 'Utah County, Utah',
  },
  integrations: {
    zeffyDonateUrl:
      'https://www.zeffy.com/en-US/donation-form/donate-to-fuel-the-ride?source=org-page',
    zeffySponsorUrl: 'https://www.zeffy.com/',
    zeffyShopUrl: 'https://www.zeffy.com/',
    voltKitStore: {
      vendor: 'Volt Cyclewear',
      status: 'seasonal' as 'open' | 'seasonal' | 'closed',
      // Confirmed by Randall (Nov 22, 2026): the store opens with registration and runs through Dec 15.
      windowLabel: 'Orders open Dec 1 to Dec 15',
      // TODO(board): the Volt Cyclewear order page. Until then the store page emails the club.
      url: '',
      notes:
        'Optional Flyers jerseys and Alpine Thermal layers, made by Volt Cyclewear. The store is open Dec 1 to Dec 15, so kits arrive before spring.',
    },
    googleCalendarEmbedUrl: '',
    sponsorFormEndpoint: import.meta.env.PUBLIC_SPONSOR_FORM_ENDPOINT || '',
  },
  socials: [
    {
      label: 'Instagram (@flyers_xc)',
      href: 'https://www.instagram.com/flyers_xc/',
    },
  ],
  legacyDomains: ['lakemountainflyers.com', 'flyersxc.com'],
  nicaPartners: [
    {
      name: 'Westlake Rolling Thunder',
      school: 'Westlake High School',
      city: 'Saratoga Springs, UT',
    },
    {
      name: 'Lehi MTB & Jr. Devo',
      school: 'Lehi High School',
      city: 'Lehi, UT',
    },
    {
      name: 'Cedar Valley MTB',
      school: 'Cedar Valley High School',
      city: 'Eagle Mountain, UT',
    },
    {
      name: 'Skyridge MTB',
      school: 'Skyridge High School',
      city: 'Lehi, UT',
    },
    {
      name: 'Lone Peak MTB',
      school: 'Lone Peak High School',
      city: 'Highland, UT',
    },
  ] satisfies NicaPartnerTeam[],
} as const;
