import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';
import { AutoGrowModule } from './auto-grow.module';

export default {
  title: 'Component/Textarea/Auto Grow (Directive)',
  decorators: [
    moduleMetadata({
      imports: [AutoGrowModule, CommonModule, ReactiveFormsModule],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta;

// https://github.com/storybookjs/storybook/discussions/15602
const Template: Story = args => {
  const form = new FormGroup({
    input: new FormControl(args.input, Validators.required),
  });

  return {
    props: {
      ...args,
      form,
    },
    template: `
      <form [formGroup]="form" style="margin-top:1rem;">
        <div class="hx-input-control">
          <textarea
            id="exampletextarea" 
            formControlName="input"
            class="hx-textarea" 
            placeholder="Placeholder text"
            autogrow
          ></textarea>
          <label 
            for="exampletextarea" 
            class="hx-label"
          >
            Textarea with Placeholder
          </label>
          <div class="hx-help">
            Textarea hint (if required)
          </div>
        </div>
      </form>
    `,
  };
};

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export const Empty = Template.bind({});
Empty.args = {
  input: '',
};

// https://timdeschryver.dev/blog/good-testing-practices-with-angular-testing-library#filling-in-input-fields
// https://github.com/storybookjs/storybook/blob/next/examples/angular-cli/src/stories/addons/interactions/addon-interactions.stories.ts#L62
export const Dirty = Template.bind({});
Dirty.args = {
  input: '',
};
Dirty.play = async ({ canvasElement }) => {
  // Starts querying the component from its root
  const canvas = within(canvasElement);

  // Looks up the button and interacts with it.
  const textarea = canvas.getByRole('textbox');

  // focus text
  textarea.focus();

  // enter long text
  await userEvent.type(textarea, longText);
};
