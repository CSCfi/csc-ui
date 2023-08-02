import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-icon-button');

  await page.waitForTimeout(200);

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  await page.waitForTimeout(800);

  const iconButtons = page.locator('app-example[name="basic"]');

  await expect(iconButtons).toHaveScreenshot();
});

test('Ghost', async ({ page }) => {
  const iconButtons = page.locator('app-example[name="ghost"]');

  await expect(iconButtons).toHaveScreenshot();
});

test('Text', async ({ page }) => {
  const iconButtons = page.locator('app-example[name="text"]');

  await expect(iconButtons).toHaveScreenshot();
});

test('Outlined', async ({ page }) => {
  const iconButtons = page.locator('app-example[name="outlined"]');

  await expect(iconButtons).toHaveScreenshot();
});
