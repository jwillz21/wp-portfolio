import { test, expect } from '@playwright/test';

test.describe('Homepage tests', () => {

  test('profile sections appear', async ({ page }) => {

    await page.goto('/');

    const hero = page.locator('#hero');
    const about = page.locator('#about');
    const skills = page.locator('#skills');
    const projects = page.locator('#projects');
    const contact = page.locator('#contact');

    await expect(hero).toBeVisible();
    await expect(about).toBeVisible();
    await expect(skills).toBeVisible();
    await expect(projects).toBeVisible();
    await expect(contact).toBeVisible();
  });
});