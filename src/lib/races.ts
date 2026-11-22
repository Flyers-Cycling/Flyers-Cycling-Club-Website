// Race schedules: which races to show, in what order. Dated races drop off the day after
// they finish, like events. Races without a date yet (TBD) stay on the list, after the dated ones.

import { isUpcoming, todayInUtah } from './events';

export interface Race {
  name: string;
  date?: string;
  endDate?: string;
  dateLabel?: string;
  location: string;
}

/** The last day of a dated race, or undefined when the date isn't out yet. */
export function raceEnds(race: Race): string | undefined {
  return race.date ? (race.endDate ?? race.date) : undefined;
}

/** Upcoming races soonest first, then races with no date yet in their listed order. */
export function upcomingRaces<T extends Race>(races: T[], today: string = todayInUtah()): T[] {
  const dated = races
    .filter(
      (race) => race.date && isUpcoming({ startDate: race.date, endDate: race.endDate }, today),
    )
    .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
  const undated = races.filter((race) => !race.date);
  return [...dated, ...undated];
}
