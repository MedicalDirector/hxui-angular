import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata } from '@storybook/angular';
import { Timepicker } from './timepicker';
import { TimepickerBaseTemplate } from './timepicker-base.stories';

export default {
  title: 'Component/Time picker/Large',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      declarations: [Timepicker],
      providers: [],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta;

const TIMEPICKER_SIZE = 'large';

export const NoSeconds = TimepickerBaseTemplate.bind({});
NoSeconds.args = {
  size: TIMEPICKER_SIZE,
  seconds: false,
  spinners: true,
};

export const WithSeconds = TimepickerBaseTemplate.bind({});
WithSeconds.args = {
  size: TIMEPICKER_SIZE,
  seconds: true,
  spinners: true,
};

export const NoSpinners = TimepickerBaseTemplate.bind({});
NoSpinners.args = {
  size: TIMEPICKER_SIZE,
  spinners: false,
};

export const Meridian = TimepickerBaseTemplate.bind({});
Meridian.args = {
  size: TIMEPICKER_SIZE,
  spinners: false,
  meridian: true,
};
