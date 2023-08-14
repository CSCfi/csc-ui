import { newSpecPage } from '@stencil/core/testing';
import { CRow } from '../c-row';

describe('c-row', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CRow],
      html: `<c-row>
        <div slot> 
            <c-button>Button</c-button>
            <c-button>Button</c-button>
        </div>
      </c-row>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders alignment:center', async () => {
    const page = await newSpecPage({
      components: [CRow],
      html: `<c-row align="center">
        <div slot> 
            <c-button>Button</c-button>
            <c-button>Button</c-button>
        </div>
      </c-row>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders alignment:end', async () => {
    const page = await newSpecPage({
      components: [CRow],
      html: `<c-row align="end">
        <div slot> 
            <c-button>Button</c-button>
            <c-button>Button</c-button>
        </div>
      </c-row>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders alignment:start', async () => {
    const page = await newSpecPage({
      components: [CRow],
      html: `<c-row align="start">
        <div slot> 
            <c-button>Button</c-button>
            <c-button>Button</c-button>
        </div>
      </c-row>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom gap', async () => {
    const page = await newSpecPage({
      components: [CRow],
      html: `<c-row align="center" gap="5">
        <div slot> 
            <c-button>Button</c-button>
            <c-button>Button</c-button>
        </div>
      </c-row>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders justification:center', async () => {
    const page = await newSpecPage({
      components: [CRow],
      html: `<c-row align="center" gap="5" justify="center">
        <div slot> 
            <c-button>Button</c-button>
            <c-button>Button</c-button>
        </div>
      </c-row>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders justification:end', async () => {
    const page = await newSpecPage({
      components: [CRow],
      html: `<c-row align="end" gap="5" justify="end">
        <div slot> 
            <c-button>Button</c-button>
            <c-button>Button</c-button>
        </div>
      </c-row>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders justification:space-around', async () => {
    const page = await newSpecPage({
      components: [CRow],
      html: `<c-row align="center" gap="5" justify="space-around">
        <div slot> 
            <c-button>Button</c-button>
            <c-button>Button</c-button>
        </div>
      </c-row>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders justification:space-between', async () => {
    const page = await newSpecPage({
      components: [CRow],
      html: `<c-row align="center" gap="5" justify="space-between">
        <div slot> 
            <c-button>Button</c-button>
            <c-button>Button</c-button>
        </div>
      </c-row>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders justification:start', async () => {
    const page = await newSpecPage({
      components: [CRow],
      html: `<c-row align="start" gap="3" justify="start">
        <div slot> 
            <c-button>Button</c-button>
            <c-button>Button</c-button>
        </div>
      </c-row>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders disable flex wrapping', async () => {
    const page = await newSpecPage({
      components: [CRow],
      html: `<c-row align="start" gap="3" justify="start" nowrap=${true}>
        <div slot> 
            <c-button>Button</c-button>
            <c-button>Button</c-button>
        </div>
      </c-row>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
