// Camp budget math. Fixed costs (condo, fun, supplies) are shared by everyone who comes,
// food scales with headcount, and a buffer covers price changes and late drop-outs.
// Everyone (rider or adult) pays the same flat rate, rounded up to the nearest $5.

export interface CampCost {
  label: string;
  amount: number;
}

export interface CampBudget {
  /** Costs that don't change with headcount. */
  fixedCosts: CampCost[];
  /** Food for the whole camp, per person. */
  foodPerPerson: number;
  /** Extra margin as a fraction of the subtotal, e.g. 0.1 for 10%. */
  bufferRate: number;
}

export interface CampTotals {
  fixed: number;
  food: number;
  buffer: number;
  total: number;
}

export function campTotals(budget: CampBudget, headcount: number): CampTotals {
  if (!Number.isInteger(headcount) || headcount <= 0) {
    throw new Error(`Headcount must be a positive whole number, got ${headcount}`);
  }
  const fixed = budget.fixedCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const food = budget.foodPerPerson * headcount;
  const buffer = Math.round((fixed + food) * budget.bufferRate);
  return { fixed, food, buffer, total: fixed + food + buffer };
}

/** Flat per-person price, rounded up to the nearest `roundTo` dollars. */
export function campPricePerPerson(budget: CampBudget, headcount: number, roundTo = 5): number {
  const { total } = campTotals(budget, headcount);
  return Math.ceil(total / headcount / roundTo) * roundTo;
}
