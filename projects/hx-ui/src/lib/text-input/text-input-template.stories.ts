import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TextInputDirective } from './text-input.directive';

export default {
  title: 'Component/Input/Template',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule],
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

const TemplateTemplate: Story = args => {
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
            name="input"
            [(ngModel)]="input"
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

export const EmptyRequired = TemplateTemplate.bind({});
EmptyRequired.args = defaultArgs;

export const EmptyOptional = TemplateTemplate.bind({});
EmptyOptional.args = {
  ...defaultArgs,
  required: false,
};

export const DirtyRequired = TemplateTemplate.bind({});
DirtyRequired.args = {
  ...defaultArgs,
  input: 'Jane Appleby',
};

export const DirtyOptional = TemplateTemplate.bind({});
DirtyOptional.args = {
  ...defaultArgs,
  required: false,
  input: 'Jane Appleby',
};

export const PlaceholderRequired = TemplateTemplate.bind({});
PlaceholderRequired.args = {
  ...defaultArgs,
  placeholder: 'Placeholder',
};

export const PlaceholderOptional = TemplateTemplate.bind({});
PlaceholderOptional.args = {
  ...defaultArgs,
  required: false,
  placeholder: 'Placeholder',
};
