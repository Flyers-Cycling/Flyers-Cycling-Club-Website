export type RegistrationStatus = 'open' | 'upcoming' | 'waitlist' | 'closed';
export type ProgramAccent = 'xc' | 'enduro' | 'jr';

export interface StatusBadgeMeta {
  label: string;
  badgeClass: string;
  dotClass: string;
  ctaLabel: string;
}

export function getRegistrationStatusMeta(status: RegistrationStatus): StatusBadgeMeta {
  switch (status) {
    case 'open':
      return {
        label: 'Registration Open',
        badgeClass: 'bg-emerald-50 text-emerald-950 border-emerald-300',
        dotClass: 'bg-emerald-600',
        ctaLabel: 'Register Now',
      };
    case 'upcoming':
      return {
        label: 'Opening Soon',
        badgeClass: 'bg-flyers-gold-light text-flyers-gold-ink border-flyers-gold',
        dotClass: 'bg-flyers-gold-deep',
        ctaLabel: 'Join Interest List',
      };
    case 'waitlist':
      return {
        label: 'Waitlist Open',
        badgeClass: 'bg-flyers-slate-light text-flyers-slate-dark border-flyers-slate/25',
        dotClass: 'bg-flyers-slate',
        ctaLabel: 'Join Waitlist',
      };
    case 'closed':
      return {
        label: 'In Season / Closed',
        badgeClass: 'bg-neutral-100 text-neutral-800 border-neutral-300',
        dotClass: 'bg-neutral-500',
        ctaLabel: 'Contact Program Leads',
      };
  }
}

/** The value a wrapper puts in `data-program` to pick up a program's colors (global.css). */
export type ProgramTheme = 'club' | 'xc' | 'enduro' | 'jr-flyers';

/**
 * Maps a program, event, or sponsor key to its color theme. Accepts the content keys used across
 * collections ('xc', 'enduro', 'jr', 'jr-flyers', 'all', 'xc-devo', ...). Unknown keys use the club
 * colors.
 */
export function programTheme(key: string | undefined): ProgramTheme {
  if (!key) return 'club';
  if (key === 'xc' || key.startsWith('xc-')) return 'xc';
  if (key === 'enduro') return 'enduro';
  if (key === 'jr' || key === 'jr-flyers') return 'jr-flyers';
  return 'club';
}

/**
 * Classes that read the program theme. Put them inside an element with `data-program` set.
 * Every program uses the same classes; only the CSS variables change.
 */
export const programClasses = {
  badge: 'bg-program-soft text-program-ink border-program-accent/40',
  hoverBorder: 'hover:border-program-accent',
  bar: 'bg-program-accent',
  darkPill: 'bg-program-accent/20 text-program-on-dark border-program-accent/60',
  button: 'bg-program text-white hover:bg-program-hover',
  link: 'text-program-ink font-bold underline',
} as const;
