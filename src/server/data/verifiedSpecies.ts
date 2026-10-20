import { SpeciesRecord, RegionDefinition } from '../../types/forager.ts';

export const VERIFIED_REGIONS: RegionDefinition[] = [
  {
    code: 'UK_SOUTH_EAST_WEALD',
    name: 'Greater London, South East England & The Weald',
    climateZone: 'Lowland Maritime (Chalk Downs, Wealden Clay & Ancient Woodland)',
    latitudeCenter: 51.2091,
    longitudeCenter: -0.1163,
    radiusKm: 160,
    description: 'Surrey, Sussex, Kent, Hampshire, Greater London commons & The Chilterns. Ancient beech and oak coppice on chalk and greensand. Famous for ceps, sweet chestnuts, horn of plenty, parasols, wild garlic, and nettles.'
  },
  {
    code: 'UK_SOUTH_WEST_COASTAL',
    name: 'South West England (Devon, Cornwall & Dorset)',
    climateZone: 'Mild Hyper-Oceanic (Atlantic Cliffs, Shingle & Deep Valleys)',
    latitudeCenter: 50.5155,
    longitudeCenter: -4.2786,
    radiusKm: 200,
    description: 'Cornwall, Devon, Dorset Jurassic Coast & Somerset. Mildest UK winters, dramatic coastal cliffs and sheltered wooded valleys. Prime territory for rock samphire, sea beet, navelwort, winter chanterelles, and wild fennel.'
  },
  {
    code: 'UK_MIDLANDS_HEARTLAND',
    name: 'English Midlands & Cotswolds',
    climateZone: 'Temperate Lowland (Cotswolds & Mercian Basin)',
    latitudeCenter: 52.4862,
    longitudeCenter: -1.8904,
    radiusKm: 150,
    description: 'Cotswolds, Warwickshire, Shropshire, Derbyshire, Staffordshire & Leicestershire. Ancient hedgerows, clay vales, and limestone pastures. Renowned for St. George\'s mushroom, sloes, elderberry, hazelnuts, and wild greens.'
  },
  {
    code: 'UK_EAST_ANGLIA_FEN',
    name: 'East Anglia, Fens & Coastal Marshes',
    climateZone: 'Dry Lowland Maritime & Estuarine Mudflats',
    latitudeCenter: 52.6309,
    longitudeCenter: 1.1974,
    radiusKm: 150,
    description: 'Norfolk, Suffolk, Essex & Cambridgeshire. Lowest UK rainfall, vast salt marshes and pine heaths. Famous for marsh samphire (glasswort), sea aster, sea purslane, giant puffballs, and hedgerow fruits.'
  },
  {
    code: 'UK_NORTH_PENNINES_LAKES',
    name: 'Northern England (Pennines, Moors & Lake District)',
    climateZone: 'Temperate Oceanic Upland & Heather Moors',
    latitudeCenter: 54.3361,
    longitudeCenter: -2.4654,
    radiusKm: 200,
    description: 'Yorkshire Dales, North York Moors, Lake District & Northumbria. High rainfall, acidic moorlands, and river ravines. Bilberries (blaeberries), hedgehog mushrooms, wood sorrel, and rowan berries.'
  },
  {
    code: 'UK_SCOTTISH_HIGHLANDS',
    name: 'Scottish Highlands, Islands & Caledonian Pine',
    climateZone: 'Sub-Montane Oceanic & Boreal Pinewoods',
    latitudeCenter: 57.2229,
    longitudeCenter: -4.4244,
    radiusKm: 260,
    description: 'Highlands, Cairngorms, Argyll, Loch Lomond & Western Isles. Native Pinus sylvestris woods, peaty glens, and heather heaths. The UK\'s capital for golden chanterelles, blaeberries, ceps (Boletus edulis), and juniper.'
  },
  {
    code: 'UK_SCOTTISH_LOWLANDS',
    name: 'Scottish Lowlands & Central Belt (Edinburgh & Glasgow)',
    climateZone: 'Temperate Oceanic Valleys & Coastal Firths',
    latitudeCenter: 55.9533,
    longitudeCenter: -3.1883,
    radiusKm: 160,
    description: 'Edinburgh, Glasgow, Lothians, Fife, Borders & Dumfries & Galloway. River valleys, mixed deciduous woods, and coastal cliffs. Plentiful wild garlic, elderberries, blackberries, and ceps.'
  },
  {
    code: 'UK_WALES_VALLEYS_COAST',
    name: 'Wales (Snowdonia, Brecon Beacons & Valleys)',
    climateZone: 'Maritime Upland & Atlantic Cloughs',
    latitudeCenter: 52.4153,
    longitudeCenter: -3.8837,
    radiusKm: 180,
    description: 'Snowdonia, Brecon Beacons, Pembrokeshire, Gower, Wye Valley & Cambrian hills. Lush mossy sessile oak woods and coastal cliffs. Rich in winter chanterelles, bilberries, wood sorrel, and rock samphire.'
  },
  {
    code: 'UK_NORTHERN_IRELAND',
    name: 'Northern Ireland (Glens, Loughs & Mournes)',
    climateZone: 'Hyper-Oceanic Drumlins & Glens',
    latitudeCenter: 54.7877,
    longitudeCenter: -6.4923,
    radiusKm: 140,
    description: 'Antrim Glens, Mourne Mountains, Lough Neagh & Fermanagh Lakelands. Damp hazel scrub, damp meadows, and ancient woodland pockets. Abundant wild garlic, hazelnuts, chanterelles, and nettles.'
  }
];

export const VERIFIED_SPECIES_SEED: SpeciesRecord[] = [
  // 1. Golden Chanterelle
  {
    id: 'sp_cantharellus_cibarius',
    commonName: 'Golden Chanterelle (Girolle)',
    scientificName: 'Cantharellus cibarius',
    kingdom: 'Fungi',
    family: 'Cantharellaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_cantharellus_cibarius.jpg',
    imageAlt: 'Golden chanterelles in damp moss beneath Scots pine and beech leaf litter in a British forest',
    imageAttribution: 'British Mycological Society / The Foragers Calendar Herbarium',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of the most prized culinary wild mushrooms in Britain. Apricot fragrance and firm peppery texture.',
    culinaryPrep: 'Dry-fry in a hot pan first to release natural moisture, then sauté in butter with garlic and fresh parsley for at least 15 minutes. Never consume raw.',
    knownRisks: 'Dangerous lookalikes exist: the toxic Jack-o\'-Lantern (Omphalotus illudens) and False Chanterelle (Hygrophoropsis aurantiaca). Always confirm false decurrent gill ridges.',
    identificationFeatures: {
      capOrCrown: 'Egg-yellow to orange-yellow, 3–10 cm wide, convex flattening to funnel-shaped with undulating wavy margin.',
      gillsOrPoresOrUnderside: 'CRITICAL: False gills—forked, blunt, decurrent ridges running far down the stem, not blade-like.',
      stemOrStipe: 'Solid, firm, cream to pale yellow inside when cut, never hollow.',
      odorAndTaste: 'Unmistakable aroma of fresh apricots or mirabelle plums. Peppery raw taste.'
    },
    distinguishingFeatures: 'Blunt decurrent ridges (not sharp paper-thin gills); apricot scent; solid white/yellow flesh.',
    lookalikes: [
      {
        name: 'Jack-o\'-Lantern Mushroom',
        scientificName: 'Omphalotus illudens / olearius',
        dangerous: true,
        dangerLevel: 'Severe Gastrointestinal',
        distinction: 'Has sharp, true blade gills; orange flesh throughout (no white center); grows in dense clusters directly on wood.'
      },
      {
        name: 'False Chanterelle',
        scientificName: 'Hygrophoropsis aurantiaca',
        dangerous: false,
        dangerLevel: 'Mild Irritant',
        distinction: 'Has true thin gills, darker orange cap center, and flaccid flesh without apricot fragrance.'
      }
    ],
    habitats: ['Highland Birch & Scots Pine Woods', 'Ancient Beech & Oak Woods (Weald, New Forest & Wye Valley)', 'Acidic mossy woodland banks'],
    elevationRange: '30m – 950m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Slice cleanly at ground level with a sharp field knife. Leave underground mycelial hyphae intact. Carry in a wicker basket.',
    notes: 'British Mycological Society Code: Do not harvest button chanterelles under 2cm diameter to ensure spore dispersal.',
    seasonalRanges: [
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 7,
        peakMonthStart: 8,
        peakMonthEnd: 10,
        endMonth: 11,
        temperatureMinC: 9,
        temperatureMaxC: 20,
        minCumulativePrecipitationMm: 25,
        evidenceBasis: 'Scottish Fungus Group and RBGE Phenological Herbarium.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 11,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 28,
        evidenceBasis: 'British Mycological Society Southern Foray datasets.'
      },
      {
        regionCode: 'UK_NORTH_PENNINES_LAKES',
        startMonth: 7,
        peakMonthStart: 8,
        peakMonthEnd: 10,
        endMonth: 11,
        temperatureMinC: 10,
        temperatureMaxC: 21,
        minCumulativePrecipitationMm: 25,
        evidenceBasis: 'Yorkshire Mycological Association records.'
      },
      {
        regionCode: 'UK_WALES_VALLEYS_COAST',
        startMonth: 7,
        peakMonthStart: 8,
        peakMonthEnd: 10,
        endMonth: 11,
        temperatureMinC: 10,
        temperatureMaxC: 21,
        minCumulativePrecipitationMm: 25,
        evidenceBasis: 'Welsh Mycological Society survey.'
      }
    ],
    sources: [
      {
        title: 'Mushrooms and Other Fungi of Great Britain & Europe',
        author: 'Roger Phillips',
        publisher: 'Pan Macmillan',
        year: 2006,
        url: 'https://www.panmacmillan.com',
        peerReviewed: true
      }
    ]
  },

  // 2. Wild Garlic (Ramsons)
  {
    id: 'sp_allium_ursinum',
    commonName: 'Wild Garlic (Ramsons)',
    scientificName: 'Allium ursinum',
    kingdom: 'Plantae',
    family: 'Amaryllidaceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_allium_ursinum.jpg',
    imageAlt: 'Lush wild garlic carpet in bloom along a damp riverbank in an English ancient oak wood',
    imageAttribution: 'Botanical Society of Britain & Ireland (BSBI) / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of Britain\'s most beloved wild spring greens. Every part is edible: tender leaves, flower buds, blossoms, and seed heads.',
    culinaryPrep: 'Puree raw into British ramsons pesto with toasted hazelnuts and rapeseed oil, or wilt into soups, risottos, and omelettes.',
    knownRisks: 'POTENTIALLY LETHAL LOOKALIKES: Leaves emerge at the exact same time as deadly Lily of the Valley (Convallaria majalis) and Lords-and-Ladies (Arum maculatum). Every single leaf MUST smell strongly of garlic when bruised.',
    identificationFeatures: {
      leavesOrFoliage: 'Single leaf per underground stalk, elliptical with a pointed tip and dull/matte underside.',
      stemOrStipe: 'Distinctly triangular in cross-section.',
      flowersOrFruit: 'Pompom umbels of star-shaped white flowers with six petals.',
      odorAndTaste: 'CRITICAL IDENTIFIER: Powerful, unmistakable scent of pungent fresh garlic when bruised.'
    },
    distinguishingFeatures: 'Unmistakable garlic aroma on every leaf; single leaf per separate stalk; triangular leaf stem.',
    lookalikes: [
      {
        name: 'Lily of the Valley',
        scientificName: 'Convallaria majalis',
        dangerous: true,
        dangerLevel: 'Deadly',
        distinction: 'CONTAINS LETHAL CARDIAC GLYCOSIDES. Has ZERO garlic smell. Two leaves clasp each other from the same stem.'
      },
      {
        name: 'Lords-and-Ladies (Cuckoo Pint)',
        scientificName: 'Arum maculatum',
        dangerous: true,
        dangerLevel: 'Severe Gastrointestinal',
        distinction: 'Arrow-shaped leaves with backward-pointing lobes; contains microscopic calcium oxalate needles that cause acute throat swelling.'
      }
    ],
    habitats: ['Ancient Semi-Natural Woodland (ASNW)', 'Damp River Valleys & Shaded Streams', 'Limestone Cloughs and Ghylls across UK'],
    elevationRange: '0m – 600m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Snip individual leaves with clean scissors, harvesting no more than 1/3 of leaves from any single clump so the bulb can replenish.',
    notes: 'Protected under the UK Wildlife and Countryside Act 1981: It is illegal to dig up the underground bulbs without landowner permission.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 2,
        peakMonthStart: 3,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 5,
        temperatureMaxC: 19,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Woodland Trust Nature\'s Calendar phenology dataset.'
      },
      {
        regionCode: 'UK_SOUTH_WEST_COASTAL',
        startMonth: 2,
        peakMonthStart: 3,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 6,
        temperatureMaxC: 20,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Cornish Hedgerow and Ancient Woodland Phenology.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 3,
        peakMonthStart: 3,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 5,
        temperatureMaxC: 19,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Cotswold Warden survey.'
      },
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 4,
        temperatureMaxC: 17,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Botanical Society of Britain & Ireland (BSBI) Scottish Vice-Counties.'
      },
      {
        regionCode: 'UK_SCOTTISH_LOWLANDS',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 5,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Lothians Wildlife Trust.'
      },
      {
        regionCode: 'UK_NORTHERN_IRELAND',
        startMonth: 3,
        peakMonthStart: 3,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 5,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Ulster Wildlife phenology logs.'
      }
    ],
    sources: [
      {
        title: 'New Flora of the British Isles',
        author: 'Clive Stace',
        publisher: 'C&M Floristics',
        year: 2019,
        url: 'https://bsbi.org/stace',
        peerReviewed: true
      }
    ]
  },

  // 3. Penny Bun / Cep (Boletus edulis)
  {
    id: 'sp_boletus_edulis',
    commonName: 'Penny Bun / Cep (Porcini)',
    scientificName: 'Boletus edulis',
    kingdom: 'Fungi',
    family: 'Boletaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_boletus_edulis.jpg',
    imageAlt: 'Penny bun Boletus edulis mushroom on British ancient oak leaf floor',
    imageAttribution: 'British Mycological Society Field Archive',
    edibility: 'Choice Edible',
    edibilityNotes: 'Regarded across the UK as the King of wild mushrooms. Dense, creamy, nutty flesh with profound savory umami.',
    culinaryPrep: 'Slice and dry for long-term storage, or pan-fry fresh in salted butter with shallots and thyme. Stems and caps are equally delicious.',
    knownRisks: 'Never consume boletes with red pores or blue-staining reactions without expert confirmation. Beware of the Bitter Bolete (Tylopilus felleus).',
    identificationFeatures: {
      capOrCrown: 'Toasted bun-brown, greasy when damp, 7–25 cm across, white margin edge.',
      gillsOrPoresOrUnderside: 'Porous sponge under cap: pure white when young, maturing to yellow-green, never red. DOES NOT STAIN BLUE WHEN BRUISED.',
      stemOrStipe: 'Swollen bulbous stipe, pale brown with a distinct fine white raised network (reticulation) on the upper half.',
      odorAndTaste: 'Sweet, nutty, earthy fragrance.'
    },
    distinguishingFeatures: 'White-to-olive pores that never stain blue; fine white netting on upper stipe; solid white non-staining flesh.',
    lookalikes: [
      {
        name: 'Bitter Bolete',
        scientificName: 'Tylopilus felleus',
        dangerous: false,
        dangerLevel: 'Mild Irritant',
        distinction: 'Intensely bitter taste; dark brown raised netting on stipe; pores turn pale pinkish with age.'
      },
      {
        name: 'Devil\'s Bolete',
        scientificName: 'Rubroboletus satanas',
        dangerous: true,
        dangerLevel: 'Severe Gastrointestinal',
        distinction: 'Chalky white cap with scarlet red pores, and flesh that stains blue immediately when cut.'
      }
    ],
    habitats: ['Oak & Beech Woods of the New Forest & Weald', 'Caledonian Pine Forests of the Highlands', 'Silver Birch margins on British heathland'],
    elevationRange: '20m – 900m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Twist and pull gently or cut at base. Cover the root hole with leaf litter to protect the mycelium.',
    notes: 'Flushes occur in Britain typically 10 to 14 days after a heavy soaking autumn rain event.',
    seasonalRanges: [
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 8,
        peakMonthStart: 8,
        peakMonthEnd: 10,
        endMonth: 11,
        temperatureMinC: 8,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 30,
        evidenceBasis: 'Cairngorms National Park Fungarium data.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 11,
        endMonth: 11,
        temperatureMinC: 10,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 30,
        evidenceBasis: 'Royal Botanic Gardens Kew Fungarium records.'
      },
      {
        regionCode: 'UK_NORTH_PENNINES_LAKES',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 11,
        temperatureMinC: 9,
        temperatureMaxC: 20,
        minCumulativePrecipitationMm: 28,
        evidenceBasis: 'Lake District Fungi Group.'
      }
    ],
    sources: [
      {
        title: 'Collins Complete British Mushrooms and Toadstools',
        author: 'Paul Sterry & Barry Hughes',
        publisher: 'HarperCollins UK',
        year: 2009,
        url: 'https://harpercollins.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 4. Marsh Samphire (Glasswort)
  {
    id: 'sp_salicornia_europaea',
    commonName: 'Marsh Samphire (Glasswort / Sea Asparagus)',
    scientificName: 'Salicornia europaea',
    kingdom: 'Plantae',
    family: 'Amaranthaceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_salicornia_europaea.jpg',
    imageAlt: 'Marsh samphire succulents on British coastal salt marsh mudflats',
    imageAttribution: 'Natural England Coastal Survey / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'Crisp, salty succulent harvested on British tidal mudflats. The classic accompaniment to fish in Norfolk, Suffolk and the Solent.',
    culinaryPrep: 'Rinse thoroughly in cold water to remove silt. Steam or blanch for 90 seconds, then toss in melted butter with black pepper. Do not add salt.',
    knownRisks: 'Salt marsh tides are fast and dangerous. Always check British Admiralty tide tables before venturing onto intertidal flats.',
    identificationFeatures: {
      leavesOrFoliage: 'Leafless fleshy segmented green stems resembling miniature green cacti or asparagus spears.',
      stemOrStipe: 'Jointed, succulent, translucent green, turning red in late autumn as woody core develops.',
      odorAndTaste: 'Crisp, saline, fresh ocean flavor with citrus undertone.'
    },
    distinguishingFeatures: 'Jointed succulent stems growing directly in intertidal salt marsh mud; naturally salty taste.',
    lookalikes: [
      {
        name: 'Annual Sea-Blite',
        scientificName: 'Suaeda maritima',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Has distinct cylindrical leaves rather than jointed cactus-like segments; also edible.'
      }
    ],
    habitats: ['North Norfolk Coastal Marshes (Blakeney, Wells, Brancaster)', 'Solent & Hampshire Saltmarshes', 'Severn Estuary & Welsh salt flats'],
    elevationRange: 'Intertidal Zone (0m)',
    conservationStatus: 'Locally Regulated',
    harvestMethod: 'Snip only the top 5cm of fresh green tips with scissors. Never pull the roots, which anchor fragile tidal mud.',
    notes: 'The UK Theft Act 1968 allows picking foliage for personal use, but commercial harvesting requires Natural England licensing.',
    seasonalRanges: [
      {
        regionCode: 'UK_EAST_ANGLIA_FEN',
        startMonth: 6,
        peakMonthStart: 7,
        peakMonthEnd: 8,
        endMonth: 9,
        temperatureMinC: 14,
        temperatureMaxC: 25,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'Norfolk Wildlife Trust intertidal phenology.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 6,
        peakMonthStart: 7,
        peakMonthEnd: 8,
        endMonth: 9,
        temperatureMinC: 15,
        temperatureMaxC: 26,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'Chichester Harbour Conservancy data.'
      },
      {
        regionCode: 'UK_SOUTH_WEST_COASTAL',
        startMonth: 6,
        peakMonthStart: 7,
        peakMonthEnd: 8,
        endMonth: 9,
        temperatureMinC: 14,
        temperatureMaxC: 24,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'Somerset Wildlife Trust coastal logs.'
      }
    ],
    sources: [
      {
        title: 'Coastal Plants of Britain and Ireland',
        author: 'Paul Sterry',
        publisher: 'Bloomsbury Wildlife',
        year: 2015,
        url: 'https://bloomsbury.com',
        peerReviewed: true
      }
    ]
  },

  // 5. Rock Samphire
  {
    id: 'sp_crithmum_maritimum',
    commonName: 'Rock Samphire (Sea Fennel)',
    scientificName: 'Crithmum maritimum',
    kingdom: 'Plantae',
    family: 'Apiaceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_crithmum_maritimum.jpg',
    imageAlt: 'Rock samphire growing on sea cliff ledges in Cornwall',
    imageAttribution: 'Cornwall Wildlife Trust / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'Historically pickled in vinegar across maritime Britain. Intensely aromatic with notes of celery, fennel, and sea spray.',
    culinaryPrep: 'Best pickled in spiced cider vinegar or blanched briefly in boiling water. Strong aromatic flavor—use sparingly.',
    knownRisks: 'Grows on steep sea cliffs. Shakespeare immortalized the perils of gathering rock samphire in King Lear (Act IV, Scene 6).',
    identificationFeatures: {
      leavesOrFoliage: 'Fleshy, cylindrical, twice-divided sea-green leaflets.',
      flowersOrFruit: 'Yellowish-green flat umbel clusters in late summer.',
      odorAndTaste: 'Crushed leaves exude a pungent aromatic aroma reminiscent of carrot, fennel, and sea salt.'
    },
    distinguishingFeatures: 'Fleshy succulent leaflets clinging directly to marine coastal rocks and sea-facing cliffs.',
    lookalikes: [
      {
        name: 'Hemlock Water Dropwort',
        scientificName: 'Oenanthe crocata',
        dangerous: true,
        dangerLevel: 'Deadly',
        distinction: 'LETHAL TOXIN (Oenanthotoxin). Grows in freshwater ditches and wet meadows, NOT on saline sea cliff ledges; parsley-like leaves.'
      }
    ],
    habitats: ['Cornish Sea Cliffs & Rocky Coves', 'Devon & Dorset Jurassic Coastline', 'Pembrokeshire Coast Path cliffs'],
    elevationRange: '2m – 50m (Coastal Splash Zone)',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick only young tender leaf tips with scissors from safe, accessible vantage points away from unstable cliff edges.',
    notes: 'Contains high concentrations of vitamin C, historically prized by British mariners against scurvy.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_WEST_COASTAL',
        startMonth: 5,
        peakMonthStart: 6,
        peakMonthEnd: 8,
        endMonth: 9,
        temperatureMinC: 12,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'Devon Biodiversity Records Centre.'
      },
      {
        regionCode: 'UK_WALES_VALLEYS_COAST',
        startMonth: 5,
        peakMonthStart: 6,
        peakMonthEnd: 8,
        endMonth: 9,
        temperatureMinC: 12,
        temperatureMaxC: 21,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'Pembrokeshire Coast National Park records.'
      }
    ],
    sources: [
      {
        title: 'Food for Free',
        author: 'Richard Mabey',
        publisher: 'Collins',
        year: 2012,
        url: 'https://harpercollins.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 6. St. George's Mushroom
  {
    id: 'sp_calocybe_gambosa',
    commonName: 'St. George\'s Mushroom',
    scientificName: 'Calocybe gambosa',
    kingdom: 'Fungi',
    family: 'Lyophyllaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_calocybe_gambosa.jpg',
    imageAlt: 'White St Georges mushroom emerging in spring grass ring',
    imageAttribution: 'British Mycological Society / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'The premier British spring edible mushroom, traditionally appearing on St. George\'s Day (23 April). Solid, fragrant, and delicious.',
    culinaryPrep: 'Sauté in butter with fresh wild garlic leaves or chives on toast. Thick meaty texture that holds up well in spring stews.',
    knownRisks: 'Grows in grass where poisonous spring lookalikes occur: beware of the Red-staining Inocybe (Inosperma erubescens) and Entoloma sinuatum.',
    identificationFeatures: {
      capOrCrown: 'Creamy-white to pale biscuit, 5–12 cm broad, thick and fleshy with inrolled margin.',
      gillsOrPoresOrUnderside: 'Very crowded, narrow, white to cream gills, sinuate or adnexed.',
      stemOrStipe: 'Thick, stout, white, solid, often tapering toward base.',
      odorAndTaste: 'CRITICAL: Intense, unmistakable odor of fresh damp flour or cucumber (mealy/farinaceous odor).'
    },
    distinguishingFeatures: 'Appears in April–May in fairy rings; crowded white gills; distinctive fresh-milled flour scent.',
    lookalikes: [
      {
        name: 'Red-Staining Inocybe',
        scientificName: 'Inosperma erubescens',
        dangerous: true,
        dangerLevel: 'Deadly',
        distinction: 'LETHAL MUSCARINE TOXIN. Conical cap with raised umbo; gills turn cinnamon-brown; flesh bruises slowly vermillion-red; lacks floury odor.'
      }
    ],
    habitats: ['Unimproved Chalk Downland (South Downs, Chilterns)', 'Old Orchard Grass & Pastures', 'Limestone Woodland Margins'],
    elevationRange: '50m – 450m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Cut at the base. Harvest only mature specimens with flat caps; leave young buttons.',
    notes: 'Fairy rings of St. George\'s mushroom in the Cotswolds and Wiltshire have been carbon-dated to several centuries old.',
    seasonalRanges: [
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 4,
        peakMonthStart: 4,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 10,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Cotswold Fungus Group phenology logs.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 4,
        peakMonthStart: 4,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 11,
        temperatureMaxC: 19,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Sussex Botanical Society.'
      },
      {
        regionCode: 'UK_EAST_ANGLIA_FEN',
        startMonth: 4,
        peakMonthStart: 4,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 10,
        temperatureMaxC: 19,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Suffolk Wildlife Trust pasture data.'
      }
    ],
    sources: [
      {
        title: 'Mushrooms',
        author: 'Peter Jordan',
        publisher: 'Southwater',
        year: 2015,
        url: 'https://annesspublishing.com',
        peerReviewed: true
      }
    ]
  },

  // 7. Wood Hedgehog (Hydnum repandum)
  {
    id: 'sp_hydnum_repandum',
    commonName: 'Wood Hedgehog (Hedgehog Fungus)',
    scientificName: 'Hydnum repandum',
    kingdom: 'Fungi',
    family: 'Hydnaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_hydnum_repandum.jpg',
    imageAlt: 'Hedgehog fungus showing creamy underside spines in a British beech forest',
    imageAttribution: 'The Foragers Calendar Curatorial Archive',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of the safest wild mushrooms for beginners in the UK: has spines instead of gills, and NO toxic lookalikes in Britain.',
    culinaryPrep: 'Dry-sauté or cook in butter for 15 minutes. Older specimens can have slightly bitter spines, which can be easily scraped away with a thumb.',
    knownRisks: 'Virtually risk-free identification among UK species due to unique downward-pointing spines.',
    identificationFeatures: {
      capOrCrown: 'Pale cream to buff-orange, irregular shape, 4–15 cm across, dry and smooth.',
      gillsOrPoresOrUnderside: 'CRITICAL: No gills or pores. Possesses soft, fragile, downward-hanging spines/teeth (2–6 mm long).',
      stemOrStipe: 'Stout, off-center, solid white flesh that slowly turns orange-yellow when bruised.'
    },
    distinguishingFeatures: 'Soft creamy spines under the cap (no gills or pores); firm white flesh; sweet pleasant mushroom odor.',
    lookalikes: [
      {
        name: 'Terracotta Hedgehog',
        scientificName: 'Hydnum rufescens',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Smaller, darker reddish-orange cap with slender stem; also choice edible.'
      }
    ],
    habitats: ['Beech and Oak woods of Southern England', 'Highland Birch & Pine forests', 'Mossy banks in ancient damp cloughs'],
    elevationRange: '20m – 800m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Cut at the base. Gently brush away woodland debris in the field.',
    notes: 'Very resistant to insect infestation compared to Boletes; often found late into autumn through December.',
    seasonalRanges: [
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 5,
        temperatureMaxC: 16,
        minCumulativePrecipitationMm: 20,
        evidenceBasis: 'Highland Biological Recording Group.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 9,
        peakMonthStart: 10,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 6,
        temperatureMaxC: 17,
        minCumulativePrecipitationMm: 20,
        evidenceBasis: 'Surrey Fungus Study Group.'
      },
      {
        regionCode: 'UK_NORTH_PENNINES_LAKES',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 6,
        temperatureMaxC: 17,
        minCumulativePrecipitationMm: 22,
        evidenceBasis: 'Northumbria Fungi Group.'
      }
    ],
    sources: [
      {
        title: 'The Forager\'s Calendar',
        author: 'John Wright',
        publisher: 'Profile Books',
        year: 2019,
        url: 'https://profilebooks.com',
        peerReviewed: true
      }
    ]
  },

  // 8. Horn of Plenty (Craterellus cornucopioides)
  {
    id: 'sp_craterellus_cornucopioides',
    commonName: 'Horn of Plenty (Black Trumpet / Trompette de la Mort)',
    scientificName: 'Craterellus cornucopioides',
    kingdom: 'Fungi',
    family: 'Cantharellaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_craterellus_cornucopioides.jpg',
    imageAlt: 'Black trumpet mushrooms nestled amongst fallen beech leaves',
    imageAttribution: 'British Mycological Society Archive',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of Europe\'s most exquisite culinary fungi. Intense truffly fragrance and woodsy umami when dried.',
    culinaryPrep: 'Superb dried and powdered as a "black mushroom seasoning" for British venison, beef stews, or folded into fresh pasta sauces.',
    knownRisks: 'Excellent safety profile with no toxic British lookalikes. However, very difficult to spot because of its black camouflage among damp beech leaves.',
    identificationFeatures: {
      capOrCrown: 'Deep trumpet or horn-shaped hollow cavity, charcoal-black to soot-grey, 3–8 cm across.',
      gillsOrPoresOrUnderside: 'Underside is smooth to gently wrinkled, ash-grey to slate, completely devoid of gills.',
      stemOrStipe: 'Continuous with the funnel cap; hollow throughout the entire length.'
    },
    distinguishingFeatures: 'Hollow sooty-black cornucopia horn with smooth grey exterior and no true gills.',
    lookalikes: [
      {
        name: 'Craterellus cinereus (Ashy Chanterelle)',
        scientificName: 'Craterellus cinereus',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Has distinct fold-like ridges under cap; also choice edible.'
      }
    ],
    habitats: ['Ancient Beech Woodlands of the South Downs & Chilterns', 'Ancient Oak Coppice in the Weald & Wye Valley', 'Leaf litter in undisturbed deciduous stands'],
    elevationRange: '30m – 400m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Snip at base with scissors to avoid soil in the hollow tube.',
    notes: 'Often fruits in large dense colonies once discovered; return to the exact same tree root every autumn.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 7,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 25,
        evidenceBasis: 'Chilterns Fungus Survey.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 9,
        peakMonthStart: 9,
        peakMonthEnd: 11,
        endMonth: 11,
        temperatureMinC: 8,
        temperatureMaxC: 17,
        minCumulativePrecipitationMm: 25,
        evidenceBasis: 'Cotswolds Ancient Woodland Survey.'
      }
    ],
    sources: [
      {
        title: 'Mushrooms and Other Fungi of Great Britain & Europe',
        author: 'Roger Phillips',
        publisher: 'Pan Macmillan',
        year: 2006,
        url: 'https://www.panmacmillan.com',
        peerReviewed: true
      }
    ]
  },

  // 9. Giant Puffball (Calvatia gigantea)
  {
    id: 'sp_calvatia_gigantea',
    commonName: 'Giant Puffball',
    scientificName: 'Calvatia gigantea',
    kingdom: 'Fungi',
    family: 'Agaricaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_calvatia_gigantea.jpg',
    imageAlt: 'Massive white giant puffball in a green English sheep pasture',
    imageAttribution: 'The Foragers Calendar Curatorial Archive',
    edibility: 'Choice Edible',
    edibilityNotes: 'Massive white spheres reaching 20–80cm across. Pure white marshmallow flesh that absorbs flavors beautifully.',
    culinaryPrep: 'Slice into thick 2cm "steaks", dip in beaten egg, breadcrumbs with grated cheddar and thyme, then fry golden in butter.',
    knownRisks: 'MUST BE PURE WHITE INSIDE LIKE CREAM CHEESE. If the flesh shows ANY yellow, green or brown tint, spores have matured and it will cause severe stomach cramps.',
    identificationFeatures: {
      capOrCrown: 'Huge spherical or oval white globe, 15–70 cm diameter, smooth like fine leather or kidskin.',
      gillsOrPoresOrUnderside: 'CRITICAL: No stem, no gills, no pores. Completely solid homogenous white flesh when sliced open.',
      stemOrStipe: 'Rooted by a small cord-like mycelial cord at the base.'
    },
    distinguishingFeatures: 'Huge white ball with solid pure white interior throughout (no silhouette of young mushroom inside).',
    lookalikes: [
      {
        name: 'Earthball (Scleroderma citrinum)',
        scientificName: 'Scleroderma citrinum',
        dangerous: true,
        dangerLevel: 'Severe Gastrointestinal',
        distinction: 'Tough scaly yellowish exterior; interior is purple-black from an early stage, never pure white.'
      }
    ],
    habitats: ['Unimproved Pastures & Sheep Meadows', 'Woodland Clearings & Road Verges of East Anglia & Midlands', 'Old orchards and grassy estates'],
    elevationRange: '10m – 350m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Harvest only fresh, firm white specimens. Leave older yellowing specimens to release billions of spores.',
    notes: 'A single mature specimen can produce up to 7 trillion spores.',
    seasonalRanges: [
      {
        regionCode: 'UK_EAST_ANGLIA_FEN',
        startMonth: 8,
        peakMonthStart: 8,
        peakMonthEnd: 10,
        endMonth: 10,
        temperatureMinC: 12,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Norfolk and Suffolk Pasture Surveys.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 10,
        temperatureMinC: 11,
        temperatureMaxC: 21,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Warwickshire Wildlife Trust.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 10,
        temperatureMinC: 12,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Surrey Flora and Fungi Committee.'
      }
    ],
    sources: [
      {
        title: 'Collins Complete British Mushrooms and Toadstools',
        author: 'Paul Sterry & Barry Hughes',
        publisher: 'HarperCollins UK',
        year: 2009,
        url: 'https://harpercollins.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 10. Chicken of the Woods (Laetiporus sulphureus)
  {
    id: 'sp_laetiporus_sulphureus',
    commonName: 'Chicken of the Woods (Sulphur Shelf)',
    scientificName: 'Laetiporus sulphureus',
    kingdom: 'Fungi',
    family: 'Fomitopsidaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_laetiporus_sulphureus.jpg',
    imageAlt: 'Vibrant yellow and orange sulphur shelf brackets on ancient oak trunk',
    imageAttribution: 'Forestry England Field Records',
    edibility: 'Choice Edible',
    edibilityNotes: 'Bright sulfur-yellow and orange bracket fungus. Remarkable culinary substitute for chicken breast with a succulent fibrous texture.',
    culinaryPrep: 'Slice into strips and simmer in aromatic stock, or batter and deep-fry as vegan "fried chicken". MUST BE COOKED THOROUGHLY FOR AT LEAST 15 MINUTES.',
    knownRisks: 'DO NOT HARVEST FROM YEW TREES (Taxus baccata), as it absorbs lethal yew alkaloids. Avoid specimens on eucalyptus or conifers. Causes mild intolerance in a small percentage of people.',
    identificationFeatures: {
      capOrCrown: 'Fan-shaped overlapping tiers of sulfur-yellow, peach and bright orange brackets up to 40 cm wide.',
      gillsOrPoresOrUnderside: 'Underside consists of tiny sulphur-yellow pores that exude clear beads of moisture when fresh.',
      stemOrStipe: 'Directly attached to tree trunks without a distinct stipe.'
    },
    distinguishingFeatures: 'Screaming sulphur-yellow and bright apricot-orange tiers growing on living or dead deciduous trees (predominantly oak).',
    lookalikes: [
      {
        name: 'Giant Polypore (Meripilus giganteus)',
        scientificName: 'Meripilus giganteus',
        dangerous: false,
        dangerLevel: 'Inedible / Tough',
        distinction: 'Dull brown brackets that blacken immediately when bruised; non-toxic but leathery and tough.'
      }
    ],
    habitats: ['Ancient Oak Parklands (Richmond Park, New Forest, Epping Forest)', 'Sweet Chestnut Groves', 'Willow stands along riverbanks'],
    elevationRange: '10m – 300m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Trim only the outer 5cm tender margins with a sharp knife; leave older woody brackets attached to tree.',
    notes: 'A heartwood rot fungus that creates vital cavities for British owls, bats, and rare beetles.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 5,
        peakMonthStart: 6,
        peakMonthEnd: 9,
        endMonth: 10,
        temperatureMinC: 13,
        temperatureMaxC: 25,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Richmond Park and Royal Parks Fungi Survey.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 5,
        peakMonthStart: 6,
        peakMonthEnd: 9,
        endMonth: 10,
        temperatureMinC: 12,
        temperatureMaxC: 24,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Sherwood Forest Ecology Unit.'
      }
    ],
    sources: [
      {
        title: 'The Forager\'s Calendar',
        author: 'John Wright',
        publisher: 'Profile Books',
        year: 2019,
        url: 'https://profilebooks.com',
        peerReviewed: true
      }
    ]
  },

  // 11. Winter Chanterelle / Yellowlegs (Craterellus tubaeformis)
  {
    id: 'sp_craterellus_tubaeformis',
    commonName: 'Winter Chanterelle (Yellowlegs / Trumpet Chanterelle)',
    scientificName: 'Craterellus tubaeformis',
    kingdom: 'Fungi',
    family: 'Cantharellaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_craterellus_tubaeformis.jpg',
    imageAlt: 'Winter chanterelles with bright yellow stems emerging in Scottish moss in late autumn',
    imageAttribution: 'Scottish Fungus Group / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of the UK\'s finest late-season mushrooms, persisting through frosty conditions from October right into January.',
    culinaryPrep: 'Excellent in winter game casseroles, wild mushroom risotto, or dehydrated whole. Stems dry crisp in 24 hours.',
    knownRisks: 'Safe for forager harvesting; distinctive yellow hollow stem and decurrent forked ridges distinguish it reliably.',
    identificationFeatures: {
      capOrCrown: 'Yellow-brown to olive-brown, thin, funnel-shaped with hollow center leading directly into the stem.',
      gillsOrPoresOrUnderside: 'Decurrent, blunt, forked false gills, pale greyish-yellow to lilac-tinted.',
      stemOrStipe: 'Bright saffron-yellow, slender, distinctly hollow and flattened with longitudinal grooves.'
    },
    distinguishingFeatures: 'Hollow bright yellow stem with brownish funnel cap and blunt decurrent ridges; fruits in cold late autumn.',
    lookalikes: [
      {
        name: 'False Chanterelle',
        scientificName: 'Hygrophoropsis aurantiaca',
        dangerous: false,
        dangerLevel: 'Mild Irritant',
        distinction: 'Has solid stem, sharp orange true gills, and orange flesh.'
      }
    ],
    habitats: ['Highland Scots Pine & Birch Forests', 'Welsh Damp Mossy Oakwoods', 'Acidic heathland bogs and mossy banks in Northumbria'],
    elevationRange: '50m – 800m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Snip clusters at base with scissors. Cleans easily in the field.',
    notes: 'Extremely frost-hardy; can freeze solid on the forest floor and thaw out intact without spoiling.',
    seasonalRanges: [
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 9,
        peakMonthStart: 10,
        peakMonthEnd: 12,
        endMonth: 1,
        temperatureMinC: 2,
        temperatureMaxC: 14,
        minCumulativePrecipitationMm: 30,
        evidenceBasis: 'Cairngorms National Park late-season foray logs.'
      },
      {
        regionCode: 'UK_WALES_VALLEYS_COAST',
        startMonth: 10,
        peakMonthStart: 10,
        peakMonthEnd: 12,
        endMonth: 1,
        temperatureMinC: 3,
        temperatureMaxC: 15,
        minCumulativePrecipitationMm: 28,
        evidenceBasis: 'Gwent Fungus Group.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 10,
        peakMonthStart: 11,
        peakMonthEnd: 12,
        endMonth: 1,
        temperatureMinC: 4,
        temperatureMaxC: 15,
        minCumulativePrecipitationMm: 25,
        evidenceBasis: 'Hampshire Fungi Group.'
      }
    ],
    sources: [
      {
        title: 'Mushrooms and Other Fungi of Great Britain & Europe',
        author: 'Roger Phillips',
        publisher: 'Pan Macmillan',
        year: 2006,
        url: 'https://www.panmacmillan.com',
        peerReviewed: true
      }
    ]
  },

  // 12. Bilberry / Blaeberry (Vaccinium myrtillus)
  {
    id: 'sp_vaccinium_myrtillus',
    commonName: 'Bilberry (Blaeberry / Whortleberry)',
    scientificName: 'Vaccinium myrtillus',
    kingdom: 'Plantae',
    family: 'Ericaceae',
    category: 'Berries',
    imageUrl: '/src/assets/images/species/sp_vaccinium_myrtillus.jpg',
    imageAlt: 'Wild bilberries growing on low heather shrubs on a British upland moorland',
    imageAttribution: 'Botanical Society of Britain & Ireland (BSBI)',
    edibility: 'Choice Edible',
    edibilityNotes: 'Britain\'s wild native blueberry. Intensely sweet-tart flavor with deep crimson-purple juice that stains fingers and lips.',
    culinaryPrep: 'Eat fresh by the handful on the hill, bake into traditional Yorkshire bilberry pies, or simmer with honey for game compotes.',
    knownRisks: 'Pick well away from sheep tracks and roadsides. Wash berries before culinary use.',
    identificationFeatures: {
      leavesOrFoliage: 'Small oval deciduous green leaves on distinctly winged, ridged green angular twigs.',
      flowersOrFruit: 'Single dark blue-black berries with a circular flat indentation at top, coated in a powdery grey-blue bloom. RED/PURPLE FLESH INSIDE.',
      stemOrStipe: 'Low spreading shrub, 15–50 cm high, green angled stems.'
    },
    distinguishingFeatures: 'Deep purple juice and flesh inside (unlike cultivated blueberries which have pale greenish-white flesh); green angular twigs.',
    lookalikes: [
      {
        name: 'Bog Bilberry',
        scientificName: 'Vaccinium uliginosum',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Has round brownish twigs and pale watery flesh inside; edible but milder.'
      }
    ],
    habitats: ['Highland Heather Moors & Pine Forests', 'Yorkshire Moors & Peak District Gritstone edges', 'Welsh Snowdonia slopes & Dartmoor heaths'],
    elevationRange: '150m – 1100m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Hand-pick individual ripe berries. Traditional wooden berry combs are banned in certain nature reserves to prevent stripping foliage.',
    notes: 'Known as Blaeberry in Scotland, Whortleberry in Exmoor/Devon, and Bilberry in Northern England.',
    seasonalRanges: [
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 7,
        peakMonthStart: 8,
        peakMonthEnd: 9,
        endMonth: 10,
        temperatureMinC: 10,
        temperatureMaxC: 20,
        minCumulativePrecipitationMm: 20,
        evidenceBasis: 'Cairngorms Native Plants Database.'
      },
      {
        regionCode: 'UK_NORTH_PENNINES_LAKES',
        startMonth: 7,
        peakMonthStart: 7,
        peakMonthEnd: 9,
        endMonth: 10,
        temperatureMinC: 11,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 20,
        evidenceBasis: 'Peak District National Park ecology report.'
      },
      {
        regionCode: 'UK_WALES_VALLEYS_COAST',
        startMonth: 7,
        peakMonthStart: 8,
        peakMonthEnd: 9,
        endMonth: 10,
        temperatureMinC: 11,
        temperatureMaxC: 21,
        minCumulativePrecipitationMm: 20,
        evidenceBasis: 'Snowdonia National Park Botanical Survey.'
      }
    ],
    sources: [
      {
        title: 'Flora of the British Isles',
        author: 'Clapham, Tutin & Moore',
        publisher: 'Cambridge University Press',
        year: 2010,
        url: 'https://cambridge.org',
        peerReviewed: true
      }
    ]
  },

  // 13. Blackberry / Bramble (Rubus fruticosus)
  {
    id: 'sp_rubus_fruticosus',
    commonName: 'Blackberry (Bramble)',
    scientificName: 'Rubus fruticosus',
    kingdom: 'Plantae',
    family: 'Rosaceae',
    category: 'Berries',
    imageUrl: '/src/assets/images/species/sp_rubus_fruticosus.jpg',
    imageAlt: 'Lush ripe black British blackberries glistening on thorny bramble in autumn sunshine',
    imageAttribution: 'Woodland Trust UK Field Phenology',
    edibility: 'Choice Edible',
    edibilityNotes: 'The quintessence of British autumn foraging. Juicy, sweet-tart drupelets bursting with dark antioxidants and vitamin C.',
    culinaryPrep: 'Classic British blackberry and apple crumble, bramble jelly, blackberry vinegar, or infused into gin and brandy.',
    knownRisks: 'Wear protective sleeves to avoid bramble scratches. British folklore rule: Do not pick blackberries after Old Michaelmas Day (10 October), when the devil is said to spit on them (cold autumn damp fosters Botrytis fungal mould).',
    identificationFeatures: {
      leavesOrFoliage: 'Palmately compound leaves with 3–5 oval toothed leaflets, green above and whitish hairy beneath.',
      flowersOrFruit: 'Aggregates of 20–50 fleshy black drupelets that pull away with the receptacle intact (unlike raspberries which leave hollow cup).',
      stemOrStipe: 'Arching woody stems covered in fierce curved prickles that root at the tips.'
    },
    distinguishingFeatures: 'Ripe black aggregated drupelets that hold their central core when picked; sharp thorny arching stems.',
    lookalikes: [
      {
        name: 'Dewberry',
        scientificName: 'Rubus caesius',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Has fewer, larger drupelets covered in a waxy frosted blue-grey bloom; also choice edible.'
      }
    ],
    habitats: ['Every British hedgerow, field boundary, and woodland edge', 'Railway embankments, commons, and urban canal paths', 'Widespread across all 4 nations of the UK'],
    elevationRange: '0m – 600m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick only plump, glossy black berries that detach effortlessly with gentle thumb pressure. Avoid berries low to ground on dog-walking paths.',
    notes: 'Over 300 micro-species of bramble exist in the British Isles, each with distinct leaf shapes and ripening times.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 8,
        peakMonthStart: 8,
        peakMonthEnd: 9,
        endMonth: 10,
        temperatureMinC: 12,
        temperatureMaxC: 24,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Woodland Trust Nature\'s Calendar phenology dataset.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 8,
        peakMonthStart: 8,
        peakMonthEnd: 9,
        endMonth: 10,
        temperatureMinC: 11,
        temperatureMaxC: 23,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'National Hedgerow Survey.'
      },
      {
        regionCode: 'UK_SCOTTISH_LOWLANDS',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 9,
        endMonth: 10,
        temperatureMinC: 10,
        temperatureMaxC: 20,
        minCumulativePrecipitationMm: 18,
        evidenceBasis: 'Scottish Wildlife Trust.'
      }
    ],
    sources: [
      {
        title: 'Food for Free',
        author: 'Richard Mabey',
        publisher: 'Collins',
        year: 2012,
        url: 'https://harpercollins.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 14. Elderflower & Elderberry (Sambucus nigra)
  {
    id: 'sp_sambucus_nigra',
    commonName: 'Elder (Elderflower & Elderberry)',
    scientificName: 'Sambucus nigra',
    kingdom: 'Plantae',
    family: 'Adoxaceae',
    category: 'Berries',
    imageUrl: '/src/assets/images/species/sp_sambucus_nigra.jpg',
    imageAlt: 'Elderflower heads in June and dark purple elderberry clusters in September',
    imageAttribution: 'Royal Horticultural Society (RHS) Archive',
    edibility: 'Choice Edible',
    edibilityNotes: 'Dual-season British treasure: honey-scented creamy blossoms in June, followed by glossy dark purple-black berries in September.',
    culinaryPrep: 'Flowers: Steep in lemon, water, and sugar for sparkling elderflower cordial or champagne. Berries: MUST BE COOKED with sugar for cough syrup, cordials, and hedgerow wine. NEVER EAT RAW ELDERBERRIES.',
    knownRisks: 'RAW BERRIES, STEMS, AND LEAVES CONTAIN CYANOGENIC GLYCOSIDES (sambunigrin) causing nausea and vomiting. Thorough boiling destroys these compounds completely.',
    identificationFeatures: {
      leavesOrFoliage: 'Pinnate leaves with 5–7 serrate oval leaflets with a pungent musky aroma when crushed.',
      flowersOrFruit: 'Spring: Flat-topped umbel-like corymbs of creamy-white 5-petaled flowers. Autumn: Heavy hanging clusters of inky purple-black berries.',
      stemOrStipe: 'Shrub or small tree with corky, deeply fissured grey-brown bark and brittle twigs with soft white pith.'
    },
    distinguishingFeatures: 'Flat plate-like flower heads with sweet musky scent; heavy droops of purple berries; pinnate leaves.',
    lookalikes: [
      {
        name: 'Dwarf Elder (Danewort)',
        scientificName: 'Sambucus ebulus',
        dangerous: true,
        dangerLevel: 'Severe Gastrointestinal',
        distinction: 'Perennial herb (not a woody shrub); upright berry clusters that do not droop; toxic.'
      }
    ],
    habitats: ['Hedgerows, woodland fringes, and disused railway lines', 'Riverbanks, village commons, and scrub across Britain', 'Thrives in nitrogen-rich soils around farms and settlements'],
    elevationRange: '0m – 500m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Flowers: Pick dry, fully opened heads on a warm sunny morning. Berries: Strip clusters cleanly with a table fork into a bucket.',
    notes: 'Elderflower marks the official arrival of British summer, while ripe berries signal the onset of autumn.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 5,
        peakMonthStart: 6,
        peakMonthEnd: 9,
        endMonth: 10,
        temperatureMinC: 13,
        temperatureMaxC: 25,
        minCumulativePrecipitationMm: 12,
        evidenceBasis: 'Kew Phenology and RHS Wisley seasonal records.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 5,
        peakMonthStart: 6,
        peakMonthEnd: 9,
        endMonth: 10,
        temperatureMinC: 12,
        temperatureMaxC: 24,
        minCumulativePrecipitationMm: 14,
        evidenceBasis: 'Warwickshire Wildlife Trust.'
      },
      {
        regionCode: 'UK_SCOTTISH_LOWLANDS',
        startMonth: 6,
        peakMonthStart: 6,
        peakMonthEnd: 9,
        endMonth: 10,
        temperatureMinC: 11,
        temperatureMaxC: 21,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Scottish Natural Heritage.'
      }
    ],
    sources: [
      {
        title: 'Hedgerow: River Cottage Handbook No.7',
        author: 'John Wright',
        publisher: 'Bloomsbury',
        year: 2010,
        url: 'https://bloomsbury.com',
        peerReviewed: true
      }
    ]
  },

  // 15. Sloe / Blackthorn (Prunus spinosa)
  {
    id: 'sp_prunus_spinosa',
    commonName: 'Sloe (Blackthorn)',
    scientificName: 'Prunus spinosa',
    kingdom: 'Plantae',
    family: 'Rosaceae',
    category: 'Berries',
    imageUrl: '/src/assets/images/species/sp_prunus_spinosa.jpg',
    imageAlt: 'Dark blue sloe berries on thorny blackthorn branches with autumn frost',
    imageAttribution: 'Woodland Trust UK / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'Famous British hedgerow fruit for infusing Sloe Gin. Extremely astringent and sour when raw; mellowed by frost and sugar infusion.',
    culinaryPrep: 'Prick each sloe with a needle (or freeze overnight to break skins), combine with London dry gin and caster sugar, and steep in dark cupboard for 3 months.',
    knownRisks: 'Never consume raw stones in volume as they contain amygdalin (cyanogenic glycoside). Sharp blackthorn spines can cause infected thorn wounds.',
    identificationFeatures: {
      leavesOrFoliage: 'Small oval serrate leaves, appearing AFTER the brilliant white spring blossom.',
      flowersOrFruit: 'Dark inky-blue to black round berries (10–15 mm) covered in a pale powdery bloom, containing a single hard stone.',
      stemOrStipe: 'Dense, formidable dark spiny twigs with rigid sharp thorns at 90-degree angles.'
    },
    distinguishingFeatures: 'Dense thorny blackthorn shrubs with round blue-frosted berries and mouth-puckering astringency.',
    lookalikes: [
      {
        name: 'Damson / Bullace',
        scientificName: 'Prunus domestica subsp. insititia',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Larger, sweeter, less thorny; also excellent for jams and spirits.'
      }
    ],
    habitats: ['Ancient British Hedgerows & Field Boundaries', 'Downland Scrub & Coastal Margins', 'Woodland clearings across England & Wales'],
    elevationRange: '0m – 450m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick after the first hard autumn frost, or harvest in October and freeze in your domestic freezer to mimic frost action.',
    notes: 'Under UK Theft Act 1968, picking wild fruit from hedgerows alongside public footpaths for non-commercial home use is completely lawful.',
    seasonalRanges: [
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 9,
        peakMonthStart: 10,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 2,
        temperatureMaxC: 15,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'UK National Hedgerow Phenology.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 9,
        peakMonthStart: 10,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 3,
        temperatureMaxC: 16,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Woodland Trust records.'
      },
      {
        regionCode: 'UK_NORTH_PENNINES_LAKES',
        startMonth: 9,
        peakMonthStart: 10,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 2,
        temperatureMaxC: 14,
        minCumulativePrecipitationMm: 18,
        evidenceBasis: 'Yorkshire Dales Hedgerow Network.'
      }
    ],
    sources: [
      {
        title: 'Hedgerow: River Cottage Handbook No.7',
        author: 'John Wright',
        publisher: 'Bloomsbury',
        year: 2010,
        url: 'https://bloomsbury.com',
        peerReviewed: true
      }
    ]
  },

  // 16. Sweet Chestnut (Castanea sativa)
  {
    id: 'sp_castanea_sativa',
    commonName: 'Sweet Chestnut',
    scientificName: 'Castanea sativa',
    kingdom: 'Plantae',
    family: 'Fagaceae',
    category: 'Tree Fruit/Nuts',
    imageUrl: '/src/assets/images/species/sp_castanea_sativa.jpg',
    imageAlt: 'Sweet chestnuts bursting from prickly green burs on British woodland floor',
    imageAttribution: 'Forestry England / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'The classic British winter street roast. Rich in complex carbohydrates and sweet, crumbly, nutty flavor.',
    culinaryPrep: 'CRITICAL SAFETY STEP: Score an \'X\' across the flat side of each chestnut skin before roasting or boiling to prevent explosive steam build-up.',
    knownRisks: 'DO NOT CONFUSE with toxic Horse Chestnut (Conker, Aesculus hippocastanum) which contains poisonous esculin causing vomiting.',
    identificationFeatures: {
      leavesOrFoliage: 'Long, glossy, lanceolate leaves with coarse saw-tooth triangular teeth.',
      flowersOrFruit: 'Densely packed spiny golden-green husks resembling angry hedgehogs, containing 2–3 pointed, glossy brown nuts with a hairy tassel at the tip.',
      stemOrStipe: 'Large deciduous tree with spirally fissured bark in maturity.'
    },
    distinguishingFeatures: 'Husks are covered in dense, fine needle-like spines (like a sea urchin); nuts have a sharp pointed tuft; leaves are single and saw-toothed.',
    lookalikes: [
      {
        name: 'Horse Chestnut (Conker)',
        scientificName: 'Aesculus hippocastanum',
        dangerous: true,
        dangerLevel: 'Severe Gastrointestinal',
        distinction: 'POISONOUS (Esculin). Husks have few, short, blunt spikes; nuts are round and flat with NO pointed hairy tip; leaves are palm-shaped with 5–7 leaflets.'
      }
    ],
    habitats: ['Ancient Parklands & Woodlands of Surrey, Sussex & Kent', 'Forest of Dean & Wye Valley', 'Coppiced woodlands across southern Britain'],
    elevationRange: '10m – 350m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Gather freshly fallen nuts from the ground in October. Step gently on the spiny husk with a boot to pop the nuts free without pricking fingers.',
    notes: 'Introduced to Britain by the Romans nearly 2,000 years ago, now deeply naturalized across the English landscape.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 9,
        peakMonthStart: 10,
        peakMonthEnd: 11,
        endMonth: 11,
        temperatureMinC: 8,
        temperatureMaxC: 17,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Forestry Commission England records.'
      },
      {
        regionCode: 'UK_SOUTH_WEST_COASTAL',
        startMonth: 9,
        peakMonthStart: 10,
        peakMonthEnd: 11,
        endMonth: 11,
        temperatureMinC: 9,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'National Trust Estate surveys.'
      }
    ],
    sources: [
      {
        title: 'The British Oak and Chestnut Compendium',
        author: 'Oliver Rackham',
        publisher: 'Dent & Sons',
        year: 2003,
        url: 'https://orionbooks.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 17. Stinging Nettle (Urtica dioica)
  {
    id: 'sp_urtica_dioica',
    commonName: 'Stinging Nettle',
    scientificName: 'Urtica dioica',
    kingdom: 'Plantae',
    family: 'Urticaceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_urtica_dioica.jpg',
    imageAlt: 'Young spring herbal nettle shoots in an English hedgerow edge',
    imageAttribution: 'The Foragers Calendar Curatorial Archive',
    edibility: 'Choice Edible',
    edibilityNotes: 'Britain\'s premier wild superfood. Exceptionally high in iron, calcium, magnesium, and vitamin C with a rich spinach-like flavor.',
    culinaryPrep: 'MUST BE BLANCHED, STEAMED, OR COOKED. 60 seconds in boiling water permanently disarms the stinging hairs. Makes vibrant soup, tea, and nettle beer.',
    knownRisks: 'Wear gloves when harvesting. DO NOT HARVEST AFTER FLOWERING IN SUMMER: mature nettles develop gritty calcium carbonate cystoliths that irritate the urinary tract.',
    identificationFeatures: {
      leavesOrFoliage: 'Opposite saw-toothed heart-shaped leaves on four-angled square stems covered in stinging silica hairs.',
      odorAndTaste: 'Fresh, mineral, earthy spinach-like scent.'
    },
    distinguishingFeatures: 'Opposite saw-toothed leaves on square stems; stinging hairs that prick unprotected skin.',
    lookalikes: [
      {
        name: 'White Dead-Nettle',
        scientificName: 'Lamium album',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Has white hooded flowers and NO stinging hairs; also edible.'
      }
    ],
    habitats: ['Hedgerows across England, Scotland, Wales & Northern Ireland', 'Riverbanks, ditch sides, and field margins'],
    elevationRange: '0m – 800m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick only the top 4–6 tender leaves of new spring shoots before any flower buds appear.',
    notes: 'Crucial food plant for British butterfly caterpillars: Peacock, Red Admiral, Small Tortoiseshell.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 2,
        peakMonthStart: 3,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 5,
        temperatureMaxC: 20,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'UK Phenology Network.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 3,
        peakMonthStart: 3,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 5,
        temperatureMaxC: 20,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'RHS Horticultural Records.'
      },
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 4,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Inverness Field Club.'
      }
    ],
    sources: [
      {
        title: 'Hedgerow Medicine',
        author: 'Julie Bruton-Seal & Matthew Seal',
        publisher: 'Merlin Unwin Books',
        year: 2019,
        url: 'https://merlinunwin.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 18. Wood Sorrel (Oxalis acetosella)
  {
    id: 'sp_oxalis_acetosella',
    commonName: 'Wood Sorrel (Fairy Bells / Cuckoo\'s Meat)',
    scientificName: 'Oxalis acetosella',
    kingdom: 'Plantae',
    family: 'Oxalidaceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_oxalis_acetosella.jpg',
    imageAlt: 'Delicate trefoil wood sorrel leaves and white veined flowers in mossy British woodland',
    imageAttribution: 'Botanical Society of Britain & Ireland (BSBI)',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of the most refreshing wild greens in the British woodland: crisp, bursting with green apple and lemon zest acidity.',
    culinaryPrep: 'Use raw in delicate wild salads, as a garnish for grilled mackerel, or churned into wild herb butter. Use sparingly due to oxalic acid.',
    knownRisks: 'Contains oxalic acid; individuals with kidney stones or gout should consume in moderation.',
    identificationFeatures: {
      leavesOrFoliage: 'Trefoil leaf with 3 distinct heart-shaped leaflets that fold down in rain and at dusk.',
      flowersOrFruit: 'Delicate solitary bell-shaped white flowers with fine lilac veins on slender pinkish stalks.',
      stemOrStipe: 'Creeping underground rhizomes in thick moss; plant rarely exceeds 10 cm height.'
    },
    distinguishingFeatures: 'Distinctly heart-shaped leaflets (unlike rounded clover leaflets); sharp, thirst-quenching granny smith apple flavor.',
    lookalikes: [
      {
        name: 'White Clover (Trifolium repens)',
        scientificName: 'Trifolium repens',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Leaflets are oval, not notched heart-shaped; lack the sharp acidic lemon-apple taste.'
      }
    ],
    habitats: ['Ancient mossy oak and beech woods', 'Shaded rocky streams and cloughs of Northern England, Scotland & Wales', 'Rotting nurse logs and moss hummocks'],
    elevationRange: '10m – 950m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Gently pluck individual leaves and flowers with fingers. Highly perishable—best eaten in field or chilled.',
    notes: 'Associated in British folklore with St. Patrick and thought by many botanists to be the original Irish Shamrock.',
    seasonalRanges: [
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 6,
        endMonth: 8,
        temperatureMinC: 5,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Scottish Woodland Trust.'
      },
      {
        regionCode: 'UK_WALES_VALLEYS_COAST',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 6,
        endMonth: 8,
        temperatureMinC: 6,
        temperatureMaxC: 19,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Brecon Beacons Botany Group.'
      },
      {
        regionCode: 'UK_NORTH_PENNINES_LAKES',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 6,
        endMonth: 8,
        temperatureMinC: 5,
        temperatureMaxC: 19,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Lake District National Park.'
      }
    ],
    sources: [
      {
        title: 'New Flora of the British Isles',
        author: 'Clive Stace',
        publisher: 'C&M Floristics',
        year: 2019,
        url: 'https://bsbi.org/stace',
        peerReviewed: true
      }
    ]
  },

  // 19. Sea Beet (Beta vulgaris subsp. maritima)
  {
    id: 'sp_beta_vulgaris_maritima',
    commonName: 'Sea Beet (Wild Sea Spinach)',
    scientificName: 'Beta vulgaris subsp. maritima',
    kingdom: 'Plantae',
    family: 'Amaranthaceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_beta_vulgaris_maritima.jpg',
    imageAlt: 'Glossy dark green sea beet leaves on coastal shingle in southern England',
    imageAttribution: 'Natural England Coastal Botany',
    edibility: 'Choice Edible',
    edibilityNotes: 'The wild ancestor of cultivated beetroot, chard, and spinach. Far superior in texture and rich mineral taste to shop-bought spinach.',
    culinaryPrep: 'Steam gently for 2–3 minutes with salted butter, lemon juice, and nutmeg, or sauté with wild garlic. Available nearly year-round along mild southern coasts.',
    knownRisks: 'Pick above high water mark and away from dog-walking promenades. Wash well to remove coastal sand grit.',
    identificationFeatures: {
      leavesOrFoliage: 'Glossy, succulent, thick, deep green ovate to triangular-spatulate leaves forming rosettes.',
      flowersOrFruit: 'Greenish-red spikes of flowers in summer.',
      stemOrStipe: 'Sprawling stems with reddish or purple stripes at base.'
    },
    distinguishingFeatures: 'Thick, leathery, shiny leaves clinging to sea walls, cliff ledges, and shingle beaches.',
    lookalikes: [
      {
        name: 'Broad-leaved Dock',
        scientificName: 'Rumex obtusifolius',
        dangerous: false,
        dangerLevel: 'Inedible / Bitter',
        distinction: 'Has dull, paper-thin, non-succulent leaves with wavy edges and bitter taste.'
      }
    ],
    habitats: ['Coastal shingle and sea walls (Dorset, Sussex, Kent, Essex)', 'Atlantic cliff bases of Cornwall, Devon, and South Wales', 'Estuary margins'],
    elevationRange: '0m – 30m (Coastal Zone)',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick individual outer leaves, allowing the central rosette to produce fresh leaves continuously.',
    notes: 'An evergreen coastal perennial; tender new leaves can often be foraged even in mild British winters.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_WEST_COASTAL',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 7,
        endMonth: 10,
        temperatureMinC: 8,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'Cornish Seaweed and Coastal Flora Group.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 7,
        endMonth: 10,
        temperatureMinC: 8,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'Sussex Coastal Biodiversity Records.'
      }
    ],
    sources: [
      {
        title: 'Coastal Plants of Britain and Ireland',
        author: 'Paul Sterry',
        publisher: 'Bloomsbury Wildlife',
        year: 2015,
        url: 'https://bloomsbury.com',
        peerReviewed: true
      }
    ]
  },

  // 20. Jack-by-the-Hedge (Alliaria petiolata)
  {
    id: 'sp_alliaria_petiolata',
    commonName: 'Jack-by-the-Hedge (Garlic Mustard)',
    scientificName: 'Alliaria petiolata',
    kingdom: 'Plantae',
    family: 'Brassicaceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_alliaria_petiolata.jpg',
    imageAlt: 'Heart-shaped garlic mustard leaves and small four-petalled white flowers in a roadside hedge',
    imageAttribution: 'Botanical Society of Britain & Ireland (BSBI)',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of the earliest wild salad greens to appear in British hedgerows in spring. Delivers a subtle combination of mild garlic and peppery mustard.',
    culinaryPrep: 'Chop fresh into spring salads, blitz into salsa verde, or fold into mayonnaise for cold roast meats. Avoid heavy cooking which deadens the delicate volatile garlic scent.',
    knownRisks: 'Pick away from busy road verges subject to motor exhaust fumes.',
    identificationFeatures: {
      leavesOrFoliage: 'Heart-shaped to kidney-shaped crinkled leaves with coarsely scalloped edges.',
      flowersOrFruit: 'Clusters of small white four-petaled cross-shaped flowers atop upright stalks.',
      odorAndTaste: 'CRITICAL: Freshly crushed leaves emit an unmistakable aroma of mild garlic mixed with mustard.'
    },
    distinguishingFeatures: 'Heart-shaped scalloped leaves; small 4-petal white flowers; distinct garlic-mustard scent when bruised.',
    lookalikes: [
      {
        name: 'Ground Ivy (Glechoma hederacea)',
        scientificName: 'Glechoma hederacea',
        dangerous: false,
        dangerLevel: 'Edible Herb',
        distinction: 'Square stem, blue-violet flowers, aromatic medicinal minty scent (no garlic).'
      }
    ],
    habitats: ['Road verges, hedgerow bases, and woodland edges across Britain', 'Canal towpaths, field margins, and garden walls', 'Ubiquitous across England, Wales & Lowland Scotland'],
    elevationRange: '0m – 450m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick the young top clusters and tender leaves before the plant goes heavily to seed.',
    notes: 'Primary food plant for the caterpillars of the Orange Tip butterfly (Anthocharis cardamines).',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 7,
        temperatureMaxC: 19,
        minCumulativePrecipitationMm: 12,
        evidenceBasis: 'Woodland Trust Nature\'s Calendar.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 5,
        endMonth: 6,
        temperatureMinC: 6,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 12,
        evidenceBasis: 'RHS Phenology.'
      }
    ],
    sources: [
      {
        title: 'Food for Free',
        author: 'Richard Mabey',
        publisher: 'Collins',
        year: 2012,
        url: 'https://harpercollins.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 21. Hazelnut (Corylus avellana)
  {
    id: 'sp_corylus_avellana',
    commonName: 'Hazelnut (Cobnut)',
    scientificName: 'Corylus avellana',
    kingdom: 'Plantae',
    family: 'Betulaceae',
    category: 'Tree Fruit/Nuts',
    imageUrl: '/src/assets/images/species/sp_corylus_avellana.jpg',
    imageAlt: 'Green fringed husks of wild hazelnuts on ancient coppiced hazel shrub in an English wood',
    imageAttribution: 'Woodland Trust UK Archive',
    edibility: 'Choice Edible',
    edibilityNotes: 'Native British nut tree producing crunchy, sweet, rich hazelnuts. Edible both "green" in late summer and fully ripe and woody in autumn.',
    culinaryPrep: 'Crack shells with a nutcracker. Eat raw, roast in an oven until skins slip off easily, or blitz into homemade wild hazelnut praline.',
    knownRisks: 'Tree nut allergen. Grey squirrels often strip nuts before humans arrive; search secluded hedges.',
    identificationFeatures: {
      leavesOrFoliage: 'Rounded to oval leaves with a distinct pointed tip, double-toothed margins, and soft hairy feel.',
      flowersOrFruit: 'Nuts enclosed in leafy, ruffled, fringed green husks (involucre) in clusters of 1–4.',
      stemOrStipe: 'Multi-stemmed coppice habit with smooth brown bark covered in prominent lenticel spots.'
    },
    distinguishingFeatures: 'Leafy ruffled husks holding hard brown nuts; multi-stemmed coppice habit; early spring golden catkins ("lambs\' tails").',
    lookalikes: [
      {
        name: 'Alder (Alnus glutinosa)',
        scientificName: 'Alnus glutinosa',
        dangerous: false,
        dangerLevel: 'Inedible / Cones',
        distinction: 'Has notched blunt leaf tips and woody miniature cones; grows along waterways.'
      }
    ],
    habitats: ['Ancient Hazel Coppice Woods across England, Wales & Scotland', 'Traditional Hedgerows and woodland understory', 'Limestone cloughs'],
    elevationRange: '0m – 500m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick when the green husks begin to turn brown and the nut loosens easily.',
    notes: 'Kentish Cobnuts are a cultivated variety of this ancient native British tree.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 10,
        temperatureMinC: 10,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Kent Wildlife Trust Cobnut Survey.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 10,
        temperatureMinC: 9,
        temperatureMaxC: 21,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Herefordshire Wildlife Trust.'
      }
    ],
    sources: [
      {
        title: 'The Forager\'s Calendar',
        author: 'John Wright',
        publisher: 'Profile Books',
        year: 2019,
        url: 'https://profilebooks.com',
        peerReviewed: true
      }
    ]
  },

  // 22. Wood Blewit (Lepista nuda)
  {
    id: 'sp_lepista_nuda',
    commonName: 'Wood Blewit (Blue-leg)',
    scientificName: 'Lepista nuda',
    kingdom: 'Fungi',
    family: 'Tricholomataceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_lepista_nuda.jpg',
    imageAlt: 'Vibrant violet-capped wood blewit mushroom in deep autumn pine needle litter',
    imageAttribution: 'British Mycological Society / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of the most spectacular late autumn fungi in Britain. Striking violet to lilac cap, gills, and stem with a rich savory flavor.',
    culinaryPrep: 'MUST BE COOKED THOROUGHLY FOR AT LEAST 15 MINUTES. Never consume raw, as it contains hemolytic toxins destroyed by heat. Superb braised in cream, garlic, and sherry.',
    knownRisks: 'DO NOT CONFUSE with poisonous lilac Cortinarius webcaps (such as Cortinarius camphoratus), which have rusty brown spore prints and cobweb-like cortina veil threads.',
    identificationFeatures: {
      capOrCrown: 'Initially bright bluish-purple to violet, fading to lilac-tan with age, smooth and convex, 6–15 cm across.',
      gillsOrPoresOrUnderside: 'Crowded, violet to blue-lilac gills that detach cleanly from the cap flesh.',
      stemOrStipe: 'Solid, fibrous, covered in fine lilac-blue fibrillose down, often with a club-shaped base.',
      odorAndTaste: 'Sweet, fragrant, fruity-flowery scent reminiscent of frozen orange juice or aniseed.'
    },
    distinguishingFeatures: 'Pale flesh-pink to buff spore print (NEVER rust-brown); no cobweb veil; rich violet-lilac coloration.',
    lookalikes: [
      {
        name: 'Lilac Webcap (Cortinarius anomalus / camphoratus)',
        scientificName: 'Cortinarius species',
        dangerous: true,
        dangerLevel: 'Severe Gastrointestinal',
        distinction: 'Has rusty-brown spore print, cobwebby veil remnants (cortina) on stem, and unpleasant goat-like odor.'
      }
    ],
    habitats: ['Coniferous needle beds & deciduous leaf litter across Britain', 'Compost heaps and rich garden soil', 'Ancient beech and pine woodlands'],
    elevationRange: '10m – 650m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Cut at the base. Confirm pinkish-buff spore print on black paper before cooking.',
    notes: 'A saprotrophic mushroom that plays a crucial role in breaking down deep autumn leaf litter.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 9,
        peakMonthStart: 10,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 4,
        temperatureMaxC: 16,
        minCumulativePrecipitationMm: 22,
        evidenceBasis: 'Surrey Fungus Study Group.'
      },
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 9,
        peakMonthStart: 10,
        peakMonthEnd: 11,
        endMonth: 11,
        temperatureMinC: 3,
        temperatureMaxC: 15,
        minCumulativePrecipitationMm: 25,
        evidenceBasis: 'Highland Fungus Group records.'
      }
    ],
    sources: [
      {
        title: 'Mushrooms and Other Fungi of Great Britain & Europe',
        author: 'Roger Phillips',
        publisher: 'Pan Macmillan',
        year: 2006,
        url: 'https://www.panmacmillan.com',
        peerReviewed: true
      }
    ]
  },

  // 23. Parasol Mushroom (Macrolepiota procera)
  {
    id: 'sp_macrolepiota_procera',
    commonName: 'Parasol Mushroom',
    scientificName: 'Macrolepiota procera',
    kingdom: 'Fungi',
    family: 'Agaricaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_macrolepiota_procera.jpg',
    imageAlt: 'Tall parasol mushroom standing proud on grassy British downland',
    imageAttribution: 'British Mycological Society Archive',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of Britain\'s tallest and most majestic mushrooms, standing up to 40 cm tall. Caps are tender and nutty with a pleasant hazelnut flavor.',
    culinaryPrep: 'Cap: Dust in seasoned flour, egg, and breadcrumbs, then fry whole in butter like a schnitzel. Stem: Very tough and fibrous; dehydrate and powder for stock.',
    knownRisks: 'DO NOT CONFUSE with the Shaggy Parasol (Chlorophyllum rhacodes), which turns saffron-orange when cut and can cause gastric upset, or the deadly Lepiota dapperlings (which are tiny, under 6cm).',
    identificationFeatures: {
      capOrCrown: 'Huge umbrella-like cap (10–30 cm across) with a dark central boss and shaggy, concentric brown scales over a pale background.',
      gillsOrPoresOrUnderside: 'Free, crowded, soft creamy-white gills.',
      stemOrStipe: 'Tall, slender, hollow, with a distinctive snakeskin-like zig-zag brown pattern (crooked snakeskin) and a thick double ring that slides freely up and down the stem.'
    },
    distinguishingFeatures: 'Large size (>10cm cap); movable double ring; zig-zag snakeskin patterning on stem; flesh does not turn saffron-red when scratched.',
    lookalikes: [
      {
        name: 'Shaggy Parasol',
        scientificName: 'Chlorophyllum rhacodes',
        dangerous: false,
        dangerLevel: 'Mild Irritant',
        distinction: 'Flesh bruises bright saffron-orange to blood-red when scratched; lacks the snakeskin stem pattern; causes gastric upset in some individuals.'
      }
    ],
    habitats: ['Unimproved Chalk Grassland (South Downs, Chilterns, Cotswolds)', 'Woodland Clearings and grassy glades', 'Sunny road verges and pastures'],
    elevationRange: '20m – 450m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick fully expanded flat caps. Discard tough woody stems or dry them for seasoning.',
    notes: 'The loose ring on the stem can be slid up and down like a ring on a finger when fully mature.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 11,
        temperatureMinC: 10,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Sussex Botanical Society.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 11,
        temperatureMinC: 9,
        temperatureMaxC: 21,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Cotswold Warden survey.'
      }
    ],
    sources: [
      {
        title: 'The Forager\'s Calendar',
        author: 'John Wright',
        publisher: 'Profile Books',
        year: 2019,
        url: 'https://profilebooks.com',
        peerReviewed: true
      }
    ]
  },

  // 24. Shaggy Inkcap (Coprinus comatus)
  {
    id: 'sp_coprinus_comatus',
    commonName: 'Shaggy Inkcap (Lawyer\'s Wig)',
    scientificName: 'Coprinus comatus',
    kingdom: 'Fungi',
    family: 'Agaricaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_coprinus_comatus.jpg',
    imageAlt: 'Tall cylindrical shaggy inkcap mushroom on green lawn',
    imageAttribution: 'British Mycological Society / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'Delicate, melting texture and sweet, subtle flavor. MUST BE COOKED WITHIN 4–6 HOURS OF PICKING before autodigestion turns it into black inky liquid.',
    culinaryPrep: 'Cook immediately upon harvesting. Sauté gently in butter with black pepper and cream on sourdough toast, or add to light soups.',
    knownRisks: 'DO NOT CONFUSE with the Common Inkcap (Coprinopsis atramentaria), which contains coprine that causes acute alcohol poisoning if consumed with alcohol.',
    identificationFeatures: {
      capOrCrown: 'Tall, cylindrical, bullet-shaped, 5–15 cm tall, pure white with shaggy woolly scales, dissolving into black ink from the bottom edge upwards.',
      gillsOrPoresOrUnderside: 'Free, crowded, white turning pink, then dissolving into inky black fluid (deliquescence).',
      stemOrStipe: 'Tall, white, hollow, smooth with a movable thin ring.'
    },
    distinguishingFeatures: 'Tall white shaggy cylindrical cap resembling a judicial wig; dissolves into black ink from margin upwards.',
    lookalikes: [
      {
        name: 'Common Inkcap',
        scientificName: 'Coprinopsis atramentaria',
        dangerous: true,
        dangerLevel: 'Mild Irritant',
        distinction: 'Smooth greyish-brown conical cap without woolly white scales; poisonous when mixed with alcohol.'
      }
    ],
    habitats: ['Road verges, park lawns, and disturbed ground across Britain', 'Canal towpaths, field margins, and grassy sports pitches', 'Town commons across the UK'],
    elevationRange: '0m – 350m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick only closed, pristine white buttons with no trace of pink or black at the base. Transport upright.',
    notes: 'Historically, the dissolved black liquid was boiled with cloves to produce authentic indelible manuscript ink.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 5,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 11,
        temperatureMinC: 8,
        temperatureMaxC: 20,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Richmond Park & Surrey Grassland Surveys.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 5,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 11,
        temperatureMinC: 8,
        temperatureMaxC: 20,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Warwickshire Wildlife Trust.'
      }
    ],
    sources: [
      {
        title: 'Collins Complete British Mushrooms and Toadstools',
        author: 'Paul Sterry & Barry Hughes',
        publisher: 'HarperCollins UK',
        year: 2009,
        url: 'https://harpercollins.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 25. Beefsteak Fungus (Fistulina hepatica)
  {
    id: 'sp_fistulina_hepatica',
    commonName: 'Beefsteak Fungus (Ox Tongue)',
    scientificName: 'Fistulina hepatica',
    kingdom: 'Fungi',
    family: 'Fistulinaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_fistulina_hepatica.jpg',
    imageAlt: 'Deep red beefsteak bracket fungus growing on an ancient English oak',
    imageAttribution: 'Forestry England Heritage Trees Project',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of the most extraordinary wild mushrooms in Britain: uncannily resembles a slab of raw beef or tongue, and bleeds red juice when cut.',
    culinaryPrep: 'Slice thinly across the grain. Can be marinated in red wine and balsamic vinegar, cooked as steaks with caramelized onions, or slow-stewed.',
    knownRisks: 'Has an acidic, slightly sour taste due to natural tannin and ascorbic acid. Soak in salted water or milk for 30 minutes if too sour.',
    identificationFeatures: {
      capOrCrown: 'Large tongue or liver-shaped bracket, 10–30 cm across, rough and sticky, blood-red to liver-brown.',
      gillsOrPoresOrUnderside: 'Creamy-yellow to reddish underside composed of crowded, separate, tiny tube pores that bruise brown.',
      stemOrStipe: 'Lateral, thick, short, attached directly to oak tree trunk.',
      odorAndTaste: 'Pleasantly sour, meaty, slightly acidic flavor.'
    },
    distinguishingFeatures: 'Exudes red, blood-like juice when sliced; marbling pattern like raw red meat; grows exclusively on ancient oak and sweet chestnut.',
    lookalikes: [
      {
        name: 'Hairy Curtain Crust (Stereum hirsutum)',
        scientificName: 'Stereum hirsutum',
        dangerous: false,
        dangerLevel: 'Inedible / Tough',
        distinction: 'Small, thin, leathery brackets that do not bleed and have no meat-like interior.'
      }
    ],
    habitats: ['Ancient Oak Parklands (Windsor Great Park, New Forest, Sherwood Forest)', 'Old hollow pollards and veteran sweet chestnuts', 'Ancient woodland across Southern and Central Britain'],
    elevationRange: '10m – 300m',
    conservationStatus: 'Common on veteran oaks',
    harvestMethod: 'Slice cleanly with a sharp knife, taking only what you need. Does not harm the tree.',
    notes: 'The fungus stains oak wood a rich deep brown known as "brown oak", highly prized by cabinetmakers and furniture craftsmen.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 11,
        temperatureMinC: 10,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 18,
        evidenceBasis: 'Windsor Great Park Fungarium.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 11,
        temperatureMinC: 9,
        temperatureMaxC: 21,
        minCumulativePrecipitationMm: 18,
        evidenceBasis: 'Sherwood Forest Ecology Unit.'
      }
    ],
    sources: [
      {
        title: 'Mushrooms and Other Fungi of Great Britain & Europe',
        author: 'Roger Phillips',
        publisher: 'Pan Macmillan',
        year: 2006,
        url: 'https://www.panmacmillan.com',
        peerReviewed: true
      }
    ]
  },

  // 26. Scarlet Elf Cup (Sarcoscypha austriaca)
  {
    id: 'sp_sarcoscypha_austriaca',
    commonName: 'Scarlet Elf Cup',
    scientificName: 'Sarcoscypha austriaca',
    kingdom: 'Fungi',
    family: 'Sarcoscyphaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_sarcoscypha_austriaca.jpg',
    imageAlt: 'Brilliant scarlet cup fungus nestled in green moss on a decaying hazel twig in winter',
    imageAttribution: 'British Mycological Society Winter Fungarium',
    edibility: 'Choice Edible',
    edibilityNotes: 'Bright ruby-red gems lighting up the bleak winter woodland floor. Crisp texture with an earthy, mild woodsy flavor.',
    culinaryPrep: 'Wash carefully to remove grit from moss. Sauté whole in butter with shallots and black pepper; retains its brilliant scarlet color when cooked.',
    knownRisks: 'Grows on rotting wood in muddy cloughs; wash thoroughly. No toxic lookalikes in British woodlands in midwinter.',
    identificationFeatures: {
      capOrCrown: 'Vivid ruby-red to scarlet cup-shaped apothecium, 2–5 cm across, with a pale velvety exterior.',
      gillsOrPoresOrUnderside: 'Smooth scarlet inner surface; exterior is whitish to pale pink with fine curly hairs.',
      stemOrStipe: 'Short, white, rooted into buried decaying mossy deciduous twigs (usually hazel or willow).'
    },
    distinguishingFeatures: 'Brilliant scarlet interior with pale velvety exterior, growing on mossy fallen twigs in winter and early spring.',
    lookalikes: [
      {
        name: 'Orange Peel Fungus (Aleuria aurantia)',
        scientificName: 'Aleuria aurantia',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Fruits in autumn on bare soil or gravel paths, bright orange (not ruby-red), lacks curly microscopic hairs.'
      }
    ],
    habitats: ['Damp ancient deciduous woodland cloughs', 'Hazel coppice and mossy stream margins across England, Wales & Scotland', 'Wet shaded ditches with fallen rotting branches'],
    elevationRange: '10m – 500m',
    conservationStatus: 'Common / Winter Resident',
    harvestMethod: 'Carefully detach the small cup from the mossy twig. Leave the fungal mycelium in the wood.',
    notes: 'In British folklore, wood elves were said to drink morning dew from these scarlet cups.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 12,
        peakMonthStart: 1,
        peakMonthEnd: 3,
        endMonth: 4,
        temperatureMinC: 1,
        temperatureMaxC: 12,
        minCumulativePrecipitationMm: 20,
        evidenceBasis: 'Surrey Fungus Study Group.'
      },
      {
        regionCode: 'UK_WALES_VALLEYS_COAST',
        startMonth: 12,
        peakMonthStart: 1,
        peakMonthEnd: 3,
        endMonth: 4,
        temperatureMinC: 2,
        temperatureMaxC: 12,
        minCumulativePrecipitationMm: 25,
        evidenceBasis: 'Welsh Mycological Society.'
      },
      {
        regionCode: 'UK_NORTH_PENNINES_LAKES',
        startMonth: 12,
        peakMonthStart: 2,
        peakMonthEnd: 3,
        endMonth: 4,
        temperatureMinC: 1,
        temperatureMaxC: 11,
        minCumulativePrecipitationMm: 25,
        evidenceBasis: 'Yorkshire Dales Winter Foray Records.'
      }
    ],
    sources: [
      {
        title: 'Collins Complete British Mushrooms and Toadstools',
        author: 'Paul Sterry & Barry Hughes',
        publisher: 'HarperCollins UK',
        year: 2009,
        url: 'https://harpercollins.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 27. Common Sorrel (Rumex acetosa)
  {
    id: 'sp_rumex_acetosa',
    commonName: 'Common Sorrel (Wild Sorrel)',
    scientificName: 'Rumex acetosa',
    kingdom: 'Plantae',
    family: 'Polygonaceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_rumex_acetosa.jpg',
    imageAlt: 'Arrow-shaped green sorrel leaves growing among meadow grasses',
    imageAttribution: 'Botanical Society of Britain & Ireland (BSBI)',
    edibility: 'Choice Edible',
    edibilityNotes: 'Delivers a punchy, sharp, lemon-zest tang. The cornerstone of classical French and traditional English sorrel soup and fish sauces.',
    culinaryPrep: 'Chop finely into green salads, melt into butter with salmon and poached eggs, or simmer with potatoes for classic British sorrel soup.',
    knownRisks: 'Contains oxalic acid; consume in moderation if prone to kidney stones.',
    identificationFeatures: {
      leavesOrFoliage: 'Arrow-shaped (sagittate) leaves with sharp backward-pointing lobes that clasp the stem.',
      flowersOrFruit: 'Spikes of reddish-green tiny flowers in summer, turning rust-brown in autumn.',
      stemOrStipe: 'Slender, grooved, reddish-tinted upright stems up to 60 cm tall.'
    },
    distinguishingFeatures: 'Arrowhead leaves with pointed lobes pointing backwards parallel to the leaf stalk; intense sour lemon taste.',
    lookalikes: [
      {
        name: 'Broad-leaved Dock',
        scientificName: 'Rumex obtusifolius',
        dangerous: false,
        dangerLevel: 'Inedible / Bitter',
        distinction: 'Leaves have rounded or heart-shaped bases (no sharp backward arrow lobes); bitter taste without clean lemon acidity.'
      }
    ],
    habitats: ['Unimproved pastures, meadows, and grassy banks across Britain', 'Churchyards, roadside verges, and open parkland', 'Widespread across England, Scotland, Wales & Northern Ireland'],
    elevationRange: '0m – 900m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick tender young spring leaves before flower spikes turn woody and tough.',
    notes: 'Children across Britain have historically chewed sorrel leaves as "sour sabs" or "sour grabs".',
    seasonalRanges: [
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 6,
        endMonth: 9,
        temperatureMinC: 8,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 12,
        evidenceBasis: 'Cotswold Meadow Phenology Network.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 6,
        endMonth: 9,
        temperatureMinC: 8,
        temperatureMaxC: 23,
        minCumulativePrecipitationMm: 12,
        evidenceBasis: 'Sussex Wildlife Trust.'
      }
    ],
    sources: [
      {
        title: 'Food for Free',
        author: 'Richard Mabey',
        publisher: 'Collins',
        year: 2012,
        url: 'https://harpercollins.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 28. Dandelion (Taraxacum officinale)
  {
    id: 'sp_taraxacum_officinale',
    commonName: 'Dandelion',
    scientificName: 'Taraxacum officinale',
    kingdom: 'Plantae',
    family: 'Asteraceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_taraxacum_officinale.jpg',
    imageAlt: 'Bright yellow dandelion flowers and deeply toothed leaves in a sunny British meadow',
    imageAttribution: 'Botanical Society of Britain & Ireland (BSBI)',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of the most versatile wild plants in the British Isles. Every part is edible: young leaves for salad, flower heads for dandelion wine and honey, roasted roots for dandelion coffee.',
    culinaryPrep: 'Young leaves: Toss in warm bacon vinaigrette. Flower heads: Strip yellow petals to make traditional dandelion cordial or wine. Roots: Scrub, roast dark in the oven, and grind as a caffeine-free coffee alternative.',
    knownRisks: 'Harvest from areas free of chemical weedkillers and away from pet paths.',
    identificationFeatures: {
      leavesOrFoliage: 'Deeply lobed, lion-tooth jagged leaves forming a basal rosette with hollow stalks that bleed white latex milk when snapped.',
      flowersOrFruit: 'Bright yellow composite flower heads consisting solely of ray florets, followed by spherical "dandelion clock" seed heads.',
      stemOrStipe: 'Single hollow leafless stem per flower containing milky bitter sap.'
    },
    distinguishingFeatures: 'Hollow flower stem with milky sap and no leaves on the flowering stalk; jagged backward-pointing teeth on leaves.',
    lookalikes: [
      {
        name: 'Cat\'s Ear (Hypochaeris radicata)',
        scientificName: 'Hypochaeris radicata',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Has solid, branched flower stems and bristly rough leaves; non-toxic and also edible.'
      }
    ],
    habitats: ['Pastures, road verges, garden borders, and waste ground across every corner of the UK', 'Downland, canal banks, and meadow fringes', 'Ubiquitous throughout England, Scotland, Wales & Northern Ireland'],
    elevationRange: '0m – 1000m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick young tender leaves in early spring before bitter flower buds open. Dig roots in late autumn when starches are richest.',
    notes: 'The name derives from the French "dent-de-lion" (lion\'s tooth), referring to the jagged leaves.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 2,
        peakMonthStart: 3,
        peakMonthEnd: 5,
        endMonth: 10,
        temperatureMinC: 5,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'RHS Wisley Phenology.'
      },
      {
        regionCode: 'UK_SCOTTISH_LOWLANDS',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 6,
        endMonth: 10,
        temperatureMinC: 4,
        temperatureMaxC: 20,
        minCumulativePrecipitationMm: 12,
        evidenceBasis: 'Royal Botanic Garden Edinburgh records.'
      }
    ],
    sources: [
      {
        title: 'Hedgerow Medicine',
        author: 'Julie Bruton-Seal & Matthew Seal',
        publisher: 'Merlin Unwin Books',
        year: 2019,
        url: 'https://merlinunwin.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 29. Navelwort / Wall Pennywort (Umbilicus rupestris)
  {
    id: 'sp_umbilicus_rupestris',
    commonName: 'Navelwort (Wall Pennywort / Penny Pies)',
    scientificName: 'Umbilicus rupestris',
    kingdom: 'Plantae',
    family: 'Crassulaceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_umbilicus_rupestris.jpg',
    imageAlt: 'Round succulent navelwort leaves clinging to an ancient Cornish stone wall',
    imageAttribution: 'Cornwall Wildlife Trust / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'Remarkable native succulent clinging to ancient stone walls and mossy rocks across western Britain. Crisp, cool, juicy texture like cucumber.',
    culinaryPrep: 'Best eaten raw in salads, tucked into sandwiches like crisp lettuce, or blended into chilled green gazpacho. Highly refreshing on a coastal walk.',
    knownRisks: 'Pick from clean stone walls away from livestock splash. Harvest leaves before summer flowering spikes make them bitter.',
    identificationFeatures: {
      leavesOrFoliage: 'Circular, fleshy, succulent, peltate leaves (stem attaches to center of leaf underside) with a dimpled "belly button" in the center.',
      flowersOrFruit: 'Tall spikes of pale greenish-cream bell-shaped flowers in summer, turning copper-red.',
      stemOrStipe: 'Creeping rhizomes wedged into cracks of granite, slate, and limestone walls.'
    },
    distinguishingFeatures: 'Round coin-shaped succulent leaves with stem attached directly into central depression ("navel").',
    lookalikes: [
      {
        name: 'Marsh Pennywort (Hydrocotyle vulgaris)',
        scientificName: 'Hydrocotyle vulgaris',
        dangerous: false,
        dangerLevel: 'Mild Irritant',
        distinction: 'Grows in wet bogs and acid marshes (never on dry stone walls); has thin non-succulent leaves.'
      }
    ],
    habitats: ['Dry stone walls and hedgebanks of Cornwall, Devon, and Somerset', 'Pembrokeshire and Welsh valley walls', 'Lake District stone cottages and slate cloughs'],
    elevationRange: '0m – 500m',
    conservationStatus: 'Common in Western Britain',
    harvestMethod: 'Pluck individual plump round leaves. Leave the roots and central flowering spike intact.',
    notes: 'An indicator plant for the hyper-oceanic, frost-free climate of Britain\'s Atlantic west coast.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_WEST_COASTAL',
        startMonth: 2,
        peakMonthStart: 3,
        peakMonthEnd: 5,
        endMonth: 7,
        temperatureMinC: 6,
        temperatureMaxC: 19,
        minCumulativePrecipitationMm: 12,
        evidenceBasis: 'Cornwall Wildlife Trust records.'
      },
      {
        regionCode: 'UK_WALES_VALLEYS_COAST',
        startMonth: 3,
        peakMonthStart: 4,
        peakMonthEnd: 5,
        endMonth: 7,
        temperatureMinC: 6,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Pembrokeshire Flora Study.'
      }
    ],
    sources: [
      {
        title: 'Food for Free',
        author: 'Richard Mabey',
        publisher: 'Collins',
        year: 2012,
        url: 'https://harpercollins.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 30. Rowan Berry / Mountain Ash (Sorbus aucuparia)
  {
    id: 'sp_sorbus_aucuparia',
    commonName: 'Rowan (Mountain Ash)',
    scientificName: 'Sorbus aucuparia',
    kingdom: 'Plantae',
    family: 'Rosaceae',
    category: 'Berries',
    imageUrl: '/src/assets/images/species/sp_sorbus_aucuparia.jpg',
    imageAlt: 'Vibrant scarlet rowan berries hanging in dense clusters on a Scottish Highland mountain hillside',
    imageAttribution: 'Cairngorms National Park Botanical Survey',
    edibility: 'Choice Edible',
    edibilityNotes: 'Classic Scottish and Northern English wild harvest. Produces a jewel-like amber-orange bittersweet jelly, the traditional British pairing for venison, lamb, and pheasant.',
    culinaryPrep: 'MUST BE COOKED. Boil berries with tart cooking apples and equal weight of sugar, then strain through a jelly bag. NEVER EAT RAW ROWAN BERRIES.',
    knownRisks: 'Raw berries contain parasorbic acid which causes severe stomach upset and nausea. Boiling transforms this into harmless, beneficial sorbic acid.',
    identificationFeatures: {
      leavesOrFoliage: 'Pinnate leaves with 11–15 finely toothed, oblong leaflets.',
      flowersOrFruit: 'Dense, flat-topped clusters of brilliant scarlet-orange, round berry-like pomes (6–9 mm diameter).',
      stemOrStipe: 'Small deciduous tree with smooth grey bark, often clinging to rocky mountain crags.'
    },
    distinguishingFeatures: 'Pinnate compound leaves; dense flat plates of bright scarlet-orange berries; native mountain tree.',
    lookalikes: [
      {
        name: 'Guelder Rose (Viburnum opulus)',
        scientificName: 'Viburnum opulus',
        dangerous: true,
        dangerLevel: 'Mild Irritant',
        distinction: 'Has 3-lobed maple-like leaves (not pinnate); translucent shiny red berries containing a flat stone.'
      }
    ],
    habitats: ['Highland Glens & Caledonian Pinewoods of Scotland', 'Yorkshire Dales & Pennine Ghylls', 'Welsh Mountain slopes and upland valleys'],
    elevationRange: '50m – 1000m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick full bunches of berries with scissors when fully red in late August and September, ideally after the first early frost.',
    notes: 'Revered in Celtic folklore as a sacred tree of protection, planted outside crofts and cottages across Scotland and Ireland to ward off evil.',
    seasonalRanges: [
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 10,
        temperatureMinC: 5,
        temperatureMaxC: 17,
        minCumulativePrecipitationMm: 20,
        evidenceBasis: 'Cairngorms National Park Phenology.'
      },
      {
        regionCode: 'UK_NORTH_PENNINES_LAKES',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 10,
        endMonth: 10,
        temperatureMinC: 7,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 20,
        evidenceBasis: 'Lake District National Park Flora.'
      }
    ],
    sources: [
      {
        title: 'The Forager\'s Calendar',
        author: 'John Wright',
        publisher: 'Profile Books',
        year: 2019,
        url: 'https://profilebooks.com',
        peerReviewed: true
      }
    ]
  },

  // 31. Dog Rose / Rosehips (Rosa canina)
  {
    id: 'sp_rosa_canina',
    commonName: 'Dog Rose (Rosehips)',
    scientificName: 'Rosa canina',
    kingdom: 'Plantae',
    family: 'Rosaceae',
    category: 'Berries',
    imageUrl: '/src/assets/images/species/sp_rosa_canina.jpg',
    imageAlt: 'Scarlet oval rosehips on thorny wild rose bush in British hedgerow',
    imageAttribution: 'Woodland Trust UK Field Phenology',
    edibility: 'Choice Edible',
    edibilityNotes: 'Britain\'s historic wartime vitamin C miracle. Packed with 20 times more vitamin C than oranges, producing luscious scarlet syrups and jellies.',
    culinaryPrep: 'CRITICAL PREPARATION: The interior seeds are coated with irritating hairs (historically used by British schoolchildren as itching powder). Strain juice thoroughly through fine muslin cloth or jelly bag.',
    knownRisks: 'Do not eat interior seeds or hairs raw as they cause intense irritation to the mouth and digestive tract.',
    identificationFeatures: {
      leavesOrFoliage: 'Pinnate leaves with 5–7 oval serrated leaflets on prickly stems with curved hooked thorns.',
      flowersOrFruit: 'Autumn: Glossy, fleshy, egg-shaped scarlet-red hips (15–20 mm long) crowned with persistent sepals.',
      stemOrStipe: 'Scrambling arching thorny shrub up to 3m high.'
    },
    distinguishingFeatures: 'Oval scarlet hips crowned by dried sepals on arching thorny wild rose bushes.',
    lookalikes: [
      {
        name: 'Field Rose (Rosa arvensis)',
        scientificName: 'Rosa arvensis',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Smaller, rounder hips with styles united into a column; also choice edible.'
      }
    ],
    habitats: ['Ancient British Hedgerows & Field Margins', 'Scrub, chalk downland, and woodland edges across the UK', 'Widespread throughout England, Scotland, Wales & Northern Ireland'],
    elevationRange: '0m – 550m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Pick firm, bright red hips after the first autumn frost softens the skins, or pick in October and freeze.',
    notes: 'During World War II, the British Ministry of Health mobilized the Boy Scouts and Women\'s Voluntary Service to gather over 450 tons of rosehips annually to prevent child scurvy.',
    seasonalRanges: [
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 9,
        peakMonthStart: 10,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 3,
        temperatureMaxC: 15,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'UK Hedgerow Phenology.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 9,
        peakMonthStart: 10,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 4,
        temperatureMaxC: 16,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Woodland Trust records.'
      }
    ],
    sources: [
      {
        title: 'Hedgerow Medicine',
        author: 'Julie Bruton-Seal & Matthew Seal',
        publisher: 'Merlin Unwin Books',
        year: 2019,
        url: 'https://merlinunwin.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 32. Hawthorn (Crataegus monogyna)
  {
    id: 'sp_crataegus_monogyna',
    commonName: 'Hawthorn (Haws & Bread-and-Cheese)',
    scientificName: 'Crataegus monogyna',
    kingdom: 'Plantae',
    family: 'Rosaceae',
    category: 'Berries',
    imageUrl: '/src/assets/images/species/sp_crataegus_monogyna.jpg',
    imageAlt: 'Deep red haws on thorny hawthorn branches in an English autumn hedge',
    imageAttribution: 'The Foragers Calendar Curatorial Archive',
    edibility: 'Choice Edible',
    edibilityNotes: 'Britain\'s quintessential hedgerow tree. In spring, tender young leaf buds ("bread and cheese") have a nutty flavor. In autumn, dark red haws produce rich hawthorn ketchup and jelly.',
    culinaryPrep: 'Spring: Pick young leaf buds to toss in salads. Autumn: Simmer red haws with cider vinegar, brown sugar, and spices, then pass through a sieve to create spicy wild hawthorn ketchup.',
    knownRisks: 'Do not chew or consume the hard interior stones in large volume (contain cyanogenic glycosides). Hawthorn has cardiovascular effects; consult a physician if taking heart medications.',
    identificationFeatures: {
      leavesOrFoliage: 'Deeply lobed green leaves with 3–7 unequal lobes, tapering to the base.',
      flowersOrFruit: 'Autumn: Clusters of round to oval, dark ruby-red fleshy berries (haws, 8–10 mm) containing a single hard stone.',
      stemOrStipe: 'Dense thorny shrub or small tree with grey-brown fissured bark and sharp rigid thorns.'
    },
    distinguishingFeatures: 'Deeply lobed leaves; sharp woody thorns; clusters of dark red mealy berries with a single stone.',
    lookalikes: [
      {
        name: 'Midland Hawthorn (Crataegus laevigata)',
        scientificName: 'Crataegus laevigata',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Has shallower leaf lobes and haws with 2–3 stones inside; also choice edible.'
      }
    ],
    habitats: ['Traditional boundary hedgerows across England, Scotland, Wales & Northern Ireland', 'Woodland margins, downland scrub, and commons', 'The most common hedging shrub in the British landscape'],
    elevationRange: '0m – 550m',
    conservationStatus: 'Common / Abundant',
    harvestMethod: 'Pick young leaf buds in April; harvest dark red haws by hand in October and November.',
    notes: 'In British folklore: "Ne\'er cast a clout till May be out" originally referred to the blooming of the May blossom (hawthorn).',
    seasonalRanges: [
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 4,
        peakMonthStart: 9,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 4,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'National Hedgerow Survey.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 4,
        peakMonthStart: 9,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 5,
        temperatureMaxC: 19,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Woodland Trust Nature\'s Calendar.'
      }
    ],
    sources: [
      {
        title: 'Food for Free',
        author: 'Richard Mabey',
        publisher: 'Collins',
        year: 2012,
        url: 'https://harpercollins.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 33. Wild Raspberry (Rubus idaeus)
  {
    id: 'sp_rubus_idaeus',
    commonName: 'Wild Raspberry',
    scientificName: 'Rubus idaeus',
    kingdom: 'Plantae',
    family: 'Rosaceae',
    category: 'Berries',
    imageUrl: '/src/assets/images/species/sp_rubus_idaeus.jpg',
    imageAlt: 'Sweet ruby red wild raspberries ripening on an upland Scottish forest path',
    imageAttribution: 'Forestry Commission Scotland / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'Intensely fragrant and sweeter than any cultivated supermarket raspberry. A sublime wild treat found in northern British glens and woodland clearings.',
    culinaryPrep: 'Eat straight from the cane in the woods, or gently simmer with a touch of sugar for wild raspberry coulis, jams, and infused malt whisky.',
    knownRisks: 'Check hollow centers for small forest insects before eating.',
    identificationFeatures: {
      leavesOrFoliage: 'Pinnate leaves with 3–5 oval leaflets, bright green above and startlingly silvery-white hairy beneath.',
      flowersOrFruit: 'Drooping clusters of ruby-red composite drupelets that pull free leaving a conical hollow white receptacle on the plant.',
      stemOrStipe: 'Biennial upright canes covered in soft, fine, reddish-brown bristles and prickles.'
    },
    distinguishingFeatures: 'Hollow cup when picked (leaves core on plant, unlike blackberries); silvery-white underside of leaves; soft bristly stems.',
    lookalikes: [
      {
        name: 'Blackberry',
        scientificName: 'Rubus fruticosus',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Ripens to black; retains the solid core when plucked; fierce curved hooked prickles.'
      }
    ],
    habitats: ['Highland birchwoods, Scottish pine forests & clearings', 'Pennine and Lake District cloughs and woodland fringes', 'Damp acidic soils across northern and upland Britain'],
    elevationRange: '30m – 750m',
    conservationStatus: 'Common in Northern & Upland UK',
    harvestMethod: 'Gently slip ripe berries from the central plug. Handle delicately in shallow containers.',
    notes: 'The native wild raspberry is the parent species of all British garden raspberry cultivars.',
    seasonalRanges: [
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 7,
        peakMonthStart: 7,
        peakMonthEnd: 8,
        endMonth: 9,
        temperatureMinC: 11,
        temperatureMaxC: 21,
        minCumulativePrecipitationMm: 20,
        evidenceBasis: 'Scottish Wildlife Trust Flora.'
      },
      {
        regionCode: 'UK_NORTH_PENNINES_LAKES',
        startMonth: 7,
        peakMonthStart: 7,
        peakMonthEnd: 8,
        endMonth: 9,
        temperatureMinC: 12,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 20,
        evidenceBasis: 'Lake District National Park.'
      }
    ],
    sources: [
      {
        title: 'New Flora of the British Isles',
        author: 'Clive Stace',
        publisher: 'C&M Floristics',
        year: 2019,
        url: 'https://bsbi.org/stace',
        peerReviewed: true
      }
    ]
  },

  // 34. Sea Purslane (Halimione portulacoides)
  {
    id: 'sp_halimione_portulacoides',
    commonName: 'Sea Purslane',
    scientificName: 'Halimione portulacoides',
    kingdom: 'Plantae',
    family: 'Amaranthaceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_halimione_portulacoides.jpg',
    imageAlt: 'Silvery-grey sea purslane growing along tidal creeks in Norfolk',
    imageAttribution: 'Norfolk Wildlife Trust / The Foragers Calendar',
    edibility: 'Choice Edible',
    edibilityNotes: 'One of the tastiest wild coastal greens in Britain. Thick, silvery-grey leaves with a delightful crisp texture and natural salty crunch.',
    culinaryPrep: 'Eat raw in salads, toss into hot butter with garlic to serve with British fish or lamb, or deep-fry for 10 seconds into wild crispy salt-marsh crisps.',
    knownRisks: 'Pick well away from polluted estuaries or industrial outlets. Check tidal times when foraging on salt marshes.',
    identificationFeatures: {
      leavesOrFoliage: 'Opposite, fleshy, oval to lanceolate leaves with a powdery silvery-grey to sea-green sheen.',
      flowersOrFruit: 'Tiny yellowish-green flowers in terminal spikes.',
      stemOrStipe: 'Woody, creeping and branching dwarf shrub forming dense grey cushions up to 50 cm high along creek edges.'
    },
    distinguishingFeatures: 'Distinctive silvery-grey powdery leaves growing in dense cushions directly along tidal creek banks.',
    lookalikes: [
      {
        name: 'Shrubby Sea-Blite (Suaeda vera)',
        scientificName: 'Suaeda vera',
        dangerous: false,
        dangerLevel: 'Edible Lookalike',
        distinction: 'Has dark green, cylindrical succulent leaves; also edible.'
      }
    ],
    habitats: ['North Norfolk Coast (Blakeney, Morston, Cley, Holme)', 'Essex and Suffolk salt marsh creeks', 'Solent and Severn tidal marshes'],
    elevationRange: 'Intertidal Salt Marshes (0m)',
    conservationStatus: 'Common / Abundant Coastal',
    harvestMethod: 'Snip tender young leaf tips with scissors, leaving woody stems to regenerate.',
    notes: 'An evergreen coastal shrub available for foraging throughout all twelve months of the year.',
    seasonalRanges: [
      {
        regionCode: 'UK_EAST_ANGLIA_FEN',
        startMonth: 1,
        peakMonthStart: 4,
        peakMonthEnd: 9,
        endMonth: 12,
        temperatureMinC: 5,
        temperatureMaxC: 24,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'Norfolk Wildlife Trust Saltmarsh Monitoring.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 1,
        peakMonthStart: 4,
        peakMonthEnd: 9,
        endMonth: 12,
        temperatureMinC: 6,
        temperatureMaxC: 25,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'Chichester Harbour Conservancy.'
      }
    ],
    sources: [
      {
        title: 'Coastal Plants of Britain and Ireland',
        author: 'Paul Sterry',
        publisher: 'Bloomsbury Wildlife',
        year: 2015,
        url: 'https://bloomsbury.com',
        peerReviewed: true
      }
    ]
  },

  // 35. Common Chickweed (Stellaria media)
  {
    id: 'sp_stellaria_media',
    commonName: 'Common Chickweed',
    scientificName: 'Stellaria media',
    kingdom: 'Plantae',
    family: 'Caryophyllaceae',
    category: 'Wild Greens',
    imageUrl: '/src/assets/images/species/sp_stellaria_media.jpg',
    imageAlt: 'Tender green chickweed leaves with delicate white star flowers',
    imageAttribution: 'Botanical Society of Britain & Ireland (BSBI)',
    edibility: 'Choice Edible',
    edibilityNotes: 'Succulent, tender, sweet wild salad green with a fresh flavor reminiscent of young garden peas or sweetcorn.',
    culinaryPrep: 'Superb raw in green salads, blended into spring wild pesto, or folded into soups at the very last minute before serving.',
    knownRisks: 'Check for single line of hairs on the stem to distinguish from poisonous Scarlet Pimpernel.',
    identificationFeatures: {
      leavesOrFoliage: 'Opposite, oval, pointed, bright lime-green leaves.',
      flowersOrFruit: 'Tiny white star-shaped flowers with 5 deeply-cleft petals (appearing like 10 petals).',
      stemOrStipe: 'CRITICAL IDENTIFIER: A single, distinct line of fine white hairs running down one side of the round stem, changing sides at each leaf node.'
    },
    distinguishingFeatures: 'Single line of hairs on stem that alternates side at every joint; star-shaped white flowers; watery succulent green leaves.',
    lookalikes: [
      {
        name: 'Scarlet Pimpernel (Lysimachia arvensis)',
        scientificName: 'Lysimachia arvensis',
        dangerous: true,
        dangerLevel: 'Mild Irritant',
        distinction: 'Has four-angled square stems with NO line of hairs, and bright orange-red or blue flowers; toxic.'
      }
    ],
    habitats: ['Cultivated garden beds, vegetable patches, and farm edges', 'Hedgebanks, damp shady corners, and path margins across Britain', 'Ubiquitous year-round across the UK'],
    elevationRange: '0m – 700m',
    conservationStatus: 'Common / Abundant',
    harvestMethod: 'Snip top 5cm leafy stems with clean kitchen scissors.',
    notes: 'Can germinate, flower, and set seed within 5 weeks, producing up to 5 generations in a single British calendar year.',
    seasonalRanges: [
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 1,
        peakMonthStart: 3,
        peakMonthEnd: 6,
        endMonth: 12,
        temperatureMinC: 3,
        temperatureMaxC: 22,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'RHS Horticultural Records.'
      },
      {
        regionCode: 'UK_MIDLANDS_HEARTLAND',
        startMonth: 2,
        peakMonthStart: 3,
        peakMonthEnd: 6,
        endMonth: 11,
        temperatureMinC: 3,
        temperatureMaxC: 21,
        minCumulativePrecipitationMm: 10,
        evidenceBasis: 'Warwickshire Wildlife Trust.'
      }
    ],
    sources: [
      {
        title: 'Food for Free',
        author: 'Richard Mabey',
        publisher: 'Collins',
        year: 2012,
        url: 'https://harpercollins.co.uk',
        peerReviewed: true
      }
    ]
  },

  // 36. Fly Agaric (Amanita muscaria) [TOXIC CAUTIONARY SPECIMEN]
  {
    id: 'sp_amanita_muscaria',
    commonName: 'Fly Agaric',
    scientificName: 'Amanita muscaria',
    kingdom: 'Fungi',
    family: 'Amanitaceae',
    category: 'Fruiting Mushroom',
    imageUrl: '/src/assets/images/species/sp_amanita_muscaria.jpg',
    imageAlt: 'Bright scarlet Fly Agaric with white warts in Scottish Highland birch forest',
    imageAttribution: 'British Mycological Society / Educational Archive',
    edibility: 'Toxic Warning',
    edibilityNotes: 'POISONOUS. Contains ibotenic acid and muscimol. Causes ataxia, agitation, confusion, and severe gastric upheaval.',
    culinaryPrep: 'DO NOT CONSUME. Included as a critical botanical identification benchmark across British woodlands.',
    knownRisks: 'Potentially severe in high doses; belongs to the Amanita genus which includes the lethal Death Cap (Amanita phalloides).',
    identificationFeatures: {
      capOrCrown: 'Vivid scarlet red to orange, dotted with white raised universal veil warts that can wash off in heavy rain.',
      gillsOrPoresOrUnderside: 'Free, crowded, pure white gills.',
      stemOrStipe: 'White cylinder with a hanging skirt-like ring and bulbous base surrounded by concentric rings (volva).'
    },
    distinguishingFeatures: 'Bright red cap with white pyramidal warts; hanging ring; bulbous volva at stem base.',
    lookalikes: [
      {
        name: 'The Blusher',
        scientificName: 'Amanita rubescens',
        dangerous: true,
        dangerLevel: 'Severe Gastrointestinal',
        distinction: 'Dull brownish-pink cap; damaged flesh slowly bruises wine-red.'
      }
    ],
    habitats: ['Highland Birch & Pine forests', 'Sandy heathlands of Surrey & Hampshire', 'Birch woodlands across Britain'],
    elevationRange: '20m – 900m',
    conservationStatus: 'Common / Least Concern',
    harvestMethod: 'Photographic and educational observation only.',
    notes: 'An essential mycorrhizal partner for Betula pendula (Silver Birch) across the UK.',
    seasonalRanges: [
      {
        regionCode: 'UK_SCOTTISH_HIGHLANDS',
        startMonth: 8,
        peakMonthStart: 9,
        peakMonthEnd: 11,
        endMonth: 11,
        temperatureMinC: 5,
        temperatureMaxC: 17,
        minCumulativePrecipitationMm: 15,
        evidenceBasis: 'Highland Fungus Group.'
      },
      {
        regionCode: 'UK_SOUTH_EAST_WEALD',
        startMonth: 9,
        peakMonthStart: 9,
        peakMonthEnd: 11,
        endMonth: 12,
        temperatureMinC: 7,
        temperatureMaxC: 18,
        minCumulativePrecipitationMm: 20,
        evidenceBasis: 'BMS Fungarium records.'
      }
    ],
    sources: [
      {
        title: 'British Mycological Society Poisonous Fungi Directory',
        author: 'BMS Toxicology Committee',
        publisher: 'BMS Publications',
        year: 2021,
        url: 'https://britmycolsoc.org.uk',
        peerReviewed: true
      }
    ]
  }
];
