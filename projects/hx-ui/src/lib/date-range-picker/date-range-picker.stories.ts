import { Overlay } from '@angular/cdk/overlay';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { DatepickerConfig } from '../datepicker/datepicker.config';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { DropdownConfig } from '../dropdown/dropdown.config';
import { DropdownModule } from '../dropdown/dropdown.module';
import { TabsModule } from '../tabs/tabs.module';
import { DateRangePickerCustomComponent } from './date-range-picker-custom/date-range-picker-custom.component';
import { DateRangePickerIntervalComponent } from './date-range-picker-interval/date-range-picker-interval.component';
import { DateRangePickerComponent } from './date-range-picker.component';
import { DateRangePickerConfig } from './date-range-picker.config';
import { DateRange } from './date-range-picker.model';

const mask_options: Partial<IConfig> | (() => Partial<IConfig>) = {};

export default {
  title: 'Component/Date range picker',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule.forRoot(),
        DatepickerModule.forRoot(),
        DropdownModule.forRoot(),
        NgxMaskModule.forRoot(mask_options),
      ],
      declarations: [
        DateRangePickerComponent,
        DateRangePickerIntervalComponent,
        DateRangePickerCustomComponent,
      ],
      providers: [
        DateRangePickerConfig,
        DatepickerConfig,
        Overlay,
        DatePipe,
        DropdownConfig,
      ],
    }),
    componentWrapperDecorator(
      story => `<div style="padding:1rem; height:100vh;">${story}</div>`
    ),
  ],
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const TemplateVanilla: Story = args => {
  const intervalOptions: string[] = [
    'Today',
    'Yesterday',
    'Tomorrow',
    'Last Year',
    'Next Year',
    'Last Month',
    'Next Month',
    'Last Week',
    'Next Week',
    'Last Fortnight',
    'Next Fortnight',
  ];

  const today = args.fromDate || new Date();
  let tomorrow: Date;
  if (args.toDate) {
    tomorrow = args.toDate;
  } else {
    tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  }

  const dateRange: DateRange = {
    fromDate: today,
    toDate: tomorrow,
  };

  const onDateRangeChange = ($event: Event) => {
    action('date range changed')($event);
  };

  return {
    props: {
      ...args,
      intervalOptions,
      dateRange,
      onDateRangeChange,
    },
    template: `
      <form>
        <hxa-date-range-picker
          [displayMode]="displayMode"
          [required]="required"
          [intervalOptions]="intervalOptions"
          [defaultDateRange]="dateRange"
          (onDateRangeSelected)="onDateRangeChange($event)"
        ></hxa-date-range-picker>
      </form>
    `,
  };
};

export const CalendarOnly = TemplateVanilla.bind({});
CalendarOnly.args = {
  displayMode: 2,
};
CalendarOnly.play = async ({ canvasElement }) => {
  // look up date input
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // click range button
  button.click();
};

export const IntervalOnly = TemplateVanilla.bind({});
IntervalOnly.args = {
  displayMode: 3,
};
IntervalOnly.play = async ({ canvasElement }) => {
  // look up date input
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // click range button
  button.click();
};

export const CalendarAndInterval = TemplateVanilla.bind({});
CalendarAndInterval.args = {
  displayMode: 1,
};
CalendarAndInterval.play = async ({ canvasElement }) => {
  // look up date input
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // click range button
  button.click();
};
