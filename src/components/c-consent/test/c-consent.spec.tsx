import { newSpecPage } from '@stencil/core/testing';
import { CConsent } from '../c-consent';

describe('c-consent', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CConsent],
      html: `<c-consent>
      <span>Show your consent</span>
      </c-consent>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
