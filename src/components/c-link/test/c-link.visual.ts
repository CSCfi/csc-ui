import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-link');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const links = page.locator('app-example[name="basic"]');

  await expect(links).toHaveScreenshot();
});

test('Variants', async ({ page }) => {
  const links = page.locator('app-example[name="variants"]');

  await expect(links).toHaveScreenshot();
});
