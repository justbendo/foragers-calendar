import {
  SpeciesRecord,
  SpeciesSeasonalMatch,
  SeasonalConfidence,
  ClimateSnapshot,
  SeasonalRange
} from '../../types/forager.ts';

/**
 * Normalizes month checking including wrap-around intervals (e.g. Nov -> Feb: 11, 12, 1, 2)
 */
export function isMonthInRange(month: number, start: number, end: number): boolean {
  if (start <= end) {
    return month >= start && month <= end;
  }
  // Wrap-around case (e.g., Nov to Feb: start=11, end=2)
  return month >= start || month <= end;
}

/**
 * Calculates month distance in circular 12-month calendar
 */
export function getCircularMonthDistance(m1: number, m2: number): number {
  const diff = Math.abs(m1 - m2);
  return Math.min(diff, 12 - diff);
}

/**
 * Returns array of active months handling wrap-around
 */
export function expandMonthRange(start: number, end: number): number[] {
  const months: number[] = [];
  let curr = start;
  while (true) {
    months.push(curr);
    if (curr === end) break;
    curr = curr === 12 ? 1 : curr + 1;
    if (months.length > 12) break; // safety
  }
  return months;
}

export interface SeasonalEvaluationInput {
  species: SpeciesRecord;
  month: number; // 1-12
  regionCode?: string;
  climate?: ClimateSnapshot | null;
}

/**
 * Core scientific evaluation of whether a species may be in season
 * Never asserts certainty; strictly computes probabilistic phenological windows.
 */
export function evaluateSpeciesSeasonality(input: SeasonalEvaluationInput): SpeciesSeasonalMatch {
  const { species, month, regionCode = 'GLOBAL', climate } = input;

  // 1. Find best matching seasonal range: regional first, then GLOBAL
  const matchedRange: SeasonalRange =
    species.seasonalRanges.find(r => r.regionCode === regionCode) ||
    species.seasonalRanges.find(r => r.regionCode === 'GLOBAL') ||
    species.seasonalRanges[0];

  const inActiveWindow = isMonthInRange(month, matchedRange.startMonth, matchedRange.endMonth);
  const inPeakWindow = isMonthInRange(month, matchedRange.peakMonthStart, matchedRange.peakMonthEnd);

  const activeMonths = expandMonthRange(matchedRange.startMonth, matchedRange.endMonth);
  const peakMonths = expandMonthRange(matchedRange.peakMonthStart, matchedRange.peakMonthEnd);

  let confidenceScore = 0;
  const rationale: string[] = [];

  if (inPeakWindow) {
    confidenceScore += 55;
    rationale.push(`Current month falls squarely in documented historical peak harvest window (${matchedRange.peakMonthStart}-${matchedRange.peakMonthEnd}).`);
  } else if (inActiveWindow) {
    confidenceScore += 35;
    rationale.push(`Within observed peripheral seasonal window (${matchedRange.startMonth}-${matchedRange.endMonth}), outside median peak.`);
  } else {
    // Check if month is close (within 1 month of edge)
    const distToStart = getCircularMonthDistance(month, matchedRange.startMonth);
    const distToEnd = getCircularMonthDistance(month, matchedRange.endMonth);
    const nearestEdge = Math.min(distToStart, distToEnd);

    if (nearestEdge <= 1) {
      confidenceScore += 15;
      rationale.push(`Just outside standard calendar window; microclimates or abnormal weather may spark unseasonable emergence.`);
    } else {
      confidenceScore = 5;
      rationale.push(`Typically dormant or absent during this calendar period in this region.`);
    }
  }

  // 2. Climate & Weather modifiers
  if (climate) {
    // Temperature calibration
    const temp = climate.temperatureC;
    const tempMin = matchedRange.temperatureMinC;
    const tempMax = matchedRange.temperatureMaxC;

    if (temp >= tempMin && temp <= tempMax) {
      confidenceScore += 20;
      rationale.push(`Ambient temperature (${temp.toFixed(1)}°C) aligns with species thermal tolerance (${tempMin}°C–${tempMax}°C).`);
    } else if (temp < tempMin) {
      confidenceScore -= 20;
      rationale.push(`Unusually low temperature (${temp.toFixed(1)}°C) suppresses vegetative/fruiting emergence (minimum ${tempMin}°C required).`);
    } else {
      confidenceScore -= 15;
      rationale.push(`Elevated temperature (${temp.toFixed(1)}°C) may induce rapid desiccation or early bolting/decay.`);
    }

    // Precipitation calibration
    const precip = climate.precipitation7DaysMm;
    const minPrecip = matchedRange.minCumulativePrecipitationMm;

    if (species.kingdom === 'Fungi') {
      if (precip >= minPrecip) {
        confidenceScore += 20;
        rationale.push(`Recent cumulative precipitation (${precip.toFixed(1)}mm / 7d) satisfies mycelial flush hydration threshold (≥${minPrecip}mm).`);
      } else {
        confidenceScore -= 25;
        rationale.push(`Low moisture (${precip.toFixed(1)}mm / 7d) limits mushroom sporocarp emergence (minimum ~${minPrecip}mm required).`);
      }
    } else {
      // Plantae: moderate moisture is beneficial
      if (precip >= 10) {
        confidenceScore += 10;
        rationale.push(`Adequate soil moisture supports vibrant foliage and tender vegetative shoot growth.`);
      }
    }

    if (climate.isSimulatedOrEstimated) {
      rationale.push(`Using modeled climate approximation; local valley or slope microclimates may vary significantly.`);
    }
  } else {
    // No local climate: rely on baseline calendar with cautionary estimate cap
    confidenceScore = Math.min(confidenceScore, 65);
    rationale.push(`Calculated from regional phenology archives without real-time microclimate sensor telemetry.`);
  }

  // Clamp score
  confidenceScore = Math.max(0, Math.min(100, confidenceScore));

  // Determine qualitative label strictly avoiding certainty guarantees
  let status: SeasonalConfidence = 'off season';
  if (confidenceScore >= 70 && inActiveWindow) {
    status = 'likely in season';
  } else if (confidenceScore >= 45 && (inActiveWindow || inPeakWindow)) {
    status = 'possibly in season';
  } else if (confidenceScore >= 20) {
    status = 'seasonal estimate';
  } else {
    status = 'off season';
  }

  return {
    species,
    status,
    confidenceScore,
    isCurrentlyPeak: inPeakWindow && confidenceScore >= 50,
    activeMonths,
    peakMonths,
    rationale,
    matchedRange
  };
}
