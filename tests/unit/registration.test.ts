import { describe, expect, it } from 'vitest';
import { effectiveRegistrationStatus, registrationCta } from '../../src/lib/registration';

describe('registrationCta', () => {
  it('points to /register with the open date until the form link is set', () => {
    const cta = registrationCta(true, '');
    expect(cta.isOpen).toBe(false);
    expect(cta.href).toMatch(/\/register$/);
    expect(cta.label).toBe('Registration opens Tue, Dec 1');
  });

  it('goes straight to the form once the link is set', () => {
    const cta = registrationCta(true, 'https://example.org/form');
    expect(cta).toMatchObject({ isOpen: true, external: true, href: 'https://example.org/form' });
  });

  it('says "opens later" for a program outside the season form (Jr. Flyers)', () => {
    const cta = registrationCta(false, 'https://example.org/form');
    expect(cta.isOpen).toBe(false);
    expect(cta.label).toBe('Registration opens later');
    expect(effectiveRegistrationStatus('upcoming', false, 'https://example.org/form')).toBe(
      'upcoming',
    );
    expect(effectiveRegistrationStatus('upcoming', true, 'https://example.org/form')).toBe('open');
  });
});
