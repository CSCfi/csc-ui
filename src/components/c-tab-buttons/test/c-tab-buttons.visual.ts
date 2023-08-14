import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-tab-buttons');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const tabButtons = page.locator('app-example[name="basic"] div').nth(1);

  await expect(tabButtons).toHaveScreenshot();

  await page
    .getByTitle('Basic usage')
    .getByRole('button', { name: 'One' })
    .click();

  await expect(tabButtons).toHaveScreenshot();

  await page
    .getByTitle('Basic usage')
    .getByRole('button', { name: 'One' })
    .click();

  await expect(tabButtons).toHaveScreenshot();
});

test('Mandatory', async ({ page }) => {
  const tabButtons = page.locator('app-example[name="mandatory"] div').nth(1);

  await expect(tabButtons).toHaveScreenshot();

  await page
    .getByTitle('Basic usage')
    .getByRole('button', { name: 'One' })
    .click();

  await expect(tabButtons).toHaveScreenshot();
});

test('Disabled', async ({ page }) => {
  const tabButtons = page.locator('app-example[name="disabled"] div').nth(1);

  await expect(tabButtons).toHaveScreenshot();
});

test('Small', async ({ page }) => {
  const tabButtons = page.locator('app-example[name="small"] div').nth(1);

  await expect(tabButtons).toHaveScreenshot();
});

test('Large', async ({ page }) => {
  const tabButtons = page.locator('app-example[name="large"] div').nth(1);

  await expect(tabButtons).toHaveScreenshot();
});

test('Descriptions', async ({ page }) => {
  const tabButtons = page
    .locator('app-example[name="descriptions"] div')
    .nth(1);

  await expect(tabButtons).toHaveScreenshot();
});
