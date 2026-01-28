import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(zipCode);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finishCheckout() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async expectSuccess() {
    await expect(this.page.getByRole('heading', { name: 'THANK YOU FOR YOUR ORDER' })).toBeVisible();
  }
}
