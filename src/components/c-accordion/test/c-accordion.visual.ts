import { test, expect } from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  await page.goto('http://localhost:4200/c-accordion');

  await page.waitForTimeout(1000);

  const accordion = page
    .locator('app-example[name="basic"] c-accordion')
    .first();

  // Expect initial visual appearance
  await expect(accordion).toHaveScreenshot();

  const firstItem = accordion.locator('c-accordion-item button').first();

  await firstItem.click();

  // Expect first accordion item to be closed on click
  await expect(accordion).toHaveScreenshot();

  const secondItem = accordion.locator('c-accordion-item button').nth(1);

  await secondItem.click();

  // Expect second accordion item to be open on click
  await expect(accordion).toHaveScreenshot();
});

test('Mandatory selection', async ({ page }) => {
  await page.goto('http://localhost:4200/c-accordion');

  const accordion = page
    .locator('app-example[name="mandatory"] c-accordion')
    .first();

  // Expect initial visual appearance
  await expect(accordion).toHaveScreenshot();

  const firstItem = accordion.locator('c-accordion-item button').first();
  await firstItem.click();

  // Expect first accordion item to remain open
  await expect(accordion).toHaveScreenshot();

  const secondItem = accordion.locator('c-accordion-item button').nth(1);
  await secondItem.click();

  // Expect second accordion item to be open on click
  await expect(accordion).toHaveScreenshot();
});

test('Multiple selection', async ({ page }) => {
  await page.goto('http://localhost:4200/c-accordion');

  const accordion = page
    .locator('app-example[name="multiple"] c-accordion')
    .first();

  // Expect initial visual appearance
  await expect(accordion).toHaveScreenshot();

  const secondItem = accordion.locator('c-accordion-item button').nth(1);
  await secondItem.click();

  // Expect all accordion items to be open
  await expect(accordion).toHaveScreenshot();

  await accordion.locator('c-accordion-item button').nth(0).click();
  await accordion.locator('c-accordion-item button').nth(1).click();
  await accordion.locator('c-accordion-item button').nth(2).click();

  // Expect all accordion item to be closed on click
  await expect(accordion).toHaveScreenshot();
});

test('Outlined', async ({ page }) => {
  await page.goto('http://localhost:4200/c-accordion');

  const accordion = page
    .locator('app-example[name="outlined"] c-accordion')
    .first();

  // Expect initial visual appearance
  await expect(accordion).toHaveScreenshot();
});
