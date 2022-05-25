import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { Context, Size } from '../enums';
import { LoadersComponent } from './loaders.component';

export default {
  title: 'Component/Loader',
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [LoadersComponent],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta;

const Template: Story = args => ({
  props: { ...args },
  template: `
    <hxa-loader *ngFor="let ctx of context"
      [context]="ctx"
      [size]="size"
    ></hxa-loader>
  `,
});

export const Base = Template.bind({});
Base.args = {
  context: [
    Context.Info,
    Context.None,
    Context.Success,
    Context.Warning,
    Context.Danger,
    Context.Info,
    Context.White,
  ],
  size: Size.Default,
};

export const Small = Template.bind({});
Small.args = {
  context: [
    Context.Info,
    Context.None,
    Context.Success,
    Context.Warning,
    Context.Danger,
    Context.Info,
    Context.White,
  ],
  size: Size.Small,
};
