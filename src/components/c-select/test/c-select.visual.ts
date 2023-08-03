import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-select');

  await page.waitForTimeout(200);

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const select = page.locator('app-example[name="basic"] c-select');

  await expect(select).toHaveScreenshot();

  await select.locator('.c-input-menu__input').click();

  const menu = select.locator('ul');

  await expect(menu).toHaveScreenshot();

  await expect(select).toHaveScreenshot();

  await page.getByRole('option', { name: 'Orange' }).click();

  await expect(select).toHaveScreenshot();
});

test('Shadow', async ({ page }) => {
  const select = page.locator('app-example[name="shadow"] c-select');

  await expect(select).toHaveScreenshot();

  await select.locator('.c-input-menu__input').click();

  const menu = select.locator('ul');

  await expect(menu).toHaveScreenshot();

  await expect(select).toHaveScreenshot();

  await page.getByRole('option', { name: 'Orange' }).click();

  await expect(select).toHaveScreenshot();
});

test('Scrollable', async ({ page }) => {
  const select = page.locator('app-example[name="scrollable"] c-select');

  await expect(select).toHaveScreenshot();

  await select.locator('.c-input-menu__input').click();

  const menu = select.locator('ul');

  await expect(menu).toHaveScreenshot();

  await expect(select).toHaveScreenshot();

  await page.getByRole('option', { name: 'Orange' }).click();

  await expect(select).toHaveScreenshot();
});
