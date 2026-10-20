import { PrismaClient } from '@prisma/client';
import { VERIFIED_SPECIES_SEED, VERIFIED_REGIONS } from './data/verifiedSpecies.ts';
import { SpeciesRecord, RegionDefinition, HarvestAlertItem } from '../types/forager.ts';

declare global {
  var _prismaInstance: PrismaClient | null | undefined;
  var _prismaInitFailed: boolean | undefined;
}

export function getDatabaseStatus(): {
  isConfigured: boolean;
  isValidFormat: boolean;
  provider: string;
  hostDisplay: string;
  errorMessage?: string;
} {
  const rawUrl = process.env.DATABASE_URL?.trim() || '';
  if (!rawUrl) {
    return {
      isConfigured: false,
      isValidFormat: false,
      provider: 'Offline Verified Dataset',
      hostDisplay: 'None (In-Memory Baseline)'
    };
  }

  const isPostgres = rawUrl.startsWith('postgresql://') || rawUrl.startsWith('postgres://');
  const isMysql = rawUrl.startsWith('mysql://') || rawUrl.startsWith('mariadb://');

  if (!isPostgres && !isMysql) {
    return {
      isConfigured: true,
      isValidFormat: false,
      provider: 'MariaDB / MySQL (Incomplete URL)',
      hostDisplay: rawUrl,
      errorMessage: `URL is missing protocol (e.g. mysql://) and credentials. Expected format: mysql://USER:PASSWORD@${rawUrl}/DATABASE_NAME`
    };
  }

  return {
    isConfigured: true,
    isValidFormat: true,
    provider: isMysql ? 'MariaDB / MySQL' : 'PostgreSQL',
    hostDisplay: rawUrl.replace(/:\/\/([^:@]+):([^@]+)@/, '://***:***@')
  };
}

export function getPrismaClient(): PrismaClient | null {
  const dbUrl = process.env.DATABASE_URL?.trim();
  if (!dbUrl) {
    return null;
  }

  if (global._prismaInitFailed) {
    return null;
  }

  if (global._prismaInstance !== undefined) {
    return global._prismaInstance;
  }

  // Check URL scheme
  const isPostgres = dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://');
  const isMysql = dbUrl.startsWith('mysql://') || dbUrl.startsWith('mariadb://');

  if (!isPostgres && !isMysql) {
    console.warn(
      `[Database Configuration] DATABASE_URL is set to "${dbUrl}", but missing connection protocol (e.g. "mysql://" or "postgresql://").\n` +
      `Format for MariaDB: mysql://USER:PASSWORD@${dbUrl}/DATABASE_NAME\n` +
      `Falling back to verified botanical offline records.`
    );
    global._prismaInitFailed = true;
    global._prismaInstance = null;
    return null;
  }

  try {
    global._prismaInstance = new PrismaClient();
    return global._prismaInstance;
  } catch (err: any) {
    console.warn('[Database Connection] PrismaClient initialization skipped:', err?.message || err);
    global._prismaInitFailed = true;
    global._prismaInstance = null;
    return null;
  }
}

// In-memory persistent alert store for session/local testing
let inMemoryAlerts: HarvestAlertItem[] = [
  {
    id: 'alt_1',
    speciesId: 'sp_cantharellus_cibarius',
    speciesName: 'Golden Chanterelle (Girolle)',
    scientificName: 'Cantharellus cibarius',
    regionCode: 'UK_SCOTTISH_HIGHLANDS',
    targetMonth: 9,
    conditionTrigger: 'rainfall_flush',
    notes: 'Trigger alert after late summer soaking rainfall (>25mm/7d) in Scottish pinewoods.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'alt_2',
    speciesId: 'sp_allium_ursinum',
    speciesName: 'Wild Garlic (Ramsons)',
    scientificName: 'Allium ursinum',
    regionCode: 'UK_SOUTH_EAST_WEALD',
    targetMonth: 3,
    conditionTrigger: 'temperature_window',
    notes: 'Early spring emergence when soil temp exceeds 6°C in ancient woodlands.',
    createdAt: new Date().toISOString()
  }
];

export const dataRepository = {
  async getAllSpecies(): Promise<SpeciesRecord[]> {
    const prisma = getPrismaClient();
    if (prisma) {
      try {
        const rows = await prisma.species.findMany({
          include: { seasonalRanges: true, sources: true }
        });
        if (rows.length > 0) {
          return rows.map((r: any) => ({
            id: r.id,
            commonName: r.commonName,
            scientificName: r.scientificName,
            kingdom: r.kingdom as any,
            family: r.family,
            category: r.category as any,
            imageUrl: r.imageUrl,
            imageAlt: r.imageAlt,
            imageAttribution: r.imageAttribution,
            edibility: r.edibility as any,
            edibilityNotes: r.edibilityNotes,
            culinaryPrep: r.culinaryPrep,
            knownRisks: r.knownRisks,
            identificationFeatures: r.identificationFeatures as any,
            distinguishingFeatures: r.distinguishingFeatures,
            lookalikes: r.lookalikes as any,
            habitats: Array.isArray(r.habitats) ? r.habitats : typeof r.habitats === 'string' ? JSON.parse(r.habitats) : (r.habitats || []),
            elevationRange: r.elevationRange,
            conservationStatus: r.conservationStatus as any,
            harvestMethod: r.harvestMethod,
            notes: r.notes || undefined,
            seasonalRanges: r.seasonalRanges.map((sr: any) => ({
              id: sr.id,
              regionCode: sr.regionCode,
              startMonth: sr.startMonth,
              peakMonthStart: sr.peakMonthStart,
              peakMonthEnd: sr.peakMonthEnd,
              endMonth: sr.endMonth,
              temperatureMinC: sr.temperatureMinC,
              temperatureMaxC: sr.temperatureMaxC,
              minCumulativePrecipitationMm: sr.minCumulativePrecipitationMm,
              elevationMinM: sr.elevationMinM ?? undefined,
              elevationMaxM: sr.elevationMaxM ?? undefined,
              evidenceBasis: sr.evidenceBasis
            })),
            sources: r.sources.map((s: any) => ({
              id: s.id,
              title: s.title,
              author: s.author,
              publisher: s.publisher,
              year: s.year,
              url: s.url,
              peerReviewed: s.peerReviewed
            }))
          }));
        }
      } catch (err) {
        console.warn('Prisma query failed, falling back to verified seed:', (err as Error).message);
      }
    }
    return VERIFIED_SPECIES_SEED;
  },

  async getSpeciesById(id: string): Promise<SpeciesRecord | null> {
    const all = await this.getAllSpecies();
    return all.find(s => s.id === id || s.scientificName.toLowerCase() === id.toLowerCase()) || null;
  },

  async getAllRegions(): Promise<RegionDefinition[]> {
    const prisma = getPrismaClient();
    if (prisma) {
      try {
        const rows = await prisma.region.findMany();
        if (rows.length > 0) {
          return rows.map((r: any) => ({
            code: r.code,
            name: r.name,
            climateZone: r.climateZone,
            latitudeCenter: r.latitudeCenter,
            longitudeCenter: r.longitudeCenter,
            radiusKm: r.radiusKm,
            description: r.description
          }));
        }
      } catch (err) {
        console.warn('Prisma region query failed, falling back to verified regions:', (err as Error).message);
      }
    }
    return VERIFIED_REGIONS;
  },

  async getRegionByCode(code: string): Promise<RegionDefinition | null> {
    const regions = await this.getAllRegions();
    return regions.find(r => r.code === code) || null;
  },

  async getAlerts(): Promise<HarvestAlertItem[]> {
    return inMemoryAlerts;
  },

  async createAlert(alert: Omit<HarvestAlertItem, 'id' | 'createdAt'>): Promise<HarvestAlertItem> {
    const newAlert: HarvestAlertItem = {
      id: `alt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      ...alert
    };
    inMemoryAlerts.unshift(newAlert);
    return newAlert;
  },

  async deleteAlert(id: string): Promise<boolean> {
    const prevLen = inMemoryAlerts.length;
    inMemoryAlerts = inMemoryAlerts.filter(a => a.id !== id);
    return inMemoryAlerts.length < prevLen;
  }
};
