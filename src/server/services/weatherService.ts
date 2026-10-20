import { ClimateSnapshot } from '../../types/forager.ts';

export interface IWeatherProvider {
  name: string;
  getClimateByCoordinates(lat: number, lon: number): Promise<ClimateSnapshot>;
  getRegionalEstimate(regionCode: string, month: number): ClimateSnapshot;
}

/**
 * Maps WMO weather interpretation codes to readable conditions
 */
function mapWmoCode(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code === 1 || code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Damp / Fog';
  if (code >= 51 && code <= 55) return 'Misty Drizzle';
  if (code >= 61 && code <= 65) return 'Moderate Rain';
  if (code >= 80 && code <= 82) return 'Rain Showers';
  if (code >= 71 && code <= 77) return 'Snow / Frost';
  if (code >= 95) return 'Thunderstorm';
  return 'Overcast / Mild';
}

/**
 * Helper to compute regional climatology normals
 */
function computeRegionalNormal(regionCode: string, month: number): ClimateSnapshot {
  let baselineTemp = 14;
  let baselineRain7d = 20;

  switch (regionCode) {
    case 'UK_SCOTTISH_HIGHLANDS':
      // Highlands & Cairngorms: cool summers, early frost, high rainfall
      baselineTemp = [3, 3, 5, 8, 12, 14, 16, 16, 13, 9, 6, 3][month - 1] || 9;
      baselineRain7d = [42, 35, 30, 22, 20, 24, 28, 35, 40, 48, 50, 46][month - 1] || 32;
      break;
    case 'UK_NORTH_PENNINES_LAKES':
    case 'UK_NORTH_WALES_UPLANDS':
      // Northern England, Pennines & Lake District
      baselineTemp = [4, 4, 7, 10, 13, 16, 18, 18, 15, 11, 7, 4][month - 1] || 11;
      baselineRain7d = [38, 30, 28, 20, 18, 22, 26, 30, 36, 42, 45, 42][month - 1] || 28;
      break;
    case 'UK_SCOTTISH_LOWLANDS':
      // Central Belt, Lothians, Fife & Borders
      baselineTemp = [4, 4, 6, 9, 13, 15, 17, 17, 14, 10, 7, 4][month - 1] || 10;
      baselineRain7d = [28, 22, 20, 16, 16, 18, 20, 24, 28, 34, 35, 30][month - 1] || 22;
      break;
    case 'UK_WALES_VALLEYS_COAST':
      // Wales, Snowdonia, Brecon Beacons, Gower & Wye
      baselineTemp = [5, 5, 8, 11, 14, 17, 19, 19, 16, 12, 8, 6][month - 1] || 12;
      baselineRain7d = [40, 32, 28, 22, 20, 22, 25, 30, 36, 44, 46, 42][month - 1] || 30;
      break;
    case 'UK_SOUTH_WEST_COASTAL':
      // Cornwall, Devon, Dorset Jurassic coast: mildest winters, oceanic moisture
      baselineTemp = [8, 8, 10, 12, 15, 18, 20, 20, 18, 14, 11, 9][month - 1] || 14;
      baselineRain7d = [35, 28, 24, 18, 16, 18, 20, 24, 28, 36, 42, 40][month - 1] || 25;
      break;
    case 'UK_SOUTH_EAST_WEALD':
      // South East, London, Weald, South Downs & Chilterns: warmest, sunny
      baselineTemp = [5, 6, 8, 12, 16, 19, 22, 22, 18, 13, 9, 6][month - 1] || 13;
      baselineRain7d = [22, 18, 16, 15, 16, 16, 18, 20, 24, 30, 32, 26][month - 1] || 20;
      break;
    case 'UK_EAST_ANGLIA_FEN':
      // Norfolk & Suffolk: driest UK region
      baselineTemp = [4, 5, 8, 11, 15, 18, 21, 21, 17, 13, 8, 5][month - 1] || 12;
      baselineRain7d = [18, 14, 14, 13, 15, 15, 16, 18, 20, 24, 25, 20][month - 1] || 16;
      break;
    case 'UK_NORTHERN_IRELAND':
      // Antrim, Fermanagh, Lough Neagh: mild damp oceanic
      baselineTemp = [5, 5, 7, 10, 13, 16, 18, 17, 15, 11, 8, 6][month - 1] || 11;
      baselineRain7d = [30, 24, 22, 18, 18, 20, 25, 28, 32, 38, 40, 35][month - 1] || 26;
      break;
    case 'UK_MIDLANDS_HEARTLAND':
    default:
      // Central England & Cotswolds
      baselineTemp = [4, 5, 8, 11, 14, 17, 20, 19, 16, 12, 8, 5][month - 1] || 12;
      baselineRain7d = [24, 20, 18, 16, 18, 18, 20, 22, 26, 32, 34, 28][month - 1] || 22;
  }

  return {
    temperatureC: baselineTemp,
    apparentTempC: baselineTemp,
    precipitation7DaysMm: baselineRain7d,
    relativeHumidityPct: 68,
    soilMoistureScore: Math.min(1.0, baselineRain7d / 40),
    conditionName: 'Regional Climatological Normal',
    isSimulatedOrEstimated: true,
    provider: 'Climatological Normal Baseline',
    timestamp: new Date().toISOString()
  };
}

/**
 * Open-Meteo Provider (Default, Recommended, Keyless)
 */
export class OpenMeteoWeatherProvider implements IWeatherProvider {
  name = 'Open-Meteo Weather Feed (Keyless)';

  async getClimateByCoordinates(lat: number, lon: number): Promise<ClimateSnapshot> {
    const roundedLat = Math.round(lat * 100) / 100;
    const roundedLon = Math.round(lon * 100) / 100;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${roundedLat}&longitude=${roundedLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&daily=precipitation_sum&past_days=7&forecast_days=1&timezone=auto`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Open-Meteo responded with status ${res.status}`);
      }

      const data = await res.json();
      const current = data.current || {};
      const daily = data.daily || {};

      let precipitation7DaysMm = 0;
      if (Array.isArray(daily.precipitation_sum)) {
        precipitation7DaysMm = daily.precipitation_sum.reduce((acc: number, val: number) => acc + (val || 0), 0);
      } else {
        precipitation7DaysMm = (current.precipitation || 0) * 4;
      }

      const temp = current.temperature_2m ?? 14.0;
      const humidity = current.relative_humidity_2m ?? 65;
      const condition = mapWmoCode(current.weather_code ?? 3);
      const moistureIndex = Math.min(1.0, Math.max(0.1, (precipitation7DaysMm / 50) * 0.7 + (humidity / 100) * 0.3));

      return {
        temperatureC: temp,
        apparentTempC: current.apparent_temperature ?? temp,
        precipitation7DaysMm: Math.round(precipitation7DaysMm * 10) / 10,
        relativeHumidityPct: humidity,
        soilMoistureScore: Math.round(moistureIndex * 100) / 100,
        conditionName: condition,
        isSimulatedOrEstimated: false,
        provider: 'Open-Meteo (Real-Time)',
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      console.warn('Open-Meteo API call failed or timed out, using baseline:', (err as Error).message);
      return this.getRegionalEstimate('UK_SOUTH_EAST_WEALD', new Date().getMonth() + 1);
    }
  }

  getRegionalEstimate(regionCode: string, month: number): ClimateSnapshot {
    return computeRegionalNormal(regionCode, month);
  }
}

/**
 * Offline / Mock Provider (Requires zero network requests)
 */
export class MockWeatherProvider implements IWeatherProvider {
  name = 'Offline Simulated Climatology';

  async getClimateByCoordinates(_lat: number, _lon: number): Promise<ClimateSnapshot> {
    return this.getRegionalEstimate('UK_SOUTH_EAST_WEALD', new Date().getMonth() + 1);
  }

  getRegionalEstimate(regionCode: string, month: number): ClimateSnapshot {
    return computeRegionalNormal(regionCode, month);
  }
}

/**
 * OpenWeatherMap Provider (Requires OPENWEATHER_API_KEY)
 */
export class OpenWeatherMapProvider implements IWeatherProvider {
  name = 'OpenWeatherMap API';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getClimateByCoordinates(lat: number, lon: number): Promise<ClimateSnapshot> {
    const roundedLat = Math.round(lat * 100) / 100;
    const roundedLon = Math.round(lon * 100) / 100;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${roundedLat}&lon=${roundedLon}&appid=${this.apiKey}&units=metric`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`OpenWeatherMap error ${res.status}`);
      const data = await res.json();
      const rain1h = data.rain ? (data.rain['1h'] || 0) : 0;
      const precipEstimate = rain1h * 24 * 3; // 3-day proxy estimate

      return {
        temperatureC: data.main?.temp ?? 14,
        apparentTempC: data.main?.feels_like ?? 14,
        precipitation7DaysMm: Math.round(precipEstimate * 10) / 10,
        relativeHumidityPct: data.main?.humidity ?? 65,
        soilMoistureScore: 0.6,
        conditionName: data.weather?.[0]?.main || 'Clear',
        isSimulatedOrEstimated: false,
        provider: 'OpenWeatherMap',
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      console.warn('OpenWeatherMap failed, using fallback:', (err as Error).message);
      return computeRegionalNormal('UK_SOUTH_EAST_WEALD', new Date().getMonth() + 1);
    }
  }

  getRegionalEstimate(regionCode: string, month: number): ClimateSnapshot {
    return computeRegionalNormal(regionCode, month);
  }
}

/**
 * Factory creating the active weather service based on WEATHER_PROVIDER env variable
 */
export function createWeatherService(): IWeatherProvider {
  const provider = (process.env.WEATHER_PROVIDER || 'open-meteo').toLowerCase();

  if (provider === 'mock' || provider === 'offline') {
    return new MockWeatherProvider();
  }

  if (provider === 'openweather' && process.env.OPENWEATHER_API_KEY) {
    return new OpenWeatherMapProvider(process.env.OPENWEATHER_API_KEY);
  }

  // Default to Open-Meteo
  return new OpenMeteoWeatherProvider();
}

export const weatherService = createWeatherService();
