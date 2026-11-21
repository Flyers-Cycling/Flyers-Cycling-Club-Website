import { describe, expect, it } from 'vitest';
import { programTheme } from '../../src/lib/programs';

describe('programTheme', () => {
  it('maps each program key to its color theme', () => {
    expect(programTheme('xc')).toBe('xc');
    expect(programTheme('xc-devo')).toBe('xc');
    expect(programTheme('xc-comp')).toBe('xc');
    expect(programTheme('enduro')).toBe('enduro');
    expect(programTheme('jr')).toBe('jr-flyers');
    expect(programTheme('jr-flyers')).toBe('jr-flyers');
  });

  it('uses the club colors for club-wide and unknown keys', () => {
    expect(programTheme('all')).toBe('club');
    expect(programTheme('community')).toBe('club');
    expect(programTheme(undefined)).toBe('club');
  });
});
