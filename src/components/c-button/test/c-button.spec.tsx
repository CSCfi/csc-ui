import { newSpecPage } from '@stencil/core/testing';
import { CButton } from '../c-button';

describe('button', () => {
  const description = 'Log out';
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button>Default</c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders button with filled slots', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button>
      <div slot="icon" class="mdi mdi-login"></div>
        Default
        <div slot="description">${description}</div> 
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders disabled button', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button disabled={true}>
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders fitted button', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button fit={true}>
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders ghost button', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button ghost={true}>
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('add id', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button id="important">
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('add href', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button href="www.google.com">
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render icon by attribute, not slot', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button icon="account">
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render icon after text', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button icon-end={true}>
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
