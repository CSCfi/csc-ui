import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-progress-bar');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const progressBar = page
    .locator('app-example[name="basic"] c-progress-bar')
    .first();

  await expect(progressBar).toHaveScreenshot();
});

test('Custom colors', async ({ page }) => {
  const progressBars = page
    .locator('app-example[name="customColors"] div')
    .nth(1);

  await expect(progressBars).toHaveScreenshot();
});

test('Adjacent details', async ({ page }) => {
  const progressBars = page.locator('app-example[name="adjacent"] div').nth(1);

  await expect(progressBars).toHaveScreenshot();
});
