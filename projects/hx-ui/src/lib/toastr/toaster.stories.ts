import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { HxaToastrComponent } from './hxa-toastr.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sb-storybook-toaster-trigger',
  template: `
    <div class="wrapper">
      <button
        class="hx-button"
        [ngClass]="{
          'is-success': type === 'success' || false,
          'is-danger': type === 'error' || false,
          'is-info': type === 'info' || false,
          'is-warning': type === 'warning' || false
        }"
        (click)="openToaster(type)"
      >
        Open {{ type }} toaster
      </button>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
      }
    `,
  ],
})
class StorybookToasterTriggerComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'success';
  @Input() title: string = undefined;
  @Input() config: Partial<IndividualConfig> = undefined;

  constructor(private toasterService: ToastrService) {}

  openToaster(type: string): void {
    switch (type) {
      case 'info':
        this.toasterService.info(this.message, this.title, this.config);
        break;
      case 'error':
        this.toasterService.error(this.message, this.title, this.config);
        break;
      case 'warning':
        this.toasterService.warning(this.message, this.title, this.config);
        break;
      case 'success':
      default:
        this.toasterService.success(this.message, this.title, this.config);
    }
  }
}

export default {
  title: 'Component/Toaster',
  decorators: [
    moduleMetadata({
      imports: [
        ToastrModule.forRoot({
          toastComponent: HxaToastrComponent,
          toastClass: 'hxa-toastr',
          iconClasses: {
            error: 'is-danger',
            info: 'is-info',
            success: 'is-success',
            warning: 'is-warning',
          },
        }),
        CommonModule,
        BrowserAnimationsModule,
      ],
      declarations: [HxaToastrComponent, StorybookToasterTriggerComponent],
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
    <sb-storybook-toaster-trigger
      [message]="message"
      [title]="title"
      [type]="type"
      [config]="config"
    ></sb-storybook-toaster-trigger>
  `,
});

const playFn = async ({ canvasElement }) => {
  // look up button that opens toaster
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // open dialog
  button.click();
};

const shortMessage = 'Hello world';
const shortTitle = 'Lorem ipsum';
const longTitle =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const longMessage =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export const SuccessNoTitle = Template.bind({});
SuccessNoTitle.args = {
  message: shortMessage,
  type: 'success',
};
SuccessNoTitle.play = playFn;

export const InfoNoTitle = Template.bind({});
InfoNoTitle.args = {
  message: shortMessage,
  type: 'info',
};
InfoNoTitle.play = playFn;

export const ErrorNoTitle = Template.bind({});
ErrorNoTitle.args = {
  message: shortMessage,
  type: 'error',
};
ErrorNoTitle.play = playFn;

export const WarningNoTitle = Template.bind({});
WarningNoTitle.args = {
  message: shortMessage,
  type: 'warning',
};
WarningNoTitle.play = playFn;

export const SuccessTitle = Template.bind({});
SuccessTitle.args = {
  message: shortMessage,
  title: shortTitle,
  type: 'success',
};
SuccessTitle.play = playFn;

export const SuccessLong = Template.bind({});
SuccessLong.args = {
  message: longMessage,
  title: longTitle,
  type: 'success',
};
SuccessLong.play = playFn;
