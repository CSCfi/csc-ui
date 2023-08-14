import { newSpecPage } from '@stencil/core/testing';
import { CTabButtons } from '../c-tab-buttons';
import { CButton } from '../../c-button/c-button';

describe('c-tab-buttons', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CTabButtons, CButton],
      html: `
      <c-tab-buttons>
        <c-button>One</c-button>
        <c-button>Two</c-button>
        <c-button>Three</c-button>
      </c-tab-buttons>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders button size:small', async () => {
    const page = await newSpecPage({
      components: [CTabButtons, CButton],
      html: `
      <c-tab-buttons size="small">
        <c-button>One</c-button>
        <c-button>Two</c-button>
        <c-button>Three</c-button>
      </c-tab-buttons>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders disabled buttons', async () => {
    const page = await newSpecPage({
      components: [CTabButtons, CButton],
      html: `
      <c-tab-buttons disabled>
        <c-button>One</c-button>
        <c-button>Two</c-button>
        <c-button>Three</c-button>
      </c-tab-buttons>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
