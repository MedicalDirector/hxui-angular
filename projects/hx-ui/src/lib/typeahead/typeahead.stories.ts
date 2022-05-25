import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';
import { TypeaheadModule } from './typeahead.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sb-storybook-typeahead',
  template: `
    <div class="hx-input-control" id="parentEL">
      <input
        class="hx-input"
        type="text"
        hxaTextInput
        [(ngModel)]="selected"
        [hxaTypeahead]="states"
        minWidthRelativeTo="parentEL"
      />
      <label class="hx-label">
        <i class="icon icon-search is-small"></i> Medications
      </label>
      <div class="hx-help">Search for medication names</div>
    </div>
  `,
})
class StorybookTypeaheadComponent {
  public selected: string;
  public states: string[] = [
    'SABRIL powder for oral solution 500mg',
    'SABRIL tablet 500mg',
    'SACROSIDASE oral liquid, solution 8,500 Units/mL',
    'SACUBITRIL/VALSARTAN tablet 24.3mg/25.7mg',
    'SACUBITRIL/VALSARTAN tablet 48.6mg/51.4mg',
    'SACUBITRIL/VALSARTAN tablet 97.3mg/102.8mg',
    'SAFLUTAN eye drops 0.0015% (4.5mcg/0.3mL)',
    'SAIZEN 8 CLICK.EASY powder for injection 8mg (24 units)',
    'SAIZEN powder for injection 3mg (10 units)',
    'SAIZEN injection 6mg (18 units)',
    'SAIZEN injection 12mg (36 units)',
    'SAIZEN injection 20mg (60 units)',
    'SALAZOPYRIN-EN enteric-coated tablet 500mg',
    'SALBUTAMOL ACTAVIS inhalation 2.5mg/2.5mL',
    'SALBUTAMOL ACTAVIS inhalation 5mg/2.5mL',
    'SALBUTAMOL SANDOZ inhalation 2.5mg/2.5mL',
    'SALBUTAMOL SANDOZ inhalation 5mg/2.5mL',
    'SALBUTAMOL metered-dose aerosol 100mcg/dose',
    'SALBUTAMOL injection 1mg/mL',
  ];
}

export default {
  title: 'Component/Input/Typeahead',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, TypeaheadModule.forRoot()],
      declarations: [StorybookTypeaheadComponent],
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

const Template: Story = () => {
  return {
    template: `
      <sb-storybook-typeahead></sb-storybook-typeahead>
    `,
  };
};

export const Typeahead = Template.bind({});
Typeahead.play = async ({ canvasElement }) => {
  // get input
  const canvas = within(canvasElement);
  const input = canvas.getByRole('textbox');

  // focus text
  input.focus();
  await userEvent.type(input, 'der f');
};
