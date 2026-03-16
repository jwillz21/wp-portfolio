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

  test('modal opens with project data', async ({ page }) => {
    await page.goto('/');

    const cards = page.locator('.featured-project-card');
    const modal = page.locator('.project-modal');
    const modalTitle = modal.locator('.modal-title');
    const closeButton = modal.locator('.close-icon');

    const count = await cards.count();

    for (let i = 0; i < count; i++) {
      const cardBody = cards.nth(i).locator('.card-body');
      await expect(cardBody).toBeVisible();
      await cardBody.click();
      await expect(modal).toBeVisible({ timeout: 10000 });
      await expect(modalTitle).not.toBeEmpty();
      await closeButton.click();
      await expect(modal).not.toBeVisible();
    }
  });
});