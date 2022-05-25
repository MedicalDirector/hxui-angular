import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { action } from '@storybook/addon-actions';
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
  selector: 'sb-storybook-tooltip-complex',
  template: `
    <div class="wrapper">
      <p>
        Lorem ipsum
        <i
          class="hx-icon icon-information-outline"
          hxTooltip
          [autoClose]="false"
          [placement]="placement"
          [disabled]="disabled"
          maxWidth="350"
          data-testid="hoverable"
        >
          <div *hxaTooltipDynamicContent>
            <div class="is-text-left pa-3">
              ENABLED FOR
              <ul>
                <li>Card payments</li>
                <li>Fully paid patient claims with EasyClaim</li>
              </ul>
              <button (click)="onClick()">links</button>
            </div>
          </div>
        </i>
      </p>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
        justify-content: space-between;
        padding: 4rem;
      }
    `,
  ],
})
class StorybookTooltipComplexComponent {
  @Input() message = '';
  @Input() disabled = false;
  @Input() placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  eContext = Object.values(Context).filter(
    x => typeof x === 'number'
  ) as Context[];
  sContext = Object.values(Context).filter(
    x => typeof x === 'string'
  ) as Context[];

  onClick() {
    action('button clicked');
  }
}

export default {
  title: 'Component/Tooltip/Dynamic',
  decorators: [
    moduleMetadata({
      imports: [A11yModule, CommonModule, OverlayModule, PortalModule],
      declarations: [
        TooltipContentComponent,
        TooltipDirective,
        TooltipDynamicContentDirective,
        StorybookTooltipComplexComponent,
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

export const Dynamic: Story = args => {
  return {
    props: {
      ...args,
    },
    template: `
      <sb-storybook-tooltip-complex
        [disabled]="disabled"
        [placement]="placement"
      ></sb-storybook-tooltip-complex>
    `,
  };
};
Dynamic.args = {
  disabled: false,
  placement: 'right',
};
Dynamic.play = async ({ canvasElement }) => {
  // look up hoverable text that opens toaster
  const canvas = within(canvasElement);
  const hoverable = canvas.getByTestId('hoverable');

  // hover over hoverable text
  await userEvent.hover(hoverable);
};
