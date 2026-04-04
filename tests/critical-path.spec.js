const { test, expect } = require('@playwright/test');

test('E2E: Complete Game Loop and Replay', async ({ page }) => {
    await page.goto('/');

    // 1. Start the game
    await page.click('#press-start');
    
    // 2. Loop through 5 questions
    for (let i = 0; i < 5; i++) {
        // Ensure question text exists
        const question = page.locator('#question-text');
        await expect(question).not.toBeEmpty();

        // Click the first available option
        const firstOption = page.locator('.option').first();
        await firstOption.click();

        // Wait for the transition delay (800ms in script.js)
        await page.waitForTimeout(900); 
    }

    // 3. Verify Result Screen appears
    const resultScreen = page.locator('#result-screen');
    await expect(resultScreen).toBeVisible();
    await expect(page.locator('#quiz-box')).toBeHidden();

    // 4. Test the "Play It Again, Sam?" button
    const replayBtn = page.locator('text=PLAY IT AGAIN, SAM?');
    await replayBtn.click();

    // 5. Verify the game has reset to question 1
    await expect(page.locator('#quiz-box')).toBeVisible();
    await expect(page.locator('#star-display')).toHaveText('☆☆☆☆☆');
});