import { describe, expect, it } from 'vitest';
import { raceEnds, upcomingRaces } from '../../src/lib/races';

describe('race schedules', () => {
  const races = [
    { name: 'later', date: '2027-05-22', location: 'Beaver, UT' },
    { name: 'tbd', dateLabel: '2027 date not announced yet.', location: 'Midway, UT' },
    { name: 'past', date: '2026-05-16', location: 'Cedar City, UT' },
    { name: 'sooner', date: '2027-02-27', location: 'St. George, UT' },
  ];

  it('drops past races, sorts the rest, and keeps undated races last', () => {
    expect(upcomingRaces(races, '2026-11-22').map((r) => r.name)).toEqual([
      'sooner',
      'later',
      'tbd',
    ]);
  });

  it('keeps a race through its last day', () => {
    const weekend = [{ name: 'fest', date: '2027-06-25', endDate: '2027-06-27', location: 'x' }];
    expect(upcomingRaces(weekend, '2027-06-27')).toHaveLength(1);
    expect(upcomingRaces(weekend, '2027-06-28')).toHaveLength(0);
    expect(raceEnds(weekend[0])).toBe('2027-06-27');
  });

  it('has no end day for a race without a date', () => {
    expect(raceEnds(races[1])).toBeUndefined();
  });
});
