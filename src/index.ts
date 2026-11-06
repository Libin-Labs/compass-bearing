function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
export type CompassPoint =
  | 'N'
  | 'NNE'
  | 'NE'
  | 'ENE'
  | 'E'
  | 'ESE'
  | 'SE'
  | 'SSE'
  | 'S'
  | 'SSW'
  | 'SW'
  | 'WSW'
  | 'W'
  | 'WNW'
  | 'NW'
  | 'NNW';
const points: readonly CompassPoint[] = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
];
export function normalizeBearing(degrees: number): number {
  finite(degrees);
  const r = degrees % 360;
  return r === 0 ? 0 : r < 0 ? r + 360 : r;
}
export function shortestTurn(from: number, to: number): number {
  const delta = normalizeBearing(normalizeBearing(to) - normalizeBearing(from));
  return delta > 180 ? delta - 360 : delta;
}
export function compassPoint(degrees: number): CompassPoint {
  return points[Math.floor((normalizeBearing(degrees) + 11.25) / 22.5) % 16]!;
}
