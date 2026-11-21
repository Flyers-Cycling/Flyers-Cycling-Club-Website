// Grade bands shown in the program finder. Values are stable IDs; labels live in the component.
//   'k-4'    → Kindergarten–4th grade (Jr. Flyers)
//   '5-6'    → 5th–6th grade (Jr. Flyers; Flyers XC at the coaches' discretion, usually advanced
//              riders who want to race; Enduro/Gravity from age 10)
//   '7-plus' → 7th grade and up (Flyers XC Devo or Comp, and Flyers Enduro/Gravity)
export type AgeBand = 'k-4' | '5-6' | '7-plus';
export type RidingFocus = 'xc-devo' | 'xc-comp' | 'gravity' | 'fundamentals';
/** Where a recommendation points: a program, or one of the two Flyers XC groups. */
export type ProgramSlug = 'xc-devo' | 'xc-comp' | 'enduro' | 'jr-flyers';

export interface PathwayRecommendation {
  primaryProgram: ProgramSlug;
  secondaryProgram?: ProgramSlug;
  headline: string;
  explanation: string;
  /** How this rider could combine programs. Riders can join more than one. */
  comboNote: string;
  nicaNote: string;
}

const DEVO =
  'Flyers XC Devo is for riders who want to ride, build skills, and have fun, with less focus on racing.';
const COMP =
  'Flyers XC Comp is for riders who want to race competitively, with structured training and race prep for Utah XC races.';

export function matchProgramPathway(
  ageBand: AgeBand,
  focus: RidingFocus,
  enduroMinimumAge = 10,
): PathwayRecommendation {
  const enduroAge = `Flyers Enduro/Gravity is open to riders ${enduroMinimumAge} and older.`;

  if (ageBand === 'k-4') {
    return {
      primaryProgram: 'jr-flyers',
      secondaryProgram: focus === 'gravity' ? 'enduro' : undefined,
      headline: 'Start with Jr. Flyers',
      explanation:
        focus === 'gravity'
          ? 'Jr. Flyers (June–August) builds the braking, cornering, and balance skills every descender needs.'
          : 'Jr. Flyers is a summer program (June–August) for kids who can ride a two-wheeler. Small groups play skill games, learn to brake and shift, and ride beginner singletrack together.',
      comboNote: `${enduroAge} Jr. Flyers riders can add it once they're old enough.`,
      nicaNote: 'A fun first step before Flyers XC, Flyers Enduro/Gravity, or a NICA team.',
    };
  }

  if (ageBand === '5-6') {
    if (focus === 'gravity') {
      return {
        primaryProgram: 'enduro',
        secondaryProgram: 'jr-flyers',
        headline: 'Try Flyers Enduro/Gravity',
        explanation:
          'For riders who already ride singletrack with confidence. Flyers Enduro/Gravity (January–August) coaches braking, cornering, drops, and line choice, with optional enduro races.',
        comboNote: `${enduroAge} Many riders do Jr. Flyers in the summer too.`,
        nicaNote: 'Strong bike handling carries into Flyers XC and NICA racing.',
      };
    }

    if (focus === 'xc-comp') {
      return {
        primaryProgram: 'xc-comp',
        secondaryProgram: 'jr-flyers',
        headline: 'Try Flyers XC Comp',
        explanation: `${COMP} Riders before 7th grade join at the coaches’ discretion, usually advanced riders who want to race.`,
        comboNote: `Riders can add Flyers Enduro/Gravity too. ${enduroAge}`,
        nicaNote: 'Winter-to-summer racing that builds fitness before middle school NICA.',
      };
    }

    return {
      primaryProgram: 'jr-flyers',
      secondaryProgram: focus === 'xc-devo' ? 'xc-devo' : 'enduro',
      headline: 'Start with Jr. Flyers',
      explanation:
        focus === 'xc-devo'
          ? 'Jr. Flyers is the best place for 5th and 6th graders to ride and build skills. Flyers XC Devo is open from 7th grade.'
          : 'Jr. Flyers is a relaxed place to build trail basics with friends, with skill games and beginner singletrack all summer.',
      comboNote: `${enduroAge} Riders can do it alongside Jr. Flyers.`,
      nicaNote: 'Good preparation for Flyers XC and NICA.',
    };
  }

  // 7th grade and up
  if (focus === 'gravity') {
    return {
      primaryProgram: 'enduro',
      secondaryProgram: 'xc-devo',
      headline: 'Try Flyers Enduro/Gravity',
      explanation:
        'Flyers Enduro/Gravity (January–August) is for riders who love technical descents: bike setup, line choice, track walks, and support at enduro races.',
      comboNote: 'Many riders add Flyers XC to keep their climbing fitness up.',
      nicaNote: 'Better descending skills carry straight into fall NICA racing.',
    };
  }

  if (focus === 'xc-comp') {
    return {
      primaryProgram: 'xc-comp',
      secondaryProgram: 'enduro',
      headline: 'Try Flyers XC Comp',
      explanation: COMP,
      comboNote: 'Riders can add Flyers Enduro/Gravity to work on descending too.',
      nicaNote: 'Winter-to-summer racing that fits around your fall school team.',
    };
  }

  return {
    primaryProgram: 'xc-devo',
    secondaryProgram: 'enduro',
    headline: 'Try Flyers XC Devo',
    explanation:
      focus === 'fundamentals'
        ? `${DEVO} Newer riders are welcome. Racing is optional.`
        : `${DEVO} Racing is optional.`,
    comboNote: 'Riders can add Flyers Enduro/Gravity to work on descending too.',
    nicaNote: 'Winter-to-summer riding that fits around your fall school team.',
  };
}
