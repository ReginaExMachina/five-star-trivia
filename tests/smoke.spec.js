const { test, expect } = require('@playwright/test');

test.describe('Beta Smoke Test: Quick Path', () => {
    
    test('Start -> Answer -> Toggle Theme -> Reset', async ({ page }) => {
        // 1. Go to game (Update URL as needed)
        await page.goto('/');
        await expect(page).toHaveTitle(/Five Star Trivia/);

        // 2. Start the game
        await page.click('#press-start');
        await expect(page.locator('#quiz-box')).toBeVisible();

        // 3. Click exactly one answer
        const firstOption = page.locator('.option').first();
        await expect(firstOption).toBeVisible();
        await firstOption.click();

        // 4. Toggle Theme
        await page.click('#hamburger');
        await page.click('#theme-toggle');
        
        // Verify class was applied
        await expect(page.locator('body')).toHaveClass(/light-theme/);

        // 5. Reset Game
        await page.click('#hamburger');
        await page.click('text=RESET GAME');

        // 6. Verify return to start screen
        // location.reload() takes a moment, so we wait for the title to reappear
        await expect(page.locator('#game-title')).toBeVisible();
        await expect(page.locator('#quiz-box')).toBeHidden();
    });
});