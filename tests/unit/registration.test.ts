import { describe, expect, it } from 'vitest';
import {
  anyRegistrationOpen,
  effectiveRegistrationStatus,
  liveFormLinks,
  registrationCta,
} from '../../src/lib/registration';

const none = { xc: '', enduro: '' };
const xcOnly = { xc: 'https://example.org/xc', enduro: '' };

describe('registrationCta', () => {
  it('points to /register with the open date until the form link is set', () => {
    const cta = registrationCta('xc', none);
    expect(cta.isOpen).toBe(false);
    expect(cta.href).toMatch(/\/register$/);
    expect(cta.label).toBe('Registration opens Tue, Dec 1');
  });

  it('uses each program’s own form (Enduro/Gravity has a separate one)', () => {
    expect(registrationCta('xc', xcOnly)).toMatchObject({
      isOpen: true,
      external: true,
      href: 'https://example.org/xc',
    });
    expect(registrationCta('enduro', xcOnly).isOpen).toBe(false);
    expect(effectiveRegistrationStatus('upcoming', 'xc', xcOnly)).toBe('open');
    expect(effectiveRegistrationStatus('upcoming', 'enduro', xcOnly)).toBe('upcoming');
    expect(anyRegistrationOpen(xcOnly)).toBe(true);
    expect(anyRegistrationOpen(none)).toBe(false);
  });

  it('says "opens later" for a program that registers later (Jr. Flyers)', () => {
    const cta = registrationCta('later', xcOnly);
    expect(cta.isOpen).toBe(false);
    expect(cta.label).toBe('Registration opens later');
    expect(effectiveRegistrationStatus('upcoming', 'later', xcOnly)).toBe('upcoming');
  });
});

describe('liveFormLinks', () => {
  const both = { xc: 'https://example.org/xc', enduro: 'https://example.org/enduro' };

  it('hides every link before the open date (Utah time)', () => {
    expect(liveFormLinks(both, '2026-12-01', '2026-11-30')).toEqual(none);
  });

  it('shows the links from the open date on', () => {
    expect(liveFormLinks(both, '2026-12-01', '2026-12-01')).toEqual(both);
    expect(liveFormLinks(both, '2026-12-01', '2027-01-15')).toEqual(both);
  });
});
