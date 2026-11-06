import { shortestTurn, compassPoint } from '@lp-labs/compass-bearing';
if (shortestTurn(350, 10) !== 20 || compassPoint(90) !== 'E') throw new Error('Compass');
// @ts-expect-error invalid argument must be rejected by declarations
compassPoint('90');
