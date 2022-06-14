import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { LineClampComponent } from './line-clamp.component';

export default {
  title: 'Directive/Line clamp',
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [LineClampComponent],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta;

const Template: Story = args => ({
  props: { ...args },
  template: `
    <hxa-line-clamp [row]="row">
      <div #content>
        test<br>
        test<br>
        test<br>
        test<br>
        test<br>
        test
      </div>
    </hxa-line-clamp>
  `,
});

export const Default = Template.bind({});
Default.args = {
  row: 3,
};
