const { test, expect } = require('@playwright/test');

test.describe('Five Star Trivia Beta Regression', () => {
    
    test.beforeEach(async ({ page }) => {
        // Replace with your local dev URL or GitHub Pages URL
        await page.goto('./'); 
    });

    test('Core Game Loop: Load, Filter, and Start', async ({ page }) => {
        // Verify Title and Press Start
        await expect(page.locator('#game-title')).toContainText('FIVE STAR');
        
        // Change Difficulty to Medium
        await page.click('#diff-toggle');
        await expect(page.locator('#diff-toggle')).toHaveText('Medium');

        // Start Game
        await page.click('#press-start');
        
        // Verify Quiz Box appears and Start Screen is hidden
        await expect(page.locator('#quiz-box')).toBeVisible();
        await expect(page.locator('#start-screen')).toBeHidden();
    });

    test('Theme Persistence Check', async ({ page }) => {
        // Open Drawer and Toggle Theme
        await page.click('#hamburger');
        await page.click('#theme-toggle');

        // Check if light-theme class is applied
        await expect(page.locator('body')).toHaveClass(/light-theme/);

        // Reload page and ensure theme persists via localStorage
        await page.reload();
        await expect(page.locator('body')).toHaveClass(/light-theme/);
    });

    test('Mobile Responsiveness: Side Menu Layout', async ({ page }) => {
        // Test on a mobile-sized viewport
        await page.setViewportSize({ width: 375, height: 667 });
        
        // Ensure the side-menu has switched to row/flex-direction: row
        const sideMenu = page.locator('#side-menu');
        await expect(sideMenu).toHaveCSS('flex-direction', 'row');
    });
});