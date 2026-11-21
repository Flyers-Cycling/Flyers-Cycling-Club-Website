import { describe, expect, it } from 'vitest';
import { matchProgramPathway } from '../../src/lib/pathway';

describe('matchProgramPathway', () => {
  it('recommends Flyers XC to riders in 7th grade and up who want endurance and longer rides', () => {
    const match = matchProgramPathway('7-plus', 'endurance');
    expect(match.primaryProgram).toBe('xc');
    expect(match.explanation).toContain('endurance');
  });

  it('recommends Flyers XC for riders between NICA seasons', () => {
    const match = matchProgramPathway('7-plus', 'nica-offseason');
    expect(match.primaryProgram).toBe('xc');
    expect(match.secondaryProgram).toBe('enduro');
    expect(match.nicaNote).toContain('school team');
  });

  it('recommends Flyers Enduro/Gravity with XC as a second program for gravity riders', () => {
    const match = matchProgramPathway('7-plus', 'gravity');
    expect(match.primaryProgram).toBe('enduro');
    expect(match.secondaryProgram).toBe('xc');
    expect(match.headline).toContain('Enduro/Gravity');
  });

  it('recommends Jr. Flyers for K–4 riders, with Enduro/Gravity as a later step for gravity fans', () => {
    expect(matchProgramPathway('k-4', 'fundamentals').primaryProgram).toBe('jr-flyers');
    const gravity = matchProgramPathway('k-4', 'gravity');
    expect(gravity.primaryProgram).toBe('jr-flyers');
    expect(gravity.secondaryProgram).toBe('enduro');
    expect(gravity.comboNote).toContain('10 and older');
  });

  it('points grades 5–6 endurance riders to Flyers XC as the next step', () => {
    const match = matchProgramPathway('5-6', 'endurance');
    expect(match.primaryProgram).toBe('jr-flyers');
    expect(match.secondaryProgram).toBe('xc');
  });

  it('recommends Flyers Enduro/Gravity for grades 5–6 gravity riders and states the minimum age', () => {
    const match = matchProgramPathway('5-6', 'gravity', 10);
    expect(match.primaryProgram).toBe('enduro');
    expect(match.comboNote).toContain('10 and older');
  });

  it('never mentions fees', () => {
    for (const band of ['k-4', '5-6', '7-plus'] as const) {
      for (const focus of ['fundamentals', 'endurance', 'gravity', 'nica-offseason'] as const) {
        const m = matchProgramPathway(band, focus);
        expect(`${m.explanation} ${m.comboNote}`).not.toMatch(/\$\d/);
      }
    }
  });
});
