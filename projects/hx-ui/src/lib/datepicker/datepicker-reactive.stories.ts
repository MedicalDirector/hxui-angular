import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { action } from '@storybook/addon-actions';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { TabsModule } from '../tabs/tabs.module';
import { TextInputModule } from '../text-input/text-input.module';
import { DatepickerFormComponent } from './datepicker-form.component';
import { DatepickerIntervalComponent } from './datepicker-interval.component';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerConfig } from './datepicker.config';

const mask_options: Partial<IConfig> | (() => Partial<IConfig>) = {};

export default {
  title: 'Component/Date picker/Reactive',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule.forRoot(),
        NgxMaskModule.forRoot(mask_options),
        TextInputModule,
      ],
      declarations: [
        DatepickerComponent,
        DatepickerFormComponent,
        DatepickerIntervalComponent,
      ],
      providers: [
        DatepickerConfig,
        DatepickerComponent,
        DatepickerFormComponent,
        Overlay,
      ],
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

const TemplateReactive: Story = args => {
  const form = new FormGroup({
    input: new FormControl(args.input),
  });

  if (args.required) {
    form.get('input').setValidators(Validators.required);
  }

  const onDateChange = ($event: Event) => {
    action('date changed')($event);
  };

  const onFocus = () => {
    action('focussed');
  };

  return {
    props: {
      ...args,
      form,
      onDateChange,
      onFocus,
    },
    template: `
      <form [formGroup]="form">
        <hxa-datepicker-input
          [interval]="interval"
          formControlName="input"
          [required]="required"
          (onDateChange)="onDateChange($event)"
          (onFocus)="onFocus($event)"
        ></hxa-datepicker-input>
      </form>
    `,
  };
};

export const Form = TemplateReactive.bind({});
Form.args = {
  interval: false,
};
Form.play = async ({ canvasElement }) => {
  // look up date input
  const canvas = within(canvasElement);
  const dateinput = canvas.getByRole('textbox');

  // focus text
  dateinput.focus();
};

export const Interval = TemplateReactive.bind({});
Interval.args = {
  interval: true,
};
Interval.play = async ({ canvasElement }) => {
  // look up date input
  const canvas = within(canvasElement);
  const dateinput = canvas.getByRole('textbox');

  // focus text
  dateinput.focus();
};
