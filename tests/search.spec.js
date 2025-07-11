import { test, expect } from '@playwright/test';

const validTracks = [
  'summer',
  'Autumn',
  'Winter Winds',
];

const invalidTracks = [
  'Metal Thunder',
];

const url = 'https://vite-react-alpha-lemon.vercel.app/';

test.describe('Search track functionality', () => {
  for (const trackName of validTracks) {
    test(`should find existing track: "${trackName}"`, async ({ page }) => {
      await page.goto(url);

      await page.getByRole('textbox', { name: 'Search' }).fill(trackName);
      await page.waitForTimeout(300);

      const visibleTracks = await page.locator('#tracklist > div > div').evaluateAll(els =>
        els.map(el => el.textContent.trim().toLowerCase())
      );

      for (const track of visibleTracks) {
        expect(track).toContain(trackName.toLowerCase());
      }
    });
  }

  for (const trackName of invalidTracks) {
    test(`should NOT find non-existent track: "${trackName}"`, async ({ page }) => {
      await page.goto(url);

      await page.getByRole('textbox', { name: 'Search' }).fill(trackName);
      await page.waitForTimeout(300);

      const visibleTracks = await page.locator('#tracklist > div > div').evaluateAll(els =>
        els.map(el => el.textContent.trim().toLowerCase())
      );
      expect(visibleTracks.length).toBe(0);
    });
  }
});