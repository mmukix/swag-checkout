import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.pages';
import { InventoryPage } from '../pages/InventoryPage.pages';
import { CheckoutPage } from '../pages/CheckoutPage.pages';
import { UserData } from '../utils/UserData';

test('End-to-End Purchase Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login(UserData.username, UserData.password);
  await expect(page).toHaveURL(/.*inventory.html/);

  // Add item to cart
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.expectCartBadge(1);
  await inventoryPage.openCart();
  await inventoryPage.expectItemInCart('Sauce Labs Backpack');

  // Checkout
  await page.getByRole('button', { name: 'Checkout' }).click();
  await checkoutPage.fillCheckoutInfo(UserData.firstName, UserData.lastName, UserData.zipCode);

  // Verify correct item is present on checkout step two
  const cartItem = await inventoryPage.cartItem('Sauce Labs Backpack');
  await expect(cartItem).toContainText('Sauce Labs Backpack');

  // Verify order totals (regex for example, will not return actual totals in this state)
  await expect(page.getByText(/Item total: \$\d+\.\d{2}/)).toBeVisible();
  await expect(page.getByText(/Tax: \$\d+\.\d{2}/)).toBeVisible();
  await expect(page.getByText(/Total: \$\d+\.\d{2}/)).toBeVisible();

  // Finish
  await checkoutPage.finishCheckout();
  await checkoutPage.expectSuccess();
});
