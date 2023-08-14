import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-login-card');

  testInfo.snapshotSuffix = '';
});

test('With custom image', async ({ page }) => {
  const loginCard = page.locator('app-example[name="basic"] div').nth(1);

  await expect(loginCard).toHaveScreenshot();
});

test('Overlay', async ({ page }) => {
  const loginCard = page.locator('app-example[name="overlay"] div').nth(1);

  await expect(loginCard).toHaveScreenshot();
});

test('Default CSC background', async ({ page }) => {
  const loginCard = page.locator('app-example[name="basicCSC"] div').nth(1);

  await expect(loginCard).toHaveScreenshot();
});
