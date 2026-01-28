import { test, expect } from '@playwright/test';

test('Purchase Flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag/);

  await page.getByRole('textbox', { name: 'Username'}).fill('standard_user');
  await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');

  // Submit login
  await page.getByRole('button', { name: 'Login'}).click();
  await expect(page).toHaveURL(/.*inventory.html/);

  //add item to the cart
  const backpack = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });

  await backpack.getByRole('button', { name: 'Add to cart' }).click();

  const cartLink = page.locator('.shopping_cart_link');
  const cartBadge = page.locator('.shopping_cart_badge');

  // Assert cart link is visible
  await expect(cartLink).toBeVisible();

  // Assert badge appears and shows 1 item
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText('1');

    //click on shopping cart link
  await page.locator('.shopping_cart_link').click();

  // Assert the correct item is in the cart
  await expect(
    page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })
  ).toBeVisible();

  //Click checkout and verify Checkout page
  await page.getByRole('button', { name: 'Checkout'}).click();

  //Fill in checkout info
  await page.getByRole('textbox', {name: 'First Name'}).fill('Michelle');
  await page.getByRole('textbox', {name: 'Last Name'}).fill('Leonard');
  await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('85283');
  await page.getByRole('button', { name: 'Continue' }).click();

  //Verify info is correct
  await expect(page).toHaveURL(/checkout-step-two.html/);

  // Assert payment information section
  await expect(
    page.getByText('Payment Information')
  ).toBeVisible();

  await expect(
    page.getByText('SauceCard #31337')
  ).toBeVisible();

  // Assert shipping information
  await expect(
    page.getByText('Shipping Information')
  ).toBeVisible();

  await expect(
    page.getByText('FREE PONY EXPRESS DELIVERY!')
  ).toBeVisible();

  //Assert correct item is being purchased
  await expect(
    page.locator('.inventory_item_name')
  ).toHaveText('Sauce Labs Backpack');

  // Item total (don’t hardcode full string to avoid brittleness)
  await expect(
    page.getByText(/Item total: \$\d+\.\d{2}/)
  ).toBeVisible();

  // Tax
  await expect(
    page.getByText(/Tax: \$\d+\.\d{2}/)
  ).toBeVisible();

  // Total
  await expect(
    page.getByText(/Total: \$\d+\.\d{2}/)
  ).toBeVisible();

  //Finish transaction
  await page.getByRole('button', { name: 'Finish' }).click();

  //Assert success page
  await expect(
    page.getByRole('heading', { name: 'THANK YOU FOR YOUR ORDER' })
  ).toBeVisible();


  });
