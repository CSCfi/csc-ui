import { newSpecPage } from '@stencil/core/testing';
import { CLoginCard } from '../c-login-card';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('c-login-card', () => {
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
