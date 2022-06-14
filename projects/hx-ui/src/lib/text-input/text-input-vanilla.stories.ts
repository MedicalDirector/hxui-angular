import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TextInputDirective } from './text-input.directive';

export default {
  title: 'Component/Input/Vanilla',
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

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const TemplateVanilla: Story = args => {
  const a11yId = `input-${args.id}`;

  return {
    props: { ...args, a11yId },
    template: `
      <form>
        <div class="hx-input-control">
          <input
            [id]="a11yId"
            hxaTextInput
            class="hx-input"
            [(value)]="input"
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

export const EmptyRequired = TemplateVanilla.bind({});
EmptyRequired.args = defaultArgs;

export const EmptyOptional = TemplateVanilla.bind({});
EmptyOptional.args = {
  ...defaultArgs,
  required: false,
};

export const Dirty = TemplateVanilla.bind({});
Dirty.args = {
  ...defaultArgs,
  input: 'Jane Appleby',
};

export const Placeholder = TemplateVanilla.bind({});
Placeholder.args = {
  ...defaultArgs,
  label: 'Label',
  placeholder: 'Placeholder',
};

export const Test: Story = () => {
  return {
    template: `
      <div class="hx-input-control">
        <input hxaTextInput class="hx-input" type="text" placeholder="Sample placeholder">
        <label class="hx-label">Optional field with placeholder</label>
        <div class="hx-help">Help text</div>
      </div>
    `,
  };
};
