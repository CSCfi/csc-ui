import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-toolbar');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const toolbar = page.locator('app-example[name="basic"] c-toolbar');

  await expect(toolbar).toHaveScreenshot();
});
