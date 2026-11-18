// Events are calendar days in Utah. An event stays "upcoming" through its last day
// (endDate, or startDate for one-day events) and drops off the site the day after.
//
// The site is static, so pages filter at build time (and the deploy workflow rebuilds
// daily). Each event card also carries `data-event-ends`, and a small script in
// BaseLayout hides any card whose last day has passed, in case a rebuild is missed.

export const CLUB_TIME_ZONE = 'America/Denver';

export interface DatedEvent {
  startDate: string;
  endDate?: string;
}

const isoDateInClubZone = new Intl.DateTimeFormat('en-CA', {
  timeZone: CLUB_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Today's date in Utah as "YYYY-MM-DD". */
export function todayInUtah(now: Date = new Date()): string {
  return isoDateInClubZone.format(now);
}

/** The last calendar day of an event. */
export function eventEnds(event: DatedEvent): string {
  return event.endDate ?? event.startDate;
}

/** True through the event's last day. ISO dates compare correctly as strings. */
export function isUpcoming(event: DatedEvent, today: string = todayInUtah()): boolean {
  return eventEnds(event) >= today;
}

/** Upcoming events, soonest first. */
export function upcomingEvents<T extends { data: DatedEvent }>(
  events: T[],
  today: string = todayInUtah(),
): T[] {
  return events
    .filter((event) => isUpcoming(event.data, today))
    .sort((a, b) => a.data.startDate.localeCompare(b.data.startDate));
}
