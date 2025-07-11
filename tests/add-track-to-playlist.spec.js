import { test, expect } from '@playwright/test';

const url = 'https://vite-react-alpha-lemon.vercel.app/';

test.describe('Adding track functionality', () => {
    test('should add track to playlist', async ({ page }) => {
        await page.goto(url);
        const firstTrack = page.locator('//*[@id="tracklist"]/div/div').first();
        const trackName = await firstTrack.textContent();

        await firstTrack.getByRole('button', { name: '+' }).click();

        const newStr = trackName.slice(0, -1) + '-';
        
        const trackInPlaylist = page.locator('//*[@id="playlist"]/div/div');
        const textContent = await trackInPlaylist.textContent();
        expect(trackInPlaylist).toHaveCount(1);
        expect(textContent.trim()).toContain(newStr);
    })
})