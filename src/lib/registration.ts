import { siteConfig } from '../data/site';
import { formatEventDate } from './dates';
import type { RegistrationStatus } from './programs';
import { withBase } from './urls';

export interface RegistrationCta {
  href: string;
  label: string;
  external: boolean;
  isOpen: boolean;
}

/** "Tue, Dec 1": the registration open date without the year. */
export function registrationOpensLabel(opensDate: string = siteConfig.registration.opensDate) {
  return formatEventDate(opensDate).replace(/, \d{4}$/, '');
}

/**
 * Where a "Register" button should go. Once the form link is in site.ts, buttons go straight
 * to the form. Until then they go to /register, which explains when registration opens.
 */
export function registrationCta(
  inSeasonRegistration = true,
  formUrl: string = siteConfig.registration.formUrl,
): RegistrationCta {
  if (!inSeasonRegistration) {
    return {
      href: withBase('/register'),
      label: 'Registration opens later',
      external: false,
      isOpen: false,
    };
  }
  const url = formUrl.trim();
  if (url) {
    return { href: url, label: 'Register now', external: true, isOpen: true };
  }
  return {
    href: withBase('/register'),
    label: `Registration opens ${registrationOpensLabel()}`,
    external: false,
    isOpen: false,
  };
}

/** A program marked "upcoming" shows as open once the season's form link is added. */
export function effectiveRegistrationStatus(
  status: RegistrationStatus,
  inSeasonRegistration = true,
  formUrl: string = siteConfig.registration.formUrl,
): RegistrationStatus {
  return inSeasonRegistration && status === 'upcoming' && formUrl.trim() ? 'open' : status;
}
