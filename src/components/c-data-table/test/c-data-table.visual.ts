import { test, expect } from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  await page.goto('http://localhost:4200/c-data-table');

  const table = page.locator('app-example[name="basic"] c-data-table').first();

  // Expect initial visual appearance
  await expect(table).toHaveScreenshot();
});

test('Row selection', async ({ page }) => {
  await page.goto('http://localhost:4200/c-data-table');

  const table = page
    .locator('app-example[name="complex"] c-data-table')
    .first();

  await table.scrollIntoViewIfNeeded();

  await page
    .getByTitle('Complex example')
    .getByText('Items per page: 10')
    .click();

  await page.getByRole('menuitem', { name: '5', exact: true }).click();

  await table.scrollIntoViewIfNeeded();

  // select all
  await table.locator('c-checkbox').first().click();

  await expect(table).toHaveScreenshot();

  // de-select all
  await table.locator('c-checkbox').first().click();

  const checkbox = table.locator('c-checkbox').nth(1);

  await checkbox.click();

  // Expect first row to be selected on checkbox click
  await expect(table).toHaveScreenshot();

  await checkbox.click();

  // Expect first row to be de-selected on another checkbox click
  await expect(table).toHaveScreenshot();
});
