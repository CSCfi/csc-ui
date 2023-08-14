import { newSpecPage } from '@stencil/core/testing';
import { CSidenavigation } from '../c-sidenavigation';
import { CSidenavigationitem } from '../../c-sidenavigationitem/c-sidenavigationitem';
import { CSubnavigationitem } from '../../c-subnavigationitem/c-subnavigationitem';

describe('c-sidenavigation', () => {
  it('renders visible menu', async () => {
    const page = await newSpecPage({
      components: [CSidenavigation, CSidenavigationitem, CSubnavigationitem],
      html: `
      <c-sidenavigation menu-visible=${true}>
        <c-sidenavigationitem active href="google.com" target="_blank">Google</c-sidenavigationitem>
        <c-sidenavigationitem> Something
          <c-subnavigationitem focusable href="somewhere.com" target="_blank"></c-subnavigationitem>
        </c-sidenavigationitem>
        <c-sidenavigationitem href="csc.fi" target="_blank">CSC</c-sidenavigationitem>
      </c-sidenavigation>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
