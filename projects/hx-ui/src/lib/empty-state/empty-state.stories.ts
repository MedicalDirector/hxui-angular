import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { EmptyStateComponent } from './empty-state.component';
import { EmptyStateConfig } from './empty-state.config';

export default {
  title: 'Component/Empty state',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule],
      declarations: [EmptyStateComponent],
      providers: [EmptyStateConfig],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta;

const Template: Story = args => {
  const actionsData = {
    onSecondaryClick: action('secondary button clicked'),
    onPrimaryClick: action('primary button clicked'),
  };

  return {
    props: {
      ...args,
      ...actionsData,
    },
    template: `
      <hxa-empty-state [icon]="icon" [msg]="msg">
        <button
          class="hx-button is-small"
          (click)="onSecondaryClick()"
        >
          Not taking any medications
        </button>
        <button
          class="hx-button is-small is-primary"
          (click)="onPrimaryClick()"
        >
          Add current medication
        </button>
      </hxa-empty-state>
    `,
  };
};

export const Default = Template.bind({});
Default.args = {
  icon: 'icon-medications',
  msg: 'No current medications have been recorded',
};

export const NoInputs = Template.bind({});
NoInputs.args = {
  icon: '',
  msg: '',
};

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const LongText = Template.bind({});
LongText.args = {
  icon: 'icon-medications',
  msg: longText,
};
