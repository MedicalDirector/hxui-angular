import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { DialogOverlayRef } from './dialog-overlay.ref';
import { DialogService } from './dialog.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sb-storybook-dialog-content',
  template: `
    <div class="hx-modal is-active">
      <div class="hx-modal-background"></div>
      <div class="hx-modal-card">
        <header class="hx-modal-card-head">
          <h1 class="hx-modal-card-title">HxUI Modal Title</h1>
          <a class="hx-button is-round is-small is-white" (click)="cancel()">
            <span class="hx-icon-control">
              <i class="icon icon-close-empty is-large"></i>
            </span>
          </a>
        </header>
        <section class="hx-modal-card-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus,
            nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat
            odio, sollicitudin vel erat vel, interdum mattis neque.
          </p>
        </section>
        <footer class="hx-modal-card-foot">
          <button class="hx-button is-primary" (click)="confirm()">
            Save changes
          </button>
          <button class="hx-button" (click)="cancel()">Cancel</button>
        </footer>
      </div>
    </div>
  `,
})
class StorybookDialogContentComponent {
  protected onSuccess: (data: string) => void;
  protected onCancelled: (data: string) => void;
  protected visitId: number;

  constructor(public dialogRef: DialogOverlayRef) {}

  cancel() {
    this.onCancelled('Cancelled!');
    this.dialogRef.close();
  }

  confirm() {
    this.onSuccess('Success!');
    this.dialogRef.close();
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sb-storybook-dialog-trigger',
  template: `
    <div class="wrapper">
      <button class="hx-button is-primary" (click)="openDialog()">
        Open dialog
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
class StorybookDialogTriggerComponent {
  @Input() hasBackdrop = true;
  @Input() backdropClickable = true;

  constructor(private dialogService: DialogService) {}

  openDialog(): void {
    this.dialogService.open(
      StorybookDialogContentComponent,
      {
        hasBackdrop: this.hasBackdrop,
        backdropClickable: this.backdropClickable,
      },
      {
        onSuccess: (data: string) => {
          action('on success click')(data);
        },
        onCancelled: (data: string) => {
          action('on cancel click')(data);
        },
      }
    );
  }
}

export default {
  title: 'Component/Dialog',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule],
      declarations: [
        StorybookDialogTriggerComponent,
        StorybookDialogContentComponent,
      ],
      providers: [DialogService, Overlay],
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
  props: {
    ...args,
  },
  template: `
    <sb-storybook-dialog-trigger
      [hasBackdrop]="hasBackdrop"
      [backdropClickable]="backdropClickable"
    ></sb-storybook-dialog-trigger>
  `,
});

// https://github.com/storybookjs/storybook/discussions/15602
export const Simple = Template.bind({});
Simple.args = {
  hasBackdrop: true,
  backdropClickable: true,
};
Simple.play = async ({ canvasElement }) => {
  // look up date input
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // open dialog
  button.click();
};
