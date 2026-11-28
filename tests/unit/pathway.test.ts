import { describe, expect, it } from 'vitest';
import { matchProgramPathway } from '../../src/lib/pathway';

describe('matchProgramPathway', () => {
  it('recommends Flyers XC Devo to 7th grade and up riders who want to ride with less focus on racing', () => {
    const match = matchProgramPathway('7-plus', 'xc-devo');
    expect(match.primaryProgram).toBe('xc-devo');
    expect(match.headline).toBe('Try Flyers XC Devo');
    expect(match.explanation).toContain('less focus on racing');
  });

  it('recommends Flyers XC Comp to riders who want to race competitively', () => {
    const match = matchProgramPathway('7-plus', 'xc-comp');
    expect(match.primaryProgram).toBe('xc-comp');
    expect(match.headline).toBe('Try Flyers XC Comp');
    expect(match.nicaNote).toContain('school team');
  });

  it('recommends Flyers Enduro/Gravity with XC as a second program for gravity riders', () => {
    const match = matchProgramPathway('7-plus', 'gravity');
    expect(match.primaryProgram).toBe('enduro');
    expect(match.secondaryProgram).toBe('xc-devo');
    expect(match.headline).toContain('Enduro/Gravity');
  });

  it('recommends Jr. Flyers for K–4 riders, with Enduro/Gravity as a later step for gravity fans', () => {
    expect(matchProgramPathway('k-4', 'fundamentals').primaryProgram).toBe('jr-flyers');
    const gravity = matchProgramPathway('k-4', 'gravity');
    expect(gravity.primaryProgram).toBe('jr-flyers');
    expect(gravity.secondaryProgram).toBe('enduro');
    expect(gravity.comboNote).toContain('10 and older');
  });

  it('recommends Flyers XC Comp to 5th–6th graders who want to race, with coach approval', () => {
    const match = matchProgramPathway('5-6', 'xc-comp');
    expect(match.primaryProgram).toBe('xc-comp');
    expect(match.explanation).toContain('accepted by a coach');
  });

  it('recommends Flyers Enduro/Gravity for grades 5–6 gravity riders and states the minimum age', () => {
    const match = matchProgramPathway('5-6', 'gravity', 10);
    expect(match.primaryProgram).toBe('enduro');
    expect(match.comboNote).toContain('10 and older');
  });

  it('never mentions fees', () => {
    for (const band of ['k-4', '5-6', '7-plus'] as const) {
      for (const focus of ['fundamentals', 'xc-devo', 'xc-comp', 'gravity'] as const) {
        const m = matchProgramPathway(band, focus);
        expect(`${m.explanation} ${m.comboNote}`).not.toMatch(/\$\d/);
      }
    }
  });
});
