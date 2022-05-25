import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TextInputDirective } from './text-input.directive';

export default {
  title: 'Component/Input/Reactive',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [TextInputDirective],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta;

const defaultArgs = {
  required: true,
  type: 'text',
  id: 0,
  label: 'Label',
  helpText: 'Supporting text',
  disabled: false,
  input: '',
  placeholder: '',
};

const TemplateReactive: Story = args => {
  const a11yId = `input-${args.id}`;

  const form = new FormGroup({
    input: new FormControl(
      args.input,
      ...(args.required ? [Validators.required] : [])
    ),
  });

  return {
    props: { ...args, a11yId, form },
    template: `
      <form [formGroup]="form">
        <div class="hx-input-control">
          <input
            [id]="a11yId"
            formControlName="input"
            hxaTextInput
            class="hx-input"
            type="text"
            [attr.required]="required ? '' : null"
            [attr.disabled]="disabled ? '' : null"
            [attr.placeholder]="placeholder || null"
          >
          <label [for]="a11yId" class="hx-label">
            {{ label }} <sup *ngIf="required">*</sup>
          </label>
          <div class="hx-help" *ngIf="helpText">
            {{ helpText }}
          </div>
        </div>
      </form>
    `,
  };
};

export const EmptyRequired = TemplateReactive.bind({});
EmptyRequired.args = defaultArgs;

export const EmptyOptional = TemplateReactive.bind({});
EmptyOptional.args = {
  ...defaultArgs,
  required: false,
};

export const DirtyOptional = TemplateReactive.bind({});
DirtyOptional.args = {
  ...defaultArgs,
  required: false,
  input: 'Jane Appleby',
};

export const DirtyRequired = TemplateReactive.bind({});
DirtyRequired.args = {
  ...defaultArgs,
  input: 'Jane Appleby',
};

export const PlaceholderRequired = TemplateReactive.bind({});
PlaceholderRequired.args = {
  ...defaultArgs,
  placeholder: 'Placeholder',
};

export const PlaceholderOptional = TemplateReactive.bind({});
PlaceholderOptional.args = {
  ...defaultArgs,
  required: false,
  placeholder: 'Placeholder',
};
