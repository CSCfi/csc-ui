import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-switch');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const button = page.locator('app-example[name="inactive"] c-switch');

  await expect(button).toHaveScreenshot();

  await button.locator('label span').click();

  await expect(button).toHaveScreenshot();
});

test('Active', async ({ page }) => {
  const button = page.locator('app-example[name="active"] c-switch');

  await expect(button).toHaveScreenshot();
});

test('Disabled', async ({ page }) => {
  const button = page.locator('app-example[name="disabled"] c-switch');

  await expect(button).toHaveScreenshot();
});

test('Label', async ({ page }) => {
  const button = page.locator('app-example[name="labeled"] c-switch');

  await expect(button).toHaveScreenshot();
});

test('Required', async ({ page }) => {
  const button = page.locator('app-example[name="required"] c-switch');

  await expect(button).toHaveScreenshot();
});
