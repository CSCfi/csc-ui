import { newSpecPage } from '@stencil/core/testing';
import { CCard } from '../c-card';
import { CCardActions } from '../c-card-actions';
import { CCardContent } from '../c-card-content';
import { CCardTitle } from '../c-card-title';

describe('c-card', () => {
  const title = 'Quis porro id?';
  const content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, harum pariatur deserunt
  obcaecati maiores cupiditate magnam! Minima omnis libero sequi consectetur nesciunt. Facilis
  maxime ratione molestiae expedita quis porro id?`;
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `
      <c-card></c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders c-card-title', async () => {
    const page = await newSpecPage({
      components: [CCard, CCardTitle],
      html: `
      <c-card>
        <c-card-title>${title}</c-card-title>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders c-card-content', async () => {
    const page = await newSpecPage({
      components: [CCard, CCardContent],
      html: `
      <c-card>
        <c-card-content>${content}</c-card-content>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders c-card-actions', async () => {
    const page = await newSpecPage({
      components: [CCard, CCardActions],
      html: `
      <c-card>
        <c-card-actions></c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders title, content and actions', async () => {
    const page = await newSpecPage({
      components: [CCard, CCardTitle, CCardContent, CCardActions],
      html: `
      <c-card>
        <c-card-title>${title}</c-card-title>
        <c-card-content>${content}</c-card-content>
        <c-card-actions></c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders c-card-actions, custom alignment: end', async () => {
    const page = await newSpecPage({
      components: [CCard, CCardActions],
      html: `
      <c-card>
        <c-card-actions align="end"></c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders c-card-actions, custom justification: space-between', async () => {
    const page = await newSpecPage({
      components: [CCard, CCardActions],
      html: `
      <c-card>
        <c-card-actions justify="space-between"></c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render custom background-color', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card background-color="red"></c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render chosen background-photo, called allas', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card background="allas"></c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render another chosen background-photo, called mahti', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card background="mahti"></c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render custom background-photo', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card background="dog"></c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('with fullscreen button', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card fullscreen={true}></c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('opens fullscreen when button pressed', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card fullscreen={true}></c-card>`,
    });

    expect(page.root).toMatchSnapshot();

    const iconbutton = page.root.shadowRoot.querySelector(
      '.c-card__fullscreen-toggle',
    ) as HTMLElement;

    iconbutton.click();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  it('shrinks back to normal when button pressed in fullscreen-mode', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card fullscreen={true}></c-card>`,
    });

    expect(page.root).toMatchSnapshot();

    const iconbutton = page.root.shadowRoot.querySelector(
      '.c-card__fullscreen-toggle',
    ) as HTMLElement;

    iconbutton.click();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    iconbutton.click();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
