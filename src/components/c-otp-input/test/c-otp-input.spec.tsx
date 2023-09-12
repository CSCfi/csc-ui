import { newSpecPage } from '@stencil/core/testing';
import { COtpInput } from '../c-otp-input';

describe('c-otp-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [COtpInput],
      html: `<c-otp-input></c-otp-input>`,
    });
    expect(page.root).toEqualHtml(`
      <c-otp-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </c-otp-input>
    `);
  });
});
