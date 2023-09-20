import { newSpecPage } from '@stencil/core/testing';
import { CSideNavigation } from '../c-side-navigation';
import { CSideNavigationItem } from '../../c-side-navigation-item/c-side-navigation-item';
import { CSubNavigationItem } from '../../c-sub-navigation-item/c-sub-navigation-item';

describe('c-side-navigation', () => {
  it('renders visible menu', async () => {
    const page = await newSpecPage({
      components: [CSideNavigation, CSideNavigationItem, CSubNavigationItem],
      html: `
      <c-side-navigation menu-visible=${true}>
        <c-side-navigation-item active href="google.com" target="_blank">Google</c-side-navigation-item>
        <c-side-navigation-item> Something
          <c-sub-navigation-item focusable href="somewhere.com" target="_blank"></c-sub-navigation-item>
        </c-side-navigation-item>
        <c-side-navigation-item href="csc.fi" target="_blank">CSC</c-side-navigation-item>
      </c-side-navigation>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
