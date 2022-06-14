import { Meta, Story } from '@storybook/angular';

export default {
  title: 'Component/Input/Styles Only',
  excludeStories: /.*Data$/,
} as Meta;

export const EmptyRequired: Story = () => {
  return {
    props: {
      label: 'Label',
    },
    template: `
      <div class="hx-input-control">
        <input id="input-0" class="hx-input" type="text" required>
        <label for="input-0" class="hx-label">{{ label }}</label>
        <div class="hx-help">{{ helpText }}</div>
      </div>
    `,
  };
};

export const EmptyOptional: Story = () => {
  return {
    props: {
      label: 'Label',
    },
    template: `
      <div class="hx-input-control">
        <input id="input-0" class="hx-input" type="text">
        <label for="input-0" class="hx-label">{{ label }}</label>
        <div class="hx-help">{{ helpText }}</div>
      </div>
    `,
  };
};

export const PlaceholderRequired: Story = () => {
  return {
    props: {
      label: 'Label',
      placeholder: 'Placeholder',
    },
    template: `
      <div class="hx-input-control">
        <input 
          id="input-0" 
          class="hx-input" 
          type="text" 
          [placeholder]="placeholder" 
          required
        >
        <label for="input-0" class="hx-label">{{ label }}</label>
        <div class="hx-help">{{ helpText }}</div>
      </div>
    `,
  };
};

export const PlaceholderOptional: Story = () => {
  return {
    props: {
      label: 'Label',
      placeholder: 'Placeholder',
    },
    template: `
      <div class="hx-input-control">
        <input 
          id="input-0" 
          class="hx-input" 
          type="text" 
          [placeholder]="placeholder"
        >
        <label for="input-0" class="hx-label">{{ label }}</label>
        <div class="hx-help">{{ helpText }}</div>
      </div>
    `,
  };
};

export const DirtyRequired: Story = () => {
  return {
    props: {
      label: 'Label',
      placeholder: 'Placeholder',
      value: 'Default value',
    },
    template: `
      <div class="hx-input-control">
        <input 
          id="input-0" 
          class="hx-input" 
          type="text" 
          [placeholder]="placeholder"
          [value]="value"
          required
        >
        <label for="input-0" class="hx-label">{{ label }}</label>
        <div class="hx-help">{{ helpText }}</div>
      </div>
    `,
  };
};

export const DirtyOptional: Story = () => {
  return {
    props: {
      label: 'Label',
      placeholder: 'Placeholder',
      value: 'Default value',
    },
    template: `
      <div class="hx-input-control">
        <input 
          id="input-0" 
          class="hx-input" 
          type="text" 
          [placeholder]="placeholder"
          [value]="value"
        >
        <label for="input-0" class="hx-label">{{ label }}</label>
        <div class="hx-help">{{ helpText }}</div>
      </div>
    `,
  };
};

// Danger without manual is-danger class
// Danger with manual is-danger class

export const DisabledRequired: Story = () => {
  return {
    props: {
      label: 'Label',
      placeholder: 'Placeholder',
      value: 'Default value',
    },
    template: `
      <div class="hx-input-control">
        <input 
          id="input-0" 
          class="hx-input" 
          type="text" 
          [placeholder]="placeholder"
          [value]="value"
          disabled
          required
        >
        <label for="input-0" class="hx-label">{{ label }} <sup>*</sup></label>
        <div class="hx-help">{{ helpText }}</div>
      </div>
    `,
  };
};

export const DisabledOptional: Story = () => {
  return {
    props: {
      label: 'Label',
      placeholder: 'Placeholder',
      value: 'Default value',
    },
    template: `
      <div class="hx-input-control">
        <input 
          id="input-0" 
          class="hx-input" 
          type="text" 
          [placeholder]="placeholder"
          [value]="value"
          disabled
        >
        <label for="input-0" class="hx-label">{{ label }}</label>
        <div class="hx-help">{{ helpText }}</div>
      </div>
    `,
  };
};

export const EndActions: Story = () => {
  return {
    template: `
      <div class="hx-input-group">
        <i class="hx-icon icon-search"></i>
        <div class="hx-input-control">
          <input hxaTextInput class="hx-input" type="text" required>
          <label class="hx-label">Search <sup>*</sup></label>
          <div class="hx-help">Please search by patient name</div>
        </div>
        <div class="hx-input-actions">
          <div class="hx-button-group">
            <button class="hx-button is-flat">
              <span class="hx-icon-control">
                <i class="icon icon-close-empty"></i>
              </span>
            </button>
            <button class="hx-button is-flat">
              <span class="hx-icon-control">
                <i class="icon icon-plus"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    `,
  };
};

export const StartEndIcons: Story = () => {
  return {
    template: `
      <div class="hx-input-group">
        <i class="hx-icon icon-person"></i>
        <div class="hx-input-control">
          <input hxaTextInput class="hx-input" type="text" value="JG001" required>
          <label class="hx-label">Username <sup>*</sup></label>
          <div class="hx-help">Please enter your username</div>
        </div>
        <i class="hx-icon icon-check-empty is-medium is-success"></i>
      </div>
    `,
  };
};
