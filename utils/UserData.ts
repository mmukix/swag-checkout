export const UserData = {
    username: 'standard_user',
    password: 'secret_sauce',
    firstName: 'Michelle',
    lastName: 'Leonard',
    zipCode: '85283'
  };
  
  import { expect, Page } from '@playwright/test';

  export async function verifyShippingInfo(
    page: Page,
    texts: string[],
  ) {
    for (const text of texts) {
      await expect(page.getByText(text)).toBeVisible();
    }
  }
  