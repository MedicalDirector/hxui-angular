import {
  CommonModule
} from '@angular/common';
import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  DateRangePickerComponent
} from './date-range-picker.component';
import {
  DateRangePickerConfig
} from './date-range-picker.config';
import {
  TabsModule
} from '../tabs/tabs.module';
import {
  FormsModule
} from '@angular/forms';
import {
  DatepickerModule
} from '../datepicker/datepicker.module';
import {
  DropdownModule
} from '../dropdown/dropdown.module';
import {
  DateRangePickerIntervalComponent
} from './date-range-picker-interval/date-range-picker-interval.component';
import {
  DateRangePickerCustomComponent
} from './date-range-picker-custom/date-range-picker-custom.component';

@NgModule({
  imports: [CommonModule, FormsModule, TabsModule, DatepickerModule, DropdownModule],
  declarations: [DateRangePickerComponent, DateRangePickerIntervalComponent, DateRangePickerCustomComponent],
  exports: [DateRangePickerComponent],
  entryComponents: [DateRangePickerComponent]
})

export class DateRangePickerModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DateRangePickerModule,
      providers: [DateRangePickerConfig]
    };
  }
}
