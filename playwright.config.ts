import { defineConfig, devices } from '@playwright/test';
import type { SerenityOptions } from '@serenity-js/playwright-test';

export default defineConfig<SerenityOptions>({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['line'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: 'https://demoqa.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
    
    // Serenity/JS configuration
    crew: [
      '@serenity-js/console-reporter',
      ['@serenity-js/serenity-bdd', { specDirectory: './tests' }]
    ],
    
    // Default actor configuration
    defaultActorName: 'Tester',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
});
