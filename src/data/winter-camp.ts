// Facts for the winter camp page (/winter-camp). Change camp details here, not in the page.
// The budget below is the board's planning estimate and isn't shown on the page; the page
// shows only maxPricePerPerson.
// Costs are the club's planning estimates, not quotes. Food assumes a volunteer cook crew
// buying in bulk: about $4 per breakfast, $6 per trail lunch, $10 per dinner, and $6 a day
// for snacks and electrolytes, plus 10% for big appetites.
import type { CampBudget } from '../lib/camp-budget';

export const winterCamp = {
  startDate: '2027-01-15',
  endDate: '2027-01-18',
  location: 'St. George, Utah',
  arrival: 'Friday, 7–9 PM',
  departure: 'Monday, on the road by about 2 PM',
  /** The schedule entry for camp (src/content/events/). */
  eventId: '07-winter-camp',
  /** Programs whose riders can come. */
  programs: ['xc', 'enduro'] as const,
  eligibility: 'Flyers XC and Flyers Enduro riders, ages 10–18, plus college racers',

  plannedRiders: 35,
  plannedAdults: 15,
  /** The most anyone will pay. The final price depends on headcount and is set after the deposit deadline. */
  maxPricePerPerson: 250,

  deposit: 100,
  depositDueDate: '2026-12-15',
  balanceDueDate: '2027-01-05',

  // TODO(board): add the real registration link (Zeffy or similar) when it's ready.
  // Leave this empty until then; the page shows "registration opens soon".
  registrationUrl: '',

  budget: {
    fixedCosts: [
      { label: 'Condo for 3 nights (taxes and cleaning included)', amount: 4000 },
      { label: 'Raffle prizes and awards', amount: 200 },
      { label: 'Movie and game night snacks', amount: 150 },
      { label: 'Supplies: paper goods, kitchen basics, first-aid restock', amount: 250 },
    ],
    foodPerPerson: 75,
    bufferRate: 0.1,
  } satisfies CampBudget,
};

export const winterCampHeadcount = winterCamp.plannedRiders + winterCamp.plannedAdults;
