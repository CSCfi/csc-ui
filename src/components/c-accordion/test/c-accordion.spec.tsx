import { newSpecPage } from '@stencil/core/testing';
import { CAccordion } from '../c-accordion';
import { CAccordionItem } from '../../c-accordion-item/c-accordion-item';

describe('c-accordion', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CAccordion, CAccordionItem],
      html: `
      <c-accordion>
        <c-accordion-item heading="One" value="one">
            <i class="mdi mdi-access-point" slot="icon"></i>
            Lorem ipsum dolor sit amet.
        </c-accordion-item>
        <c-accordion-item heading="Two" value="two">
            <i class="mdi mdi-nas" slot="icon"></i>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, perspiciatis?
        </c-accordion-item>
        <c-accordion-item heading="Three" value="three">
            <i class="mdi mdi-camera" slot="icon"></i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatum perspiciatis
            itaque!
        </c-accordion-item>
      </c-accordion>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders expanded accordion-item', async () => {
    const page = await newSpecPage({
      components: [CAccordion, CAccordionItem],
      html: `
      <c-accordion value="one">
        <c-accordion-item heading="One" value="one">
            <i class="mdi mdi-access-point" slot="icon"></i>
            Lorem ipsum dolor sit amet.
        </c-accordion-item>
        <c-accordion-item heading="Two" value="two">
            <i class="mdi mdi-nas" slot="icon"></i>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, perspiciatis?
        </c-accordion-item>
        <c-accordion-item heading="Three" value="three">
            <i class="mdi mdi-camera" slot="icon"></i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatum perspiciatis
            itaque!
        </c-accordion-item>
      </c-accordion>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders outlined items', async () => {
    const page = await newSpecPage({
      components: [CAccordion, CAccordionItem],
      html: `
      <c-accordion value="one" outlined>
        <c-accordion-item heading="One" value="one">
            <i class="mdi mdi-access-point" slot="icon"></i>
            Lorem ipsum dolor sit amet.
        </c-accordion-item>
        <c-accordion-item heading="Two" value="two" expanded>
            <i class="mdi mdi-nas" slot="icon"></i>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, perspiciatis?
        </c-accordion-item>
        <c-accordion-item heading="Three" value="three">
            <i class="mdi mdi-camera" slot="icon"></i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatum perspiciatis
            itaque!
        </c-accordion-item>
      </c-accordion>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
