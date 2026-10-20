import dotenv from 'dotenv';
dotenv.config({ override: true });
import { PrismaClient } from '@prisma/client';
import { VERIFIED_SPECIES_SEED, VERIFIED_REGIONS } from '../src/server/data/verifiedSpecies.ts';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding The Foragers Calendar database...');

  // Seed Regions
  for (const reg of VERIFIED_REGIONS) {
    await prisma.region.upsert({
      where: { code: reg.code },
      update: {
        name: reg.name,
        climateZone: reg.climateZone,
        latitudeCenter: reg.latitudeCenter,
        longitudeCenter: reg.longitudeCenter,
        radiusKm: reg.radiusKm,
        description: reg.description
      },
      create: {
        code: reg.code,
        name: reg.name,
        climateZone: reg.climateZone,
        latitudeCenter: reg.latitudeCenter,
        longitudeCenter: reg.longitudeCenter,
        radiusKm: reg.radiusKm,
        description: reg.description
      }
    });
  }

  // Seed Species & Seasonal Ranges
  for (const sp of VERIFIED_SPECIES_SEED) {
    const createdSpecies = await prisma.species.upsert({
      where: { scientificName: sp.scientificName },
      update: {
        commonName: sp.commonName,
        kingdom: sp.kingdom,
        family: sp.family,
        category: sp.category,
        imageUrl: sp.imageUrl,
        imageAlt: sp.imageAlt,
        imageAttribution: sp.imageAttribution,
        edibility: sp.edibility,
        edibilityNotes: sp.edibilityNotes,
        culinaryPrep: sp.culinaryPrep,
        knownRisks: sp.knownRisks,
        identificationFeatures: sp.identificationFeatures as any,
        distinguishingFeatures: sp.distinguishingFeatures,
        lookalikes: sp.lookalikes as any,
        habitats: sp.habitats,
        elevationRange: sp.elevationRange,
        conservationStatus: sp.conservationStatus,
        harvestMethod: sp.harvestMethod,
        notes: sp.notes
      },
      create: {
        id: sp.id,
        commonName: sp.commonName,
        scientificName: sp.scientificName,
        kingdom: sp.kingdom,
        family: sp.family,
        category: sp.category,
        imageUrl: sp.imageUrl,
        imageAlt: sp.imageAlt,
        imageAttribution: sp.imageAttribution,
        edibility: sp.edibility,
        edibilityNotes: sp.edibilityNotes,
        culinaryPrep: sp.culinaryPrep,
        knownRisks: sp.knownRisks,
        identificationFeatures: sp.identificationFeatures as any,
        distinguishingFeatures: sp.distinguishingFeatures,
        lookalikes: sp.lookalikes as any,
        habitats: sp.habitats,
        elevationRange: sp.elevationRange,
        conservationStatus: sp.conservationStatus,
        harvestMethod: sp.harvestMethod,
        notes: sp.notes
      }
    });

    // Seed Seasonal Ranges
    for (const range of sp.seasonalRanges) {
      await prisma.seasonalRange.create({
        data: {
          speciesId: createdSpecies.id,
          regionCode: range.regionCode,
          startMonth: range.startMonth,
          peakMonthStart: range.peakMonthStart,
          peakMonthEnd: range.peakMonthEnd,
          endMonth: range.endMonth,
          temperatureMinC: range.temperatureMinC,
          temperatureMaxC: range.temperatureMaxC,
          minCumulativePrecipitationMm: range.minCumulativePrecipitationMm,
          elevationMinM: range.elevationMinM,
          elevationMaxM: range.elevationMaxM,
          evidenceBasis: range.evidenceBasis
        }
      });
    }

    // Seed Sources
    for (const src of sp.sources) {
      await prisma.source.create({
        data: {
          speciesId: createdSpecies.id,
          title: src.title,
          author: src.author,
          publisher: src.publisher,
          url: src.url,
          year: src.year,
          peerReviewed: src.peerReviewed ?? false
        }
      });
    }
  }

  console.log('Seeding complete: Verified species and phenological matrices loaded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
