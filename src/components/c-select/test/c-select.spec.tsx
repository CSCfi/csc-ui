import { newSpecPage } from '@stencil/core/testing';
import { CSelect } from '../c-select';
import { h } from '@stencil/core';
import { items } from './items';

declare global {
  interface Window {
    IntersectionObserver: unknown;
  }
}

describe('c-select', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.IntersectionObserver = class IntersectionObserver {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      constructor() {}

      disconnect() {
        return null;
      }

      observe() {
        return null;
      }

      takeRecords() {
        return null;
      }

      unobserve() {
        return null;
      }
    };
  });
  it('renders shadow variant', async () => {
    const page = await newSpecPage({
      components: [CSelect],
      template: () => (
        <c-select
          items={items}
          shadow
          placeholder="Select a fruit"
          label="Your favorite fruit"
          hint="This is a hint"
          valid
          validation="Required"
        ></c-select>
      ),
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders hidden details', async () => {
    const page = await newSpecPage({
      components: [CSelect],
      template: () => (
        <c-select
          items={items}
          shadow
          placeholder="Select a fruit"
          label="Your favorite fruit"
          hint="This is a hint"
          valid
          validation="Required"
          hideDetails
        ></c-select>
      ),
    });

    expect(page.root).toMatchSnapshot();
  });
});
