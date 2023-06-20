import { newSpecPage } from '@stencil/core/testing';
import { CLoginCard } from '../c-login-card';
import { CLoginCardTitle } from '../../c-login-card-title/c-login-card-title';
import { CLoginCardContent } from '../../c-login-card-content/c-login-card-content';
import { CLoginCardActions } from '../../c-login-card-actions/c-login-card-actions';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('c-login-card', () => {
  const title = `Login title`;
  const content = `This is a login card`;
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CLoginCard],
      html: `<c-login-card>
      ${content}
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders title', async () => {
    const page = await newSpecPage({
      components: [CLoginCard, CLoginCardTitle],
      html: `
      <c-login-card>
        <c-login-card-title>
          ${title}
        </c-login-card-title>
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders content', async () => {
    const page = await newSpecPage({
      components: [CLoginCard, CLoginCardContent],
      html: `
      <c-login-card>
        <c-login-card-content>
         ${content}
        </c-login-card-content>
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders actions', async () => {
    const page = await newSpecPage({
      components: [CLoginCard, CLoginCardActions],
      html: `
      <c-login-card>
        <c-login-card-actions>
        </c-login-card-actions>
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders title, content, actions', async () => {
    const page = await newSpecPage({
      components: [
        CLoginCard,
        CLoginCardTitle,
        CLoginCardContent,
        CLoginCardActions,
      ],
      html: `
      <c-login-card>
        <c-login-card-title>
          ${title}
        </c-login-card-title>
        <c-login-card-content>
          ${content}
        </c-login-card-content>
        <c-login-card-actions>
        </c-login-card-actions>
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders actions, custom align: end', async () => {
    const page = await newSpecPage({
      components: [CLoginCard, CLoginCardActions],
      html: `
      <c-login-card>
        <c-login-card-actions align="end">
        </c-login-card-actions>
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders actions, custom justification: space-around', async () => {
    const page = await newSpecPage({
      components: [CLoginCard, CLoginCardActions],
      html: `
      <c-login-card>
        <c-login-card-actions justify="space-around">
        </c-login-card-actions>
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('add source to background-image', async () => {
    const page = await newSpecPage({
      components: [CLoginCard],
      html: `<c-login-card src="mahti">
      ${content}
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom background-position', async () => {
    const page = await newSpecPage({
      components: [CLoginCard],
      html: `<c-login-card background-position="top left" src="mahti">
      ${content}
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom background-position', async () => {
    const page = await newSpecPage({
      components: [CLoginCard],
      html: `<c-login-card background-position="25% 50%" src="mahti">
      ${content}
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom breakpoint for mobile', async () => {
    const page = await newSpecPage({
      components: [CLoginCard],
      html: `<c-login-card mobile-breakpoint="500">
      ${content}
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders colored overlay', async () => {
    const page = await newSpecPage({
      components: [CLoginCard],
      html: `<c-login-card overlay=${true} 
      overlay-blend-mode="hue"  
      background-position="top left" 
      src="mahti">
      ${content}
      </c-login-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
