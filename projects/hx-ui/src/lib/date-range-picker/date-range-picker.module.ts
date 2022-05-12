import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { TabsModule } from '../tabs/tabs.module';
import { DateRangePickerCustomComponent } from './date-range-picker-custom/date-range-picker-custom.component';
import { DateRangePickerIntervalComponent } from './date-range-picker-interval/date-range-picker-interval.component';
import { DateRangePickerComponent } from './date-range-picker.component';
import { DateRangePickerConfig } from './date-range-picker.config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    DatepickerModule,
    DropdownModule
  ],
  declarations: [
    DateRangePickerComponent,
    DateRangePickerIntervalComponent,
    DateRangePickerCustomComponent
  ],
  exports: [DateRangePickerComponent]
})
export class DateRangePickerModule {
  public static forRoot(): ModuleWithProviders<DateRangePickerModule> {
    return {
      ngModule: DateRangePickerModule,
      providers: [DateRangePickerConfig]
    };
  }
}
