import { newSpecPage } from '@stencil/core/testing';
import { CMenu } from '../c-menu';

describe('c-menu', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CMenu],
      html: `
      <c-menu>
      </c-menu>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  //this might need to be tested with e2e
  it('renders custom amount of pages before adding scroll', async () => {
    const page = await newSpecPage({
      components: [CMenu],
      html: `<c-menu items-per-page="3">
      </c-menu>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders no-hover background', async () => {
    const page = await newSpecPage({
      components: [CMenu],
      html: `<c-menu nohover=${true}>
      </c-menu>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders simple variant', async () => {
    const page = await newSpecPage({
      components: [CMenu],
      html: `<c-menu simple=${true}>
      </c-menu>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders small variant', async () => {
    const page = await newSpecPage({
      components: [CMenu],
      html: `<c-menu small=${true}>
      </c-menu>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
