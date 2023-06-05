import { newE2EPage, newSpecPage } from '@stencil/core/testing';
import { CDataTable } from '../c-data-table';
import { basicData, basicHeaders } from './data';
import { h } from '@stencil/core';

declare global {
  interface Window {
    IntersectionObserver: unknown;
  }
}

describe('c-data-table', () => {
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
    global.ResizeObserver = class ResizeObserver {
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
  it.only('renders default html', async () => {
    const page = await newSpecPage({
      components: [CDataTable],
      template: () => (
        <c-data-table headers={basicHeaders} data={basicData}></c-data-table>
      ),
    });

    expect(page.root).toMatchSnapshot();
  });

  it.only('renders specific columns as hidden and expands on click', async () => {
    const headers = JSON.parse(JSON.stringify(basicHeaders));

    headers[2].hidden = true;

    const page = await newSpecPage({
      components: [CDataTable],
      template: () => (
        <c-data-table headers={headers} data={basicData}></c-data-table>
      ),
    });

    expect(page.root).toMatchSnapshot();

    const firstRow = page.root.shadowRoot.querySelector(
      '.parent',
    ) as HTMLElement;

    firstRow.click();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  it('renders horizontal scroll', async () => {
    const page = await newSpecPage({
      components: [CDataTable],
      html: `<c-data-table></c-data-table>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders disabled sorting', async () => {
    const page = await newSpecPage({
      components: [CDataTable],
      html: `<c-data-table></c-data-table>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('allows sorting by column', async () => {
    const page = await newSpecPage({
      components: [CDataTable],
      html: `<c-data-table></c-data-table>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom header width', async () => {
    const page = await newSpecPage({
      components: [CDataTable],
      html: `<c-data-table></c-data-table>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders pagination and adds custom pagination text', async () => {
    const page = await newSpecPage({
      components: [CDataTable],
      html: `<c-data-table></c-data-table>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders sticky header', async () => {
    const page = await newSpecPage({
      components: [CDataTable],
      html: `<c-data-table></c-data-table>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('allows to select rows', async () => {
    const page = await newSpecPage({
      components: [CDataTable],
      html: `<c-data-table></c-data-table>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
