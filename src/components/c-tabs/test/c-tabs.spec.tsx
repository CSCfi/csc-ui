import { newSpecPage } from '@stencil/core/testing';
import { CTabs } from '../c-tabs';
import { CTab } from '../../c-tab/c-tab';

describe('c-tabs', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CTabs],
      html: `<c-tabs></c-tabs>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders c-tab', async () => {
    const page = await newSpecPage({
      components: [CTabs, CTab],
      html: `
      <c-tabs>
        <c-tab>One</c-tab>
        <c-tab>Two</c-tab>
        <c-tab>Three</c-tab>
      </c-tabs>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders value of current actibe tab', async () => {
    const page = await newSpecPage({
      components: [CTabs, CTab],
      html: `
      <c-tabs value="tab2">
        <c-tab value="tab1">One</c-tab>
        <c-tab value="tab2">Two</c-tab>
        <c-tab value="tab3">Three</c-tab>
      </c-tabs>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('disables bottom border', async () => {
    const page = await newSpecPage({
      components: [CTabs, CTab],
      html: `
      <c-tabs value="tab2" borderless=${true}>
        <c-tab value="tab1">One</c-tab>
        <c-tab value="tab2">Two</c-tab>
        <c-tab value="tab3">Three</c-tab>
      </c-tabs>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render active tab', async () => {
    const page = await newSpecPage({
      components: [CTabs, CTab],
      html: `
      <c-tabs value="tab1">
        <c-tab value="tab1">One</c-tab>
        <c-tab value="tab2" active=${true}>Two</c-tab>
        <c-tab value="tab3">Three</c-tab>
      </c-tabs>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render disabled tab', async () => {
    const page = await newSpecPage({
      components: [CTabs, CTab],
      html: `
      <c-tabs value="tab1">
        <c-tab value="tab1">One</c-tab>
        <c-tab value="tab2" disabled=${true}>Two</c-tab>
        <c-tab value="tab3">Three</c-tab>
      </c-tabs>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render id', async () => {
    const page = await newSpecPage({
      components: [CTabs, CTab],
      html: `
      <c-tabs value="tab1">
        <c-tab value="tab1">One</c-tab>
        <c-tab value="tab2" id="second">Two</c-tab>
        <c-tab value="tab3">Three</c-tab>
      </c-tabs>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
