import { test, expect } from '@playwright/test';

test.describe('Homepage tests', () => {

  test('profile sections appear', async ({ page }) => {
    // test scrolls into view and checks each section exists
    await page.goto('/');
    const sections = ['#hero', '#about', '#skills', '#projects', '#contact'];
    for (const selector of sections) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible({ timeout: 5000 });
      await expect(section).toBeInViewport({ timeout: 5000 });
    }
  });
});