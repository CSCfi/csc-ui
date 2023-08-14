import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-menu');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const menu = page.locator('app-example[name="basic"] c-menu');

  await expect(menu).toHaveScreenshot();

  await menu.locator('button').click();

  await expect(menu).toHaveScreenshot();

  const menuItems = page.locator('c-menu-items');

  await expect(menuItems).toHaveScreenshot();
});

test('Without hover', async ({ page }) => {
  const menu = page.locator('app-example[name="nohover"] c-menu');

  await menu.locator('button').click();

  await expect(menu).toHaveScreenshot();
});

test('Small', async ({ page }) => {
  const menu = page.locator('app-example[name="small"] c-menu');

  await expect(menu).toHaveScreenshot();

  await menu.locator('button').click();

  await expect(menu).toHaveScreenshot();

  const menuItems = page.locator('c-menu-items');

  await expect(menuItems).toHaveScreenshot();
});

test('Simple', async ({ page }) => {
  const menu = page.locator('app-example[name="simple"] c-menu');

  await expect(menu).toHaveScreenshot();

  await menu.locator('c-icon-button').click();

  await expect(menu).toHaveScreenshot();

  const menuItems = page.locator('c-menu-items');

  await expect(menuItems).toHaveScreenshot();
});

test('Programmatic variant', async ({ page }) => {
  const menu = page.locator('app-example[name="custom"] c-menu');

  await expect(menu).toHaveScreenshot();

  await menu.locator('c-button').click();

  await expect(menu).toHaveScreenshot();

  const menuItems = page.locator('c-menu-items');

  await expect(menuItems).toHaveScreenshot();
});
