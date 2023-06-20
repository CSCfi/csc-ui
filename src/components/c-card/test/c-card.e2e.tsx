import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('c-card', () => {
  let page: E2EPage;

  let card: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({ html: `<c-card></c-card>` });
    card = await page.find('c-card');
  });

  it('renders correctly', async () => {
    //expect(autocomplete).toHaveClass('hydrated');
  });
});
