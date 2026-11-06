# @lp-labs/compass-bearing

Bearing wrapping, signed turns and sixteen-point compass labels.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/compass-bearing
```

## Working example

```js
import { shortestTurn, compassPoint } from '@lp-labs/compass-bearing';
if (shortestTurn(350, 10) !== 20 || compassPoint(90) !== 'E') throw new Error('Compass');
```

CommonJS: `const api = require('@lp-labs/compass-bearing')`.

## Behavior, customization and limits

normalizeBearing yields[0,360), including +0 for negative zero. shortestTurn(from,to) returns(-180,180] with exact opposite tie +180. compassPoint uses sixteen22.5-degree sectors, clockwise half-sector ties to next label. Inputs finite, arbitrary rotations accepted; O(1); not magnetic declination, navigation accuracy or sensor fusion.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
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
export declare function normalizeBearing(degrees: number): number;
export declare function shortestTurn(from: number, to: number): number;
export declare function compassPoint(degrees: number): CompassPoint;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
