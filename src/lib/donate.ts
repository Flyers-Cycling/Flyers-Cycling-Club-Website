import { siteConfig } from '../data/site';
import { isPlaceholderUrl } from './urls';

/**
 * Where a "Donate" button should go. Uses the Zeffy form once it's set in siteConfig. Until then
 * it opens an email to the club, so the button never lands on a bare zeffy.com page.
 */
export function donateLink(): { href: string; external: boolean; label: string } {
  const url = siteConfig.integrations.zeffyDonateUrl;
  if (!isPlaceholderUrl(url)) {
    return { href: url, external: true, label: 'Donate on Zeffy' };
  }
  return {
    href: `mailto:${siteConfig.contact.email}?subject=Donating%20to%20Flyers`,
    external: false,
    label: 'Email us to donate',
  };
}
