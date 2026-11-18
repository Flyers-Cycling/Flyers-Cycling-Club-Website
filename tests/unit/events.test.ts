import { describe, expect, it } from 'vitest';
import { eventEnds, isUpcoming, todayInUtah, upcomingEvents } from '../../src/lib/events';

describe('upcoming events', () => {
  it('keeps an event through its last day and drops it the day after', () => {
    const oneDay = { startDate: '2027-01-16' };
    expect(isUpcoming(oneDay, '2027-01-15')).toBe(true);
    expect(isUpcoming(oneDay, '2027-01-16')).toBe(true);
    expect(isUpcoming(oneDay, '2027-01-17')).toBe(false);
  });

  it('uses the end date for multi-day events', () => {
    const window = { startDate: '2026-12-01', endDate: '2027-01-25' };
    expect(eventEnds(window)).toBe('2027-01-25');
    expect(isUpcoming(window, '2027-01-10')).toBe(true);
    expect(isUpcoming(window, '2027-01-26')).toBe(false);
  });

  it('filters past events and sorts the rest soonest first', () => {
    const events = [
      { id: 'c', data: { startDate: '2027-04-10' } },
      { id: 'past', data: { startDate: '2026-10-01' } },
      { id: 'a', data: { startDate: '2026-12-01', endDate: '2027-01-25' } },
      { id: 'b', data: { startDate: '2027-01-16' } },
    ];
    expect(upcomingEvents(events, '2026-11-09').map((e) => e.id)).toEqual(['a', 'b', 'c']);
  });

  it("uses Utah's date, not UTC", () => {
    // 11 PM Mountain Time on Jan 16 is already Jan 17 in UTC.
    expect(todayInUtah(new Date('2027-01-17T06:00:00Z'))).toBe('2027-01-16');
  });
});
