import { test, expect } from '@playwright/test';

const url = 'https://vite-react-alpha-lemon.vercel.app/';

test('Verify total duration', async ({ page }) => {
    await page.goto(url);
  
    const tracksToAdd = 3;
  
    const trackItems = page.locator('//*[@id="tracklist"]/div/div');
  
    const totalTracks = await trackItems.count();
    expect(totalTracks).toBeGreaterThanOrEqual(tracksToAdd);

    let totalDurationSeconds = 0;
  
    for (let i = 0; i < tracksToAdd; i++) {
        const track = trackItems.nth(i);
        await track.getByRole('button', { name: '+' }).click();
        const durationLocator = track.locator('div:nth-child(3) > p');
        const durationText = (await durationLocator.textContent()).trim();
    
        totalDurationSeconds += mmssToSeconds(durationText);        
    }

    const actualTotalTime = Number((await page.locator('#playlist-duration').textContent())?.trim());
expect(actualTotalTime).toBe(totalDurationSeconds);

  });

  function mmssToSeconds(timeStr) {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
  }