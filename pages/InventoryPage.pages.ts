import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  itemLocator(itemName: string) {
    return this.page.locator('.inventory_item').filter({ hasText: itemName });
  }

  async addItemToCart(itemName: string) {
    await this.itemLocator(itemName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartBadge(count: number) {
    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText(count.toString());
  }

  async cartItem(name: string) {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  async expectItemInCart(itemName: string) {
    await expect(this.page.locator('.cart_item').filter({ hasText: itemName })).toBeVisible();
  }
}
