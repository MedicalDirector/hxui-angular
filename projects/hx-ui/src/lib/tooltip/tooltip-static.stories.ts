import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';
import { Context } from '../enums';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipDynamicContentDirective } from './tooltip-dynamic-content.directive';
import { TooltipConfig } from './tooltip.config';
import { TooltipDirective } from './tooltip.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sb-storybook-tooltip',
  template: `
    <div class="wrapper">
      <p
        *ngFor="let type of eContext"
        class="is-text-dotted"
        [hxTooltip]="message"
        [disabled]="disabled"
        [placement]="placement"
        [context]="type"
        data-testid="hoverable"
      >
        {{ sContext[type] }}
      </p>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
        justify-content: space-between;
        padding: 2rem;
      }
    `,
  ],
})
class StorybookTooltipComponent {
  @Input() message = '';
  @Input() disabled = false;
  @Input() placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  eContext = Object.values(Context).filter(
    x => typeof x === 'number'
  ) as Context[];
  sContext = Object.values(Context).filter(
    x => typeof x === 'string'
  ) as Context[];
}

export default {
  title: 'Component/Tooltip/Static',
  decorators: [
    moduleMetadata({
      imports: [A11yModule, CommonModule, OverlayModule, PortalModule],
      declarations: [
        TooltipContentComponent,
        TooltipDirective,
        TooltipDynamicContentDirective,
        StorybookTooltipComponent,
      ],
      providers: [TooltipConfig],
    }),
    componentWrapperDecorator(
      story => `<div style="padding:1rem; height:100vh;">${story}</div>`
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  excludeStories: /.*Data$/,
} as Meta;

const Template: Story = args => ({
  props: { ...args },
  template: `
    <sb-storybook-tooltip
      [message]="message"
      [disabled]="disabled"
      [placement]="placement"
    ></sb-storybook-tooltip>
  `,
});

const playFn = async ({ canvasElement }) => {
  // look up hoverable text that opens toaster
  const canvas = within(canvasElement);
  const hoverable = canvas.getAllByTestId('hoverable');

  // hover over hoverable text
  await Promise.all(hoverable.map(h => userEvent.hover(h)));
};

const shortMessage = 'Hello world';
const longMessage =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const Simple = Template.bind({});
Simple.args = {
  message: shortMessage,
  disabled: false,
  placement: 'bottom',
};
Simple.play = playFn;

export const LongText = Template.bind({});
LongText.args = {
  message: longMessage,
  disabled: false,
  placement: 'bottom',
};
LongText.play = playFn;
