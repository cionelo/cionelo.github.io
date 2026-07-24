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

test('buildMailtoHref encodes special characters so a form field cannot inject extra mailto query params', () => {
  const href = buildMailtoHref({
    to: 'hello@itsnemo.dev',
    name: 'Evil&bcc=leak@example.com',
    brand: 'Trail Co',
    need: 'Test',
    timeline: 'Q4 2026',
  });
  const query = href.split('?')[1];
  assert.ok(!/&(cc|bcc|to)=/i.test(query));
  assert.ok(query.includes('Evil%26bcc%3Dleak%40example.com'));
});

test('formatCompactNumber handles the 1 million boundary', () => {
  assert.equal(formatCompactNumber(1_000_000), '1.0M');
});

test('formatCompactNumber rounds thousands up at the .5 boundary', () => {
  assert.equal(formatCompactNumber(1500), '2K');
});

test('formatCompactNumber handles the 999/1000 boundary', () => {
  assert.equal(formatCompactNumber(999), '999');
  assert.equal(formatCompactNumber(1000), '1K');
});
