import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-status');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const status = page.locator('app-example[name="basic"] div').nth(1);

  await expect(status).toHaveScreenshot();
});
