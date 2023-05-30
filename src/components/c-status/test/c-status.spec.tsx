import { newSpecPage } from '@stencil/core/testing';
import { CStatus } from '../c-status';

describe('c-status', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CStatus],
      html: `<c-status></c-status>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders type: error', async () => {
    const page = await newSpecPage({
      components: [CStatus],
      html: `<c-status type="error"></c-status>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders type: info', async () => {
    const page = await newSpecPage({
      components: [CStatus],
      html: `<c-status type="info"></c-status>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders type: success', async () => {
    const page = await newSpecPage({
      components: [CStatus],
      html: `<c-status type="success"></c-status>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders type: warning', async () => {
    const page = await newSpecPage({
      components: [CStatus],
      html: `<c-status type="warning"></c-status>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
