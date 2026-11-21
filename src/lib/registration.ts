import { siteConfig } from '../data/site';
import { formatEventDate } from './dates';
import type { RegistrationStatus } from './programs';
import { withBase } from './urls';

/** Which sign-up form a program uses. 'later' means it isn't open for registration yet. */
export type RegistrationForm = 'xc' | 'enduro' | 'later';
export type RegistrationFormLinks = Record<Exclude<RegistrationForm, 'later'>, string>;

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

/** The form link for a program, or '' if it isn't set yet. */
export function registrationFormUrl(
  form: RegistrationForm,
  links: RegistrationFormLinks = siteConfig.registration.forms,
): string {
  return form === 'later' ? '' : links[form].trim();
}

/** True once any program's form link is in site.ts. */
export function anyRegistrationOpen(
  links: RegistrationFormLinks = siteConfig.registration.forms,
): boolean {
  return Object.values(links).some((url) => url.trim() !== '');
}

/**
 * Where a program's "Register" button should go. Once its form link is in site.ts, the button
 * goes straight to the form. Until then it goes to /register, which explains when it opens.
 */
export function registrationCta(
  form: RegistrationForm,
  links: RegistrationFormLinks = siteConfig.registration.forms,
): RegistrationCta {
  if (form === 'later') {
    return {
      href: withBase('/register'),
      label: 'Registration opens later',
      external: false,
      isOpen: false,
    };
  }
  const url = registrationFormUrl(form, links);
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

/** A program marked "upcoming" shows as open once its form link is added. */
export function effectiveRegistrationStatus(
  status: RegistrationStatus,
  form: RegistrationForm,
  links: RegistrationFormLinks = siteConfig.registration.forms,
): RegistrationStatus {
  return status === 'upcoming' && registrationFormUrl(form, links) ? 'open' : status;
}
