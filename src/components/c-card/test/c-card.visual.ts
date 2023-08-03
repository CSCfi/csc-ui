import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-card');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const card = page.locator('app-example[name="basic"] div').nth(1);

  await expect(card).toHaveScreenshot();
});

test('Card with columns and right aligned action buttons', async ({ page }) => {
  const card = page.locator('app-example[name="columns"] div').nth(1);

  await expect(card).toHaveScreenshot();
});

test('Fullscreen', async ({ page }) => {
  const card = page.locator('app-example[name="fullscreen"] div').nth(1);

  await expect(card).toHaveScreenshot();
});
