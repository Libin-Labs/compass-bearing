import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('wrapping reference', () => {
  assert.equal(api.normalizeBearing(-450), 270);
  assert.equal(api.normalizeBearing(720), 0);
});
test('shortest signed turns', () => {
  assert.equal(api.shortestTurn(350, 10), 20);
  assert.equal(api.shortestTurn(10, 350), -20);
});
test('opposite tie', () => {
  assert.equal(api.shortestTurn(180, 0), 180);
  assert.equal(api.shortestTurn(0, 180), 180);
});
test('sector ties', () => {
  assert.equal(api.compassPoint(11.25), 'NNE');
  assert.equal(api.compassPoint(348.75), 'N');
  assert.equal(api.compassPoint(90), 'E');
});
test('nonfinite rejection and negative zero', () => {
  assert.throws(() => api.normalizeBearing(Infinity));
  assert.throws(() => api.compassPoint(NaN));
  assert.ok(Object.is(api.normalizeBearing(-0), 0));
});
test('bounded turn oracle', () => {
  for (let a = -720; a <= 720; a += 31)
    for (let b = -720; b <= 720; b += 47) {
      const t = api.shortestTurn(a, b);
      assert.ok(t > -180 && t <= 180);
      assert.ok(Math.abs(api.normalizeBearing(a + t) - api.normalizeBearing(b)) < 1e-9);
    }
});
