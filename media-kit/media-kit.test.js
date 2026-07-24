import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  easeOutCubic,
  formatCompactNumber,
  getAdjacentIndex,
  buildMailtoHref,
  shouldReveal,
  parseCountUpTarget,
} from './media-kit.js';

test('easeOutCubic returns 0 at t=0 and 1 at t=1', () => {
  assert.equal(easeOutCubic(0), 0);
  assert.equal(easeOutCubic(1), 1);
});

test('easeOutCubic decelerates (past-midpoint progress exceeds t)', () => {
  assert.ok(easeOutCubic(0.5) > 0.5);
});

test('formatCompactNumber formats millions with one decimal', () => {
  assert.equal(formatCompactNumber(3500000), '3.5M');
});

test('formatCompactNumber formats thousands with no decimal', () => {
  assert.equal(formatCompactNumber(197000), '197K');
});

test('formatCompactNumber leaves sub-1000 numbers as plain integers', () => {
  assert.equal(formatCompactNumber(159), '159');
});

test('getAdjacentIndex wraps forward past the end', () => {
  assert.equal(getAdjacentIndex(3, 1, 4), 0);
});

test('getAdjacentIndex wraps backward past the start', () => {
  assert.equal(getAdjacentIndex(0, -1, 4), 3);
});

test('getAdjacentIndex moves normally mid-range', () => {
  assert.equal(getAdjacentIndex(1, 1, 4), 2);
});

test('buildMailtoHref encodes subject and body from form fields', () => {
  const href = buildMailtoHref({
    to: 'hello@itsnemo.dev',
    name: 'Jane Doe',
    brand: 'Trail Co',
    need: 'Product review video',
    timeline: 'Q4 2026',
  });
  assert.ok(href.startsWith('mailto:hello@itsnemo.dev?'));
  assert.ok(href.includes('subject=Partnership%20inquiry%3A%20Trail%20Co'));
  assert.ok(href.includes('Jane%20Doe'));
  assert.ok(href.includes('Q4%202026'));
});

test('shouldReveal reveals on intersect and stays revealed once shown', () => {
  assert.equal(shouldReveal(true, false), true);
  assert.equal(shouldReveal(false, true), true);
  assert.equal(shouldReveal(false, false), false);
});

test('parseCountUpTarget reads the numeric target from a data attribute', () => {
  const fakeEl = { dataset: { countTarget: '240000' } };
  assert.equal(parseCountUpTarget(fakeEl), 240000);
});
