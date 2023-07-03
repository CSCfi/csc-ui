import { test, expect } from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  await page.goto('http://localhost:4200/c-data-table');

  await page.waitForTimeout(100);

  const table = page.locator('app-example[name="basic"] c-data-table').first();

  // Expect initial visual appearance
  await expect(table).toHaveScreenshot();
});
