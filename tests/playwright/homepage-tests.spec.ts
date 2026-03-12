import { test, expect } from '@playwright/test';

test.describe('Homepage tests', () => {

  test('profile hero appears', async ({ page }) => {

    await page.goto('/');

    const hero = page.locator('.profile-hero');
    const about = page.locator('.profile-about');
    const skills = page.locator('.profile-skills');
    const projects = page.locator('.profile-projects');
    const contact = page.locator('.profile-contact');

    await expect(hero).toBeVisible();
    await expect(about).toBeVisible();
    await expect(skills).toBeVisible();
    await expect(projects).toBeVisible();
    await expect(contact).toBeVisible();
  });

  // test('modal opens with project data', async ({ page }) => {

  //   await page.goto('/');

  //   await page.locator('.featured-project-card').first().click();

  //   const modal = page.locator('.project-modal');

  //   await expect(modal).toBeVisible();
  //   await expect(modal.locator('.title')).not.toBeEmpty();

  // });

});