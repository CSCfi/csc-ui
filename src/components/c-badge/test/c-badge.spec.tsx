import { newSpecPage } from '@stencil/core/testing';
import { CBadge } from '../c-badge';

describe('c-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CBadge],
      html: `<c-badge></c-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <c-badge>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </c-badge>
    `);
  });
});
