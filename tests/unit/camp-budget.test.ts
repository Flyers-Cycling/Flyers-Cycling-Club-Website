import { describe, expect, it } from 'vitest';
import { campPricePerPerson, campTotals } from '../../src/lib/camp-budget';
import { winterCamp, winterCampHeadcount } from '../../src/data/winter-camp';

describe('camp budget', () => {
  it('adds fixed costs, food per person, and a buffer', () => {
    const totals = campTotals(winterCamp.budget, 50);
    expect(totals.fixed).toBe(4600);
    expect(totals.food).toBe(3750);
    expect(totals.buffer).toBe(835);
    expect(totals.total).toBe(9185);
  });

  it('prices winter camp at $185 a person for the planned 50 people', () => {
    expect(winterCampHeadcount).toBe(50);
    expect(campPricePerPerson(winterCamp.budget, winterCampHeadcount)).toBe(185);
  });

  it('raises the price when fewer people sign up, because the condo cost is fixed', () => {
    const prices = [50, 45, 40, 35].map((n) => campPricePerPerson(winterCamp.budget, n));
    expect(prices).toEqual([185, 195, 210, 230]);
  });

  it('stays under the advertised maximum at the planned rider count', () => {
    expect(campPricePerPerson(winterCamp.budget, winterCamp.plannedRiders)).toBeLessThanOrEqual(
      winterCamp.maxPricePerPerson,
    );
  });

  it('rejects a headcount that is not a positive whole number', () => {
    expect(() => campTotals(winterCamp.budget, 0)).toThrow(/positive/);
  });
});
