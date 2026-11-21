// Grade bands shown in the program finder. Values are stable IDs; labels live in the component.
//   'k-4'    → Kindergarten–4th grade (Jr. Flyers)
//   '5-6'    → 5th–6th grade (Jr. Flyers, and Flyers Enduro/Gravity from age 10)
//   '7-plus' → 7th grade and up (Flyers XC and Flyers Enduro/Gravity)
export type AgeBand = 'k-4' | '5-6' | '7-plus';
export type RidingFocus = 'fundamentals' | 'endurance' | 'gravity' | 'nica-offseason';
export type ProgramSlug = 'xc' | 'enduro' | 'jr-flyers';

export interface PathwayRecommendation {
  primaryProgram: ProgramSlug;
  secondaryProgram?: ProgramSlug;
  headline: string;
  explanation: string;
  /** How this rider could combine programs. Riders can join more than one. */
  comboNote: string;
  nicaNote: string;
}

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
        nicaNote:
          'Strong bike handling helps riders when they join Flyers XC or NICA in 7th grade.',
      };
    }

    return {
      primaryProgram: 'jr-flyers',
      secondaryProgram: focus === 'endurance' ? 'xc' : 'enduro',
      headline: 'Start with Jr. Flyers',
      explanation:
        focus === 'endurance'
          ? 'Jr. Flyers builds the trail skills and fitness for longer rides. Flyers XC, our endurance program, starts in 7th grade.'
          : 'Jr. Flyers is a relaxed place to build trail basics with friends, with skill games and beginner singletrack all summer.',
      comboNote: `${enduroAge} Riders can do it alongside Jr. Flyers.`,
      nicaNote: 'Good preparation for Flyers XC and NICA, which start in 7th grade.',
    };
  }

  // 7th grade and up
  if (focus === 'gravity') {
    return {
      primaryProgram: 'enduro',
      secondaryProgram: 'xc',
      headline: 'Try Flyers Enduro/Gravity',
      explanation:
        'Flyers Enduro/Gravity (January–August) is for riders who love technical descents: bike setup, line choice, track walks, and support at enduro races.',
      comboNote: 'Many riders add Flyers XC to keep their climbing fitness up.',
      nicaNote: 'Better descending skills carry straight into fall NICA racing.',
    };
  }

  const explanation: Record<Exclude<RidingFocus, 'gravity'>, string> = {
    endurance:
      'Flyers XC is our endurance program. Winter base rides, spring race prep, and summer mountain rides build fitness for longer days on the bike. Racing is optional.',
    'nica-offseason':
      'Flyers XC rides once a week in winter, once or twice a week in spring, and on select summer Saturdays. It’s scheduled around the fall NICA season so riders stay fit and sharp all year.',
    fundamentals:
      'Riders are grouped by pace and skill, so newer riders building trail confidence and experienced racers both have a place. Racing is optional.',
  };

  return {
    primaryProgram: 'xc',
    secondaryProgram: 'enduro',
    headline: 'Try Flyers XC',
    explanation: explanation[focus],
    comboNote: 'Riders can add Flyers Enduro/Gravity to work on descending too.',
    nicaNote:
      focus === 'nica-offseason'
        ? 'Designed to fit alongside your fall school team, not replace it.'
        : 'Winter-to-summer riding that fits around your fall school team.',
  };
}
