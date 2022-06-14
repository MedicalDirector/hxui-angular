import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { AccordionBodyComponent } from './accordion.body';
import { AccordionComponent } from './accordion.component';
import { AccordionContainerComponent } from './accordion.container.component';
import { AccordionHeaderComponent } from './accordion.header.component';

export default {
  title: 'Component/Accordion',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule],
      declarations: [
        AccordionComponent,
        AccordionContainerComponent,
        AccordionHeaderComponent,
        AccordionBodyComponent,
      ],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta;

const TemplateSimple: Story = args => {
  const onHeaderClick = $event => action('header clicked')($event);
  return {
    props: { ...args, onHeaderClick },
    template: `
      <hx-accordion [cssClass]="cssClass">
        <hx-accordion-container
          *ngFor="let item of items"
          [expanded]="!!item?.expanded"
          [empty]="!!item?.empty"
          [disabled]="!!item?.disabled"
          [id]="item?.id"
          (headerClick)="onHeaderClick($event)"
        >
          <hx-accordion-header>{{ item?.header }}</hx-accordion-header>
          <hx-accordion-body>
            <p>{{ item?.content }}</p>
          </hx-accordion-body>
        </hx-accordion-container>
      </hx-accordion>
    `,
  };
};

export const Simple = TemplateSimple.bind({});
Simple.args = {
  items: [
    {
      id: 0,
      header: 'This is the header',
      content: 'This is the body',
      expanded: true,
      disabled: false,
      empty: true,
    },
    {
      id: 1,
      header: 'This is the second header.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu suscipit ante. Nulla nec nulla eget quam fringilla blandit. Vivamus gravida purus erat, id ultrices lacus sagittis vel. Etiam nec nulla eleifend velit tristique faucibus sed ut nisl.',
      expanded: false,
      disabled: false,
      empty: true,
    },
  ],
};

const TemplateComplex: Story = args => ({
  props: { ...args },
  template: `
    <hx-accordion [cssClass]="cssClass">
      <hx-accordion-container
        (headerClick)="onHeaderClick($event)"
      >
        <hx-accordion-header>
          This is the header
        </hx-accordion-header>
        <hx-accordion-body>
          <p>This is the body</p>
        </hx-accordion-body>
      </hx-accordion-container>
      <hx-accordion-container 
        [expanded]="initialExpandedStateSecond"
        (headerClick)="onHeaderClick($event)"
      >
        <hx-accordion-header>
          This is the second header. <b>You can even style it!</b> <i
            class="hx-icon icon-helix is-small is-info"></i>
        </hx-accordion-header>
        <hx-accordion-body>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer eu suscipit ante. Nulla nec nulla eget quam fringilla blandit.
            Vivamus gravida purus erat, id ultrices lacus sagittis vel.
            Etiam nec nulla eleifend velit tristique faucibus sed ut nisl.
          </p>
        </hx-accordion-body>
      </hx-accordion-container>
    </hx-accordion>
  `,
});

export const Complex = TemplateComplex.bind({});
Complex.args = {
  cssClass: '',
  initialExpandedStateSecond: false,
};
