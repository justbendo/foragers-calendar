/**
 * Domain types for The Foragers Calendar
 */

export type KingdomType = 'Plantae' | 'Fungi';

export type EdibilityGrade =
  | 'Choice Edible'
  | 'Edible with Caution'
  | 'Medicinal / Infusion'
  | 'Inedible / Bitter'
  | 'Toxic Warning'
  | 'Deadly Poisonous';

export type SeasonalConfidence =
  | 'likely in season'
  | 'possibly in season'
  | 'seasonal estimate'
  | 'off season';

export interface Lookalike {
  name: string;
  scientificName: string;
  dangerous: boolean;
  distinction: string;
  dangerLevel?:
    | 'Deadly'
    | 'Severe Gastrointestinal'
    | 'Mild Irritant'
    | 'Edible Lookalike'
    | 'Inedible / Tough'
    | 'Inedible / Bitter'
    | 'Edible Herb'
    | string;
}

export interface IdentificationFeatures {
  capOrCrown?: string;
  gillsOrPoresOrUnderside?: string;
  stemOrStipe?: string;
  leavesOrFoliage?: string;
  flowersOrFruit?: string;
  odorAndTaste?: string;
  sporePrint?: string;
  crossSection?: string;
}

export interface SourceCitation {
  id?: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  url: string;
  peerReviewed?: boolean;
}

export interface SeasonalRange {
  id?: string;
  regionCode: string;
  startMonth: number; // 1-12
  peakMonthStart: number;
  peakMonthEnd: number;
  endMonth: number;
  temperatureMinC: number;
  temperatureMaxC: number;
  minCumulativePrecipitationMm: number;
  elevationMinM?: number;
  elevationMaxM?: number;
  evidenceBasis: string;
}

export interface SpeciesRecord {
  id: string;
  commonName: string;
  scientificName: string;
  kingdom: KingdomType;
  family: string;
  category: 'Wild Greens' | 'Fruiting Mushroom' | 'Tree Fruit/Nuts' | 'Berries' | 'Roots/Tubers' | 'Herbs/Flowers';
  imageUrl: string;
  imageAlt: string;
  imageAttribution: string;
  edibility: EdibilityGrade;
  edibilityNotes: string;
  culinaryPrep: string;
  knownRisks: string;
  identificationFeatures: IdentificationFeatures;
  distinguishingFeatures: string;
  lookalikes: Lookalike[];
  habitats: string[];
  elevationRange: string;
  conservationStatus:
    | 'Common / Least Concern'
    | 'Locally Regulated'
    | 'Protected - Do Not Harvest'
    | string;
  harvestMethod: string;
  notes?: string;
  seasonalRanges: SeasonalRange[];
  sources: SourceCitation[];
}

export interface RegionDefinition {
  code: string;
  name: string;
  climateZone: string;
  latitudeCenter: number;
  longitudeCenter: number;
  radiusKm: number;
  description: string;
}

export interface ClimateSnapshot {
  temperatureC: number;
  apparentTempC: number;
  precipitation7DaysMm: number;
  relativeHumidityPct: number;
  soilMoistureScore: number; // 0 to 1 scale
  conditionName: string;
  isSimulatedOrEstimated: boolean;
  provider: string;
  timestamp: string;
}

export interface SpeciesSeasonalMatch {
  species: SpeciesRecord;
  status: SeasonalConfidence;
  confidenceScore: number; // 0 - 100
  isCurrentlyPeak: boolean;
  activeMonths: number[];
  peakMonths: number[];
  rationale: string[];
  matchedRange: SeasonalRange;
}

export interface HarvestAlertItem {
  id: string;
  speciesId: string;
  speciesName: string;
  scientificName: string;
  regionCode: string;
  targetMonth: number;
  conditionTrigger: 'rainfall_flush' | 'temperature_window' | 'peak_season';
  notes?: string;
  createdAt: string;
}

export interface LocationState {
  label: string;
  latitude: number | null;
  longitude: number | null;
  regionCode: string;
  accuracy: 'exact_approximated' | 'region_manual' | 'default';
  isDenied: boolean;
}
