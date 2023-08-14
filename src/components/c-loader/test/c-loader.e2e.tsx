import { newE2EPage } from '@stencil/core/testing';
import { sleep } from '../../../utils/test/sleep';

describe('c-loader', () => {
  it('should render delayed content', async () => {
    const page = await newE2EPage({
      html: `
    <c-loader contentdelay="1">
      Delayed text
    </c-loader>`,
    });

    expect(
      await page.$eval('c-loader >>> .c-loader__slot', (el) => el.clientHeight),
    ).toBe(0);

    await sleep(1100);

    expect(
      await page.$eval('c-loader >>> .c-loader__slot', (el) => el.clientHeight),
    ).not.toBe(0);
  });
});
