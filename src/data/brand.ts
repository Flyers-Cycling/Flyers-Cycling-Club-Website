// Brand facts shown on /brand. Source: the club's Brand Book (Google Doc, v1.1) and docs/brand.md.
// Hex values must match the tokens in src/styles/global.css.

export interface BrandColor {
  name: string;
  hex: string;
  token: string;
  use: string;
}

export const brand = {
  tagline: 'Fast Follows Fun',
  personality: 'Bold, energetic, welcoming, progression-minded, and community-first.',
  coreColors: [
    {
      name: 'Red',
      hex: '#DA4444',
      token: 'flyers-red-signature',
      use: 'The club signature. Underlines, large headlines, highlights.',
    },
    {
      name: 'Button red',
      hex: '#B81E1E',
      token: 'flyers-red',
      use: 'Buttons and small red text. Passes contrast with white text.',
    },
    {
      name: 'Vivid red',
      hex: '#D12323',
      token: 'flyers-red-bright',
      use: 'Hover states and emphasis.',
    },
    {
      name: 'Black',
      hex: '#14242E',
      token: 'flyers-slate-dark',
      use: 'Dark backgrounds, and text on light backgrounds.',
    },
    {
      name: 'Slate',
      hex: '#203746',
      token: 'flyers-slate',
      use: 'Menus, accent text, buttons.',
    },
    {
      name: 'Gold',
      hex: '#F4CE50',
      token: 'flyers-gold',
      use: 'Callouts and buttons on dark backgrounds. Never text on white.',
    },
    {
      name: 'Light gray',
      hex: '#DCDCDC',
      token: 'flyers-gray-light',
      use: 'Secondary text and captions on dark.',
    },
    { name: 'White', hex: '#FFFFFF', token: 'white', use: 'Headlines and body text on black.' },
  ] satisfies BrandColor[],
  programColors: [
    {
      name: 'Flyers XC: red',
      hex: '#DA4444',
      token: 'flyers-red-signature',
      use: 'Flyers XC, XC Devo, and XC Comp. Buttons use button red.',
    },
    {
      name: 'Flyers Enduro/Gravity: Enduro Pink',
      hex: '#FE6CD0',
      token: 'flyers-pink',
      use: 'Pops on black. Behind white text use #B8125F.',
    },
    {
      name: 'Jr. Flyers: Youth Blue',
      hex: '#1E88E5',
      token: 'flyers-blue',
      use: 'Accents and bars. Behind white text use #1565C0.',
    },
  ] satisfies BrandColor[],
  logos: [
    {
      name: 'Flyers logo, black',
      file: 'flyers-logo-black',
      onDark: false,
      use: 'Light backgrounds and print.',
    },
    {
      name: 'Flyers logo, white',
      file: 'flyers-logo-white',
      onDark: true,
      use: 'Black backgrounds and photos.',
    },
    {
      name: 'Mountain symbol, red',
      file: 'flyers-symbol-red',
      onDark: false,
      use: 'Icons, favicons, stickers.',
    },
    {
      name: 'Mountain symbol, black',
      file: 'flyers-symbol-black',
      onDark: false,
      use: 'One-color print on light backgrounds.',
    },
    {
      name: 'Mountain symbol, white',
      file: 'flyers-symbol-white',
      onDark: true,
      use: 'One-color use on black or photos.',
    },
  ],
  weAre: [
    'Warm and welcoming to every level, from first-time riders to podium chasers',
    'Encouraging and focused on progress. We celebrate effort.',
    'Energetic and playful',
    'Clear and plain-spoken',
    'Community-first ("we", "our team")',
  ],
  weAreNot: [
    'Elitist or intimidating',
    'Pushy about results',
    'Corporate or stiff',
    'Full of jargon',
    'All about the individual',
  ],
} as const;
