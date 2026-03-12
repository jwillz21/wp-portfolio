import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright',

  use: {
    baseURL: 'http://wp-portfolio.local',
    headless: true,
  },

  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } }
  ]
});