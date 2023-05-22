import { newSpecPage } from '@stencil/core/testing';
import { CAlert } from '../c-alert';

describe('c-alert', () => {
  const title = 'Quis porro id?';
  const content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, harum pariatur deserunt
  obcaecati maiores cupiditate magnam! Minima omnis libero sequi consectetur nesciunt. Facilis
  maxime ratione molestiae expedita quis porro id?`;
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CAlert],
      html: `<c-alert>
      <div slot="title">${title}</div>
      ${content}</c-alert>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders type: info', async () => {
    const page = await newSpecPage({
      components: [CAlert],
      html: `<c-alert type="info">
      <div slot="title">${title}</div>
      ${content}</c-alert>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders type: success', async () => {
    const page = await newSpecPage({
      components: [CAlert],
      html: `<c-alert type="success">
      <div slot="title">${title}</div>
      ${content}</c-alert>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders type: warning', async () => {
    const page = await newSpecPage({
      components: [CAlert],
      html: `<c-alert type="warning">
      <div slot="title">${title}</div>
      ${content}</c-alert>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders type: error', async () => {
    const page = await newSpecPage({
      components: [CAlert],
      html: `<c-alert type="error">
      <div slot="title">${title}</div>
      ${content}</c-alert>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
