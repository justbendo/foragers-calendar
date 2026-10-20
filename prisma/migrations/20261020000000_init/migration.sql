-- CreateTable: Species
CREATE TABLE "Species" (
    "id" TEXT NOT NULL,
    "commonName" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "kingdom" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "imageAttribution" TEXT NOT NULL,
    "edibility" TEXT NOT NULL,
    "edibilityNotes" TEXT NOT NULL,
    "culinaryPrep" TEXT NOT NULL,
    "knownRisks" TEXT NOT NULL,
    "identificationFeatures" JSONB NOT NULL,
    "distinguishingFeatures" TEXT NOT NULL,
    "lookalikes" JSONB NOT NULL,
    "habitats" TEXT[] NOT NULL,
    "elevationRange" TEXT NOT NULL,
    "conservationStatus" TEXT NOT NULL,
    "harvestMethod" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable: SeasonalRange
CREATE TABLE "SeasonalRange" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "regionCode" TEXT NOT NULL,
    "startMonth" INTEGER NOT NULL,
    "peakMonthStart" INTEGER NOT NULL,
    "peakMonthEnd" INTEGER NOT NULL,
    "endMonth" INTEGER NOT NULL,
    "temperatureMinC" DOUBLE PRECISION NOT NULL,
    "temperatureMaxC" DOUBLE PRECISION NOT NULL,
    "minCumulativePrecipitationMm" DOUBLE PRECISION NOT NULL,
    "elevationMinM" INTEGER,
    "elevationMaxM" INTEGER,
    "evidenceBasis" TEXT NOT NULL,

    CONSTRAINT "SeasonalRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Region
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "climateZone" TEXT NOT NULL,
    "latitudeCenter" DOUBLE PRECISION NOT NULL,
    "longitudeCenter" DOUBLE PRECISION NOT NULL,
    "radiusKm" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable: ClimateObservation
CREATE TABLE "ClimateObservation" (
    "id" TEXT NOT NULL,
    "regionCode" TEXT NOT NULL,
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperatureC" DOUBLE PRECISION NOT NULL,
    "precipitation7DaysMm" DOUBLE PRECISION NOT NULL,
    "soilMoistureIndex" DOUBLE PRECISION NOT NULL,
    "weatherCondition" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClimateObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Source
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "peerReviewed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable: UserPreference
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "defaultRegion" TEXT NOT NULL DEFAULT 'TEMPERATE_NW',
    "metricUnits" BOOLEAN NOT NULL DEFAULT true,
    "savedSpeciesIds" TEXT[] NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable: HarvestAlert
CREATE TABLE "HarvestAlert" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "regionCode" TEXT NOT NULL,
    "targetMonth" INTEGER NOT NULL,
    "conditionTrigger" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HarvestAlert_pkey" PRIMARY KEY ("id")
);

-- CreateIndexes
CREATE UNIQUE INDEX "Species_scientificName_key" ON "Species"("scientificName");
CREATE INDEX "Species_kingdom_idx" ON "Species"("kingdom");
CREATE INDEX "Species_category_idx" ON "Species"("category");
CREATE INDEX "Species_edibility_idx" ON "Species"("edibility");

CREATE INDEX "SeasonalRange_speciesId_idx" ON "SeasonalRange"("speciesId");
CREATE INDEX "SeasonalRange_regionCode_idx" ON "SeasonalRange"("regionCode");
CREATE INDEX "SeasonalRange_startMonth_endMonth_idx" ON "SeasonalRange"("startMonth", "endMonth");

CREATE UNIQUE INDEX "Region_code_key" ON "Region"("code");
CREATE INDEX "ClimateObservation_regionCode_observedAt_idx" ON "ClimateObservation"("regionCode", "observedAt");
CREATE INDEX "Source_speciesId_idx" ON "Source"("speciesId");
CREATE UNIQUE INDEX "UserPreference_sessionId_key" ON "UserPreference"("sessionId");
CREATE INDEX "HarvestAlert_speciesId_idx" ON "HarvestAlert"("speciesId");
CREATE INDEX "HarvestAlert_regionCode_idx" ON "HarvestAlert"("regionCode");

-- AddForeignKey
ALTER TABLE "SeasonalRange" ADD CONSTRAINT "SeasonalRange_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Source" ADD CONSTRAINT "Source_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "HarvestAlert" ADD CONSTRAINT "HarvestAlert_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;
