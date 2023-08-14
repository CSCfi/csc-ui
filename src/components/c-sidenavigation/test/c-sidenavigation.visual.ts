import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-sidenavigation');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const sideNavigation = page.locator(
    'app-example[name="basic"] c-sidenavigation',
  );

  await expect(sideNavigation).toHaveScreenshot();

  await sideNavigation.locator('c-sidenavigationitem').nth(1).click();

  await expect(sideNavigation).toHaveScreenshot();

  await sideNavigation.locator('c-sidenavigationitem').nth(1).click();

  await expect(sideNavigation).toHaveScreenshot();

  await sideNavigation.locator('c-sidenavigationitem').first().click();

  await expect(sideNavigation).toHaveScreenshot();
});
