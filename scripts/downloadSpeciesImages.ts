import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { VERIFIED_SPECIES_SEED } from '../src/server/data/verifiedSpecies.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../src/assets/images/species');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function fetchImageForSpecies(species: typeof VERIFIED_SPECIES_SEED[0]) {
  const destPath = path.join(targetDir, `${species.id}.jpg`);
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
    console.log(`[Already exists] ${species.commonName}`);
    return;
  }

  // Try scientific name first, then fallback to clean query
  const searchQueries = [
    species.scientificName.replace(/\s+/g, '_'),
    species.scientificName.split(' ').slice(0, 2).join('_'),
    species.commonName.split(' ')[0]
  ];

  for (const q of searchQueries) {
    try {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'TheForagersCalendar/1.0 (botanical educational web app)' }
      });
      if (!res.ok) continue;
      const data = await res.json();
      const imgUrl = data.thumbnail?.source || data.originalimage?.source;
      if (imgUrl) {
        const imgRes = await fetch(imgUrl, {
          headers: { 'User-Agent': 'TheForagersCalendar/1.0 (botanical educational web app)' }
        });
        if (imgRes.ok) {
          const buffer = Buffer.from(await imgRes.arrayBuffer());
          if (buffer.length > 2000) {
            fs.writeFileSync(destPath, buffer);
            console.log(`✓ [Downloaded] ${species.commonName} (${species.scientificName}) -> ${Math.round(buffer.length / 1024)} KB`);
            return;
          }
        }
      }
    } catch (e) {
      // try next query
    }
  }

  console.warn(`! [Fallback needed] ${species.commonName} (${species.scientificName})`);
}

async function main() {
  console.log(`Downloading authentic botanical photographs for ${VERIFIED_SPECIES_SEED.length} species...`);
  for (const species of VERIFIED_SPECIES_SEED) {
    await fetchImageForSpecies(species);
    // short delay to be respectful to API
    await new Promise(r => setTimeout(r, 120));
  }
  console.log('Finished downloading species images.');
}

main().catch(console.error);
