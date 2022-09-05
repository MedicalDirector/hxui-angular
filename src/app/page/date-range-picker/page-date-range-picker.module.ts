import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DatepickerModule,
  DateRangePickerModule,
  DropdownModule,
} from '@hxui/angular';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleCalendarDaterangepickerComponent } from './example/calendar-daterangepicker.component';
import { ExampleChoiceDaterangepickerComponent } from './example/choice-daterangepicker.component';
import { ExampleIntervalDaterangepickerComponent } from './example/interval-daterangepicker.component';
import { PageDateRangePickerComponent } from './page-date-range-picker.component';

@NgModule({
  declarations: [
    PageDateRangePickerComponent,
    ExampleCalendarDaterangepickerComponent,
    ExampleIntervalDaterangepickerComponent,
    ExampleChoiceDaterangepickerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageDateRangePickerComponent,
      },
    ]),
    ReactiveFormsModule,
    SharedModule,
    DateRangePickerModule.forRoot(),
    DatepickerModule.forRoot(),
    DropdownModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [DatePipe],
})
export class PageDateRangePickerModule {}
