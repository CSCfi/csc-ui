import { newSpecPage } from '@stencil/core/testing';
import { CSidenavigation } from '../c-sidenavigation';

describe('c-sidenavigation', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CSidenavigation],
      html: `<c-sidenavigation>
     </c-sidenavigation>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders visible menu', async () => {
    const page = await newSpecPage({
      components: [CSidenavigation],
      html: `<c-sidenavigation menu-visible=${true}>
     </c-sidenavigation>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders visible mobile-size-menu', async () => {
    const page = await newSpecPage({
      components: [CSidenavigation],
      html: `<c-sidenavigation mobile=${true}>
     </c-sidenavigation>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
