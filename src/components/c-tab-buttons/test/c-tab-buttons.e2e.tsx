import { newE2EPage } from '@stencil/core/testing';

describe('c-tab-buttons', () => {
  it('reacts to value change', async () => {
    const page = await newE2EPage({
      html: `<c-tab-buttons></c-tab-buttons>`,
    });
  });
});
