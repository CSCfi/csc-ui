import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-tabs');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const tabs = page.locator('app-example[name="basic"] div').nth(1);

  await expect(tabs).toHaveScreenshot();

  await tabs.getByRole('tab', { name: 'Two' }).click();

  await expect(tabs).toHaveScreenshot();
});

test('No border', async ({ page }) => {
  const tabs = page.locator('app-example[name="borderless"] div').nth(1);

  await expect(tabs).toHaveScreenshot();
});
