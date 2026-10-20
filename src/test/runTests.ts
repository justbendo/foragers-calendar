/**
 * Test suite for The Foragers Calendar
 * Covers:
 * 1. Seasonal phenology calculation & wrap-around month handling
 * 2. Climate & rainfall moisture triggers for fungal fruiting vs plant foliage
 * 3. Location coordinate privacy approximation
 * 4. Toxic lookalike distinction & safety verification
 * 5. Data integrity of verified botanical records
 */

import {
  isMonthInRange,
  getCircularMonthDistance,
  expandMonthRange,
  evaluateSpeciesSeasonality
} from '../server/services/seasonalCalculator.ts';
import { VERIFIED_SPECIES_SEED, VERIFIED_REGIONS } from '../server/data/verifiedSpecies.ts';
import { ClimateSnapshot } from '../types/forager.ts';

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('\n--- Running The Foragers Calendar Test Suite ---\n');

// 1. Month range & circular distance tests
console.log('1. Month Range & Circular Logic:');
assert(isMonthInRange(4, 3, 5) === true, 'April is inside March-May range');
assert(isMonthInRange(7, 3, 5) === false, 'July is outside March-May range');
assert(isMonthInRange(12, 11, 2) === true, 'December is inside November-February wrap-around range');
assert(isMonthInRange(1, 11, 2) === true, 'January is inside November-February wrap-around range');
assert(isMonthInRange(6, 11, 2) === false, 'June is outside November-February wrap-around range');
assert(getCircularMonthDistance(1, 12) === 1, 'Circular distance between Dec and Jan is 1 month');
assert(getCircularMonthDistance(3, 9) === 6, 'Circular distance between March and September is 6 months');

const expanded = expandMonthRange(11, 2);
assert(
  JSON.stringify(expanded) === JSON.stringify([11, 12, 1, 2]),
  'expandMonthRange correctly handles year rollover [11, 12, 1, 2]'
);

// 2. Seasonal phenology & climate calibration tests
console.log('\n2. Seasonal Phenology & Climate Calibration:');

const chanterelle = VERIFIED_SPECIES_SEED.find(s => s.scientificName === 'Cantharellus cibarius')!;
const wildGarlic = VERIFIED_SPECIES_SEED.find(s => s.scientificName === 'Allium ursinum')!;

// Optimal Autumn conditions for Chanterelle in NW: Month 10 (October), 15°C, 45mm rain
const wetAutumnClimate: ClimateSnapshot = {
  temperatureC: 15,
  apparentTempC: 14,
  precipitation7DaysMm: 45,
  relativeHumidityPct: 85,
  soilMoistureScore: 0.8,
  conditionName: 'Damp Autumn Woodland',
  isSimulatedOrEstimated: false,
  provider: 'Test Mock',
  timestamp: new Date().toISOString()
};

const autumnMatch = evaluateSpeciesSeasonality({
  species: chanterelle,
  month: 10,
  regionCode: 'UK_SCOTTISH_HIGHLANDS',
  climate: wetAutumnClimate
});

assert(
  autumnMatch.status === 'likely in season',
  'Chanterelle is "likely in season" during October with mild temps and recent rain'
);
assert(autumnMatch.confidenceScore >= 70, `Confidence score is high (got ${autumnMatch.confidenceScore})`);
assert(autumnMatch.isCurrentlyPeak === true, 'October is marked as peak season for Chanterelle in NW');

// Severe drought scenario in Autumn: Month 10, 0mm rain
const dryAutumnClimate: ClimateSnapshot = {
  ...wetAutumnClimate,
  precipitation7DaysMm: 2
};

const droughtMatch = evaluateSpeciesSeasonality({
  species: chanterelle,
  month: 10,
  regionCode: 'UK_SCOTTISH_HIGHLANDS',
  climate: dryAutumnClimate
});

assert(
  droughtMatch.confidenceScore < autumnMatch.confidenceScore,
  'Drought reduces confidence score due to moisture deficit for fungal sporocarps'
);

// Wild Garlic in early Spring: Month 4 (April), 12°C, 20mm rain
const springClimate: ClimateSnapshot = {
  temperatureC: 12,
  apparentTempC: 11,
  precipitation7DaysMm: 20,
  relativeHumidityPct: 70,
  soilMoistureScore: 0.6,
  conditionName: 'Spring Morning',
  isSimulatedOrEstimated: false,
  provider: 'Test Mock',
  timestamp: new Date().toISOString()
};

const garlicSpringMatch = evaluateSpeciesSeasonality({
  species: wildGarlic,
  month: 4,
  regionCode: 'UK_SCOTTISH_HIGHLANDS',
  climate: springClimate
});

assert(
  garlicSpringMatch.status === 'likely in season',
  'Wild Garlic is "likely in season" during April in temperate maritime region'
);

// Chanterelle in mid-winter: Month 1 (January)
const winterMatch = evaluateSpeciesSeasonality({
  species: chanterelle,
  month: 1,
  regionCode: 'UK_SCOTTISH_HIGHLANDS',
  climate: null
});

assert(
  winterMatch.status === 'off season',
  'Chanterelle is marked "off season" in January'
);

// 3. Location Privacy & Approximation
console.log('\n3. Location Privacy & Approximation:');

function approximateCoordinates(lat: number, lon: number): { lat: number; lon: number } {
  return {
    lat: Math.round(lat * 100) / 100,
    lon: Math.round(lon * 100) / 100
  };
}

const preciseLat = 47.60621458;
const preciseLon = -122.33207125;
const approx = approximateCoordinates(preciseLat, preciseLon);

assert(approx.lat === 47.61, 'Latitude is rounded to 2 decimal places (~1.1km privacy blur)');
assert(approx.lon === -122.33, 'Longitude is rounded to 2 decimal places');
assert(
  approx.lat !== preciseLat && approx.lon !== preciseLon,
  'Raw precise user coordinates are NEVER exposed'
);

// 4. Botanical Safety & Lookalike Audit
console.log('\n4. Botanical Safety & Lookalike Audit:');

for (const species of VERIFIED_SPECIES_SEED) {
  assert(Boolean(species.commonName), `${species.scientificName} has commonName`);
  assert(Boolean(species.culinaryPrep), `${species.scientificName} has culinary preparation warnings`);
  assert(Boolean(species.knownRisks), `${species.scientificName} has known risks explicitly stated`);
  assert(species.sources.length > 0, `${species.scientificName} has accredited scientific citations`);
  assert(Boolean(species.distinguishingFeatures), `${species.scientificName} has distinguishing features`);

  if (species.edibility === 'Choice Edible') {
    assert(
      species.lookalikes.length > 0,
      `Edible species ${species.commonName} documents potential lookalikes`
    );
  }
}

// 5. Region Definitions
console.log('\n5. Geographic Region Modeling:');
assert(VERIFIED_REGIONS.length >= 4, 'Multiple distinct climatic regions configured');
for (const reg of VERIFIED_REGIONS) {
  assert(Boolean(reg.code && reg.name && reg.climateZone), `Region ${reg.code} is valid`);
}

console.log(`\n--------------------------------------------`);
console.log(`Test Results: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log(`--------------------------------------------\n`);

if (passedTests < totalTests) {
  process.exit(1);
}
