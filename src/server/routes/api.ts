import { Router, Request, Response } from 'express';
import { dataRepository, getDatabaseStatus } from '../db.ts';
import { weatherService } from '../services/weatherService.ts';
import { evaluateSpeciesSeasonality } from '../services/seasonalCalculator.ts';
import { ClimateSnapshot, SpeciesRecord } from '../../types/forager.ts';

const router = Router();

// In-memory rate limiting map: ip -> { count, resetAt }
const rateLimitWindowMs = 60 * 1000; // 1 minute
const maxRequestsPerMinute = 120;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimiter(req: Request, res: Response, next: () => void) {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return next();
  }

  if (entry.count >= maxRequestsPerMinute) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please wait a moment before sending more requests.',
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000)
    });
  }

  entry.count++;
  next();
}

router.use(rateLimiter);

/**
 * GET /api/regions
 * Returns all configured geographical foraging regions
 */
router.get('/regions', async (_req: Request, res: Response) => {
  try {
    const regions = await dataRepository.getAllRegions();
    res.json(regions);
  } catch (err) {
    console.error('Error fetching regions:', err);
    res.status(500).json({ error: 'Failed to retrieve region database' });
  }
});

/**
 * GET /api/db/status
 * Returns database configuration and connectivity state
 */
router.get('/db/status', async (_req: Request, res: Response) => {
  const status = getDatabaseStatus();
  res.json(status);
});

/**
 * GET /api/species
 * Returns filtered list of species
 */
router.get('/species', async (req: Request, res: Response) => {
  try {
    const { search, kingdom, category, edibility, habitat } = req.query;
    let list = await dataRepository.getAllSpecies();

    if (search && typeof search === 'string') {
      const q = search.trim().toLowerCase();
      list = list.filter(
        s =>
          s.commonName.toLowerCase().includes(q) ||
          s.scientificName.toLowerCase().includes(q) ||
          s.family.toLowerCase().includes(q)
      );
    }

    if (kingdom && typeof kingdom === 'string' && kingdom !== 'All') {
      list = list.filter(s => s.kingdom.toLowerCase() === kingdom.toLowerCase());
    }

    if (category && typeof category === 'string' && category !== 'All') {
      list = list.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (edibility && typeof edibility === 'string' && edibility !== 'All') {
      list = list.filter(s => s.edibility.toLowerCase() === edibility.toLowerCase());
    }

    if (habitat && typeof habitat === 'string' && habitat !== 'All') {
      list = list.filter(s => s.habitats.some(h => h.toLowerCase().includes(habitat.toLowerCase())));
    }

    res.json(list);
  } catch (err) {
    console.error('Error fetching species:', err);
    res.status(500).json({ error: 'Failed to retrieve species profiles' });
  }
});

/**
 * GET /api/species/:id
 * Retrieve single species profile
 */
router.get('/species/:id', async (req: Request, res: Response) => {
  try {
    const species = await dataRepository.getSpeciesById(req.params.id);
    if (!species) {
      return res.status(404).json({ error: 'Species profile not found in verified database' });
    }
    res.json(species);
  } catch (err) {
    console.error('Error fetching species profile:', err);
    res.status(500).json({ error: 'Internal server error retrieving species profile' });
  }
});

/**
 * GET /api/climate
 * Retrieves climate observation for coordinates or region code
 */
router.get('/climate', async (req: Request, res: Response) => {
  try {
    const { lat, lon, regionCode = 'UK_SOUTH_EAST_WEALD', month } = req.query;
    const targetMonth = month ? parseInt(month as string, 10) : new Date().getMonth() + 1;

    let climate: ClimateSnapshot;

    if (lat && lon) {
      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lon as string);

      if (isNaN(latitude) || isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return res.status(400).json({ error: 'Invalid coordinate parameters' });
      }

      climate = await weatherService.getClimateByCoordinates(latitude, longitude);
    } else {
      climate = weatherService.getRegionalEstimate(regionCode as string, targetMonth);
    }

    res.json(climate);
  } catch (err) {
    console.error('Error in climate endpoint:', err);
    res.status(500).json({ error: 'Failed to retrieve climate observation' });
  }
});

/**
 * GET /api/seasonal
 * Computes seasonal matches for the specified month, region, and weather conditions.
 * Supports simulation parameters (simTemp, simRain) to model microclimate changes.
 */
router.get('/seasonal', async (req: Request, res: Response) => {
  try {
    const {
      month,
      regionCode = 'UK_SOUTH_EAST_WEALD',
      lat,
      lon,
      simTemp,
      simRain
    } = req.query;

    const targetMonth = month ? Math.max(1, Math.min(12, parseInt(month as string, 10))) : new Date().getMonth() + 1;

    // Retrieve or synthesize climate
    let climate: ClimateSnapshot;
    if (simTemp !== undefined || simRain !== undefined) {
      // User is running interactive climate simulation
      const baseEstimate = weatherService.getRegionalEstimate(regionCode as string, targetMonth);
      climate = {
        ...baseEstimate,
        temperatureC: simTemp !== undefined ? parseFloat(simTemp as string) : baseEstimate.temperatureC,
        precipitation7DaysMm: simRain !== undefined ? parseFloat(simRain as string) : baseEstimate.precipitation7DaysMm,
        isSimulatedOrEstimated: true,
        conditionName: 'Interactive Microclimate Simulation'
      };
    } else if (lat && lon) {
      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lon as string);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        climate = await weatherService.getClimateByCoordinates(latitude, longitude);
      } else {
        climate = weatherService.getRegionalEstimate(regionCode as string, targetMonth);
      }
    } else {
      climate = weatherService.getRegionalEstimate(regionCode as string, targetMonth);
    }

    const allSpecies: SpeciesRecord[] = await dataRepository.getAllSpecies();

    const matches = allSpecies.map(species =>
      evaluateSpeciesSeasonality({
        species,
        month: targetMonth,
        regionCode: regionCode as string,
        climate
      })
    );

    res.json({
      targetMonth,
      regionCode,
      climate,
      totalSpeciesEvaluated: allSpecies.length,
      matches
    });
  } catch (err) {
    console.error('Error calculating seasonal discovery:', err);
    res.status(500).json({ error: 'Failed to compute seasonal estimations' });
  }
});

/**
 * Harvest Alerts Endpoints
 */
router.get('/alerts', async (_req: Request, res: Response) => {
  try {
    const alerts = await dataRepository.getAlerts();
    res.json(alerts);
  } catch (err) {
    console.error('Error fetching alerts:', err);
    res.status(500).json({ error: 'Failed to retrieve harvest alerts' });
  }
});

router.post('/alerts', async (req: Request, res: Response) => {
  try {
    const { speciesId, targetMonth, conditionTrigger, regionCode, notes } = req.body;

    if (!speciesId || !targetMonth || !conditionTrigger) {
      return res.status(400).json({ error: 'Missing required alert fields (speciesId, targetMonth, conditionTrigger)' });
    }

    const species = await dataRepository.getSpeciesById(speciesId);
    if (!species) {
      return res.status(404).json({ error: 'Referenced species does not exist' });
    }

    const created = await dataRepository.createAlert({
      speciesId,
      speciesName: species.commonName,
      scientificName: species.scientificName,
      regionCode: regionCode || 'UK_SOUTH_EAST_WEALD',
      targetMonth: parseInt(targetMonth, 10),
      conditionTrigger,
      notes: notes ? String(notes).trim().slice(0, 300) : undefined
    });

    res.status(201).json(created);
  } catch (err) {
    console.error('Error creating harvest alert:', err);
    res.status(500).json({ error: 'Failed to create harvest alert' });
  }
});

router.delete('/alerts/:id', async (req: Request, res: Response) => {
  try {
    const success = await dataRepository.deleteAlert(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    res.json({ success: true, message: 'Alert removed' });
  } catch (err) {
    console.error('Error deleting alert:', err);
    res.status(500).json({ error: 'Failed to delete alert' });
  }
});

/**
 * GET /api/safety
 * Curated ethical and legal foraging principles
 */
router.get('/safety', (_req: Request, res: Response) => {
  res.json({
    primaryWarning: 'Never eat a wild plant or mushroom based solely on this app. This platform is strictly an educational phenological aid, not an in-field identification tool or guarantee of safety.',
    rules: [
      {
        title: 'The 100% Certainty Rule',
        body: 'If you have even 1% doubt regarding a species identification, do not ingest it. Seek multiple physical field guides and confirmation from a qualified local mycologist or botanist.'
      },
      {
        title: 'Beware Deadly Lookalikes',
        body: 'Many choice edibles (such as Wild Garlic, Chanterelles, and Morels) share superficial traits with lethal species (such as Lily of the Valley, Jack-o\'-Lantern, and False Morels). Always verify every anatomical distinction.'
      },
      {
        title: 'The One-Third Rule & Conservation',
        body: 'Never harvest more than one-third of any healthy plant clump or fungal patch. Leave the rest for wildlife, spore dispersal, and plant reproduction.'
      },
      {
        title: 'Land Access, Rights & Law',
        body: 'Ensure you have legal permission to forage. In many regions, picking on private land, nature reserves, Sites of Special Scientific Interest (SSSI), or National Parks is strictly prohibited or regulated.'
      },
      {
        title: 'Avoid Contaminated Zones',
        body: 'Never forage near busy roadways (lead, microplastics, and heavy metal runoff), dog-walking trails, industrial sites, agricultural fields sprayed with pesticides, or golf courses.'
      },
      {
        title: 'Cooking & Preparation',
        body: 'Almost all edible wild mushrooms must be thoroughly cooked. Many contain mild thermolabile toxins that break down under heat but cause severe illness if consumed raw.'
      }
    ]
  });
});

export default router;
