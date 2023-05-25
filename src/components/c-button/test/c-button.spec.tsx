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

  it('inverted button style for dark mode', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button inverted={true}>
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('loading', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button loading={true}>
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('remove border', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button no-radius={true}>
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('with outline', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button outlined={true}>
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('with path to svg-icon', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button path="path to my svg">
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('with path to svg-icon and icon after text', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button path="path to my svg" icon-end={true}>
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('add size: large', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button size="large">
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('add size: small', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button size="small">
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('add size: default', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button size="default">
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('add target', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button target="_blank">
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('with only visible text', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button text={true}>
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render type: button', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button type="button">
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render type: submit', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button type="submit">
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('add value', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button value="first">
      ButtonText
      </c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
