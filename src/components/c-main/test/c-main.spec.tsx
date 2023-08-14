import { newSpecPage } from '@stencil/core/testing';
import { CMain } from '../c-main';

describe('c-main', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CMain],
      html: `<c-main>
      <div slot>
      <c-container>
      <h1>Hello world!</h1>
      <p>This is a test></p>
      </c-container>
      </div>
      </c-main>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
