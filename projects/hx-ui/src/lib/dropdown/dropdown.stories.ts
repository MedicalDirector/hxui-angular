import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';
import { DropdownModule } from './dropdown.module';

export default {
  title: 'Component/Dropdown',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DropdownModule.forRoot()],
      providers: [Overlay],
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

const actionsData = {
  isOpenChange: $event => action('isOpenChange')($event),
  onShown: $event => action('onShown')($event),
  onHidden: $event => action('onHidden')($event),
};

const playFn = async ({ canvasElement }) => {
  // Select dropdown button
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // open dropdown
  await userEvent.click(button);
};

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const Template: Story = args => {
  const text = args.hasLongText ? longText : undefined;
  const extra = !args.extra ? [] : [...Array(args.extra).keys()];
  return {
    props: {
      ...args,
      ...actionsData,
      extra,
      text,
    },
    template: `
      <div 
        class="hx-dropdown" 
        hxDropdown 
        [autoClose]="true"
        (isOpenChange)="isOpenChange($event)"
        (onShown)="onShown($event)"
        (onHidden)="onHidden($event)"
      >
        <button class="hx-button" hxDropdownToggle>
          <span>Dropdown</span>
          <span class="hx-icon-control">
            <i class="icon icon-caret-down"></i>
          </span>
        </button>
        <div 
          *hxDropdownMenu
          class="hx-dropdown-menu" 
          [class.has-limited-width]="text"
          [class.has-limited-height]="!!extra.length"
        >
          <div class="hx-dropdown-header">
            Heading
          </div>
          <a 
            hxDropdownItem
            class="hx-dropdown-item is-text-ellipsed"
          >
            Action A
          </a>
          <a 
            hxDropdownItem
            class="hx-dropdown-item is-text-ellipsed"
          >
            Action B
          </a>
          <div class="hx-dropdown-divider"></div>
          <a 
            hxDropdownItem
            class="hx-dropdown-item is-text-ellipsed"
          >
            Action C
          </a>
          <a 
            hxDropdownItem
            class="hx-dropdown-item is-text-ellipsed"
          >
            {{ text || 'Action D' }}
          </a>
          <div 
            *ngIf="!!extra.length"
            class="hx-dropdown-divider"
          ></div>
          <a 
            class="hx-dropdown-item is-text-ellipsed"
            hxDropdownItem
            *ngFor="let item of extra;"
          >
            Action {{ item }}
          </a>
        </div>
      </div>
    `,
  };
};

export const Basic = Template.bind({});
Basic.args = {
  extra: 0,
};
Basic.play = playFn;

export const LongList = Template.bind({});
LongList.args = {
  extra: 50,
};
LongList.play = playFn;

export const LongItem = Template.bind({});
LongItem.args = {
  hasLongText: true,
};
LongItem.play = playFn;

export const RelativeWidth: Story = () => {
  return {
    template: `
      <div class="hx-card" style="width:500px;">
        <div class="hx-card-content">
          <div id="parentEl">
            <div class="hx-dropdown" hxDropdown maxWidthRelativeTo="parentEl">
              <button class="hx-button hx-button-dropdown" hxDropdownToggle type="button">
                <span>Dropdown</span>
                <span class="hx-icon-control"><i class="icon icon-caret-down"></i></span>
              </button>
              <div class="hx-dropdown-menu is-text-ellipsed" *hxDropdownMenu>
                <a class="hx-dropdown-item" hxDropdownItem>
                  Action 1
                </a>
                <a class="hx-dropdown-item" hxDropdownItem>
                  Action 2
                </a>
                <a class="hx-dropdown-item" hxDropdownItem>
                  Action 3
                </a>
                <a class="hx-dropdown-item" hxDropdownItem>
                  ${longText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  };
};
RelativeWidth.play = playFn;
