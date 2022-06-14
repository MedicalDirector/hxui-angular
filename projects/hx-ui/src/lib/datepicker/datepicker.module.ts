import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { TabsModule } from '../tabs/tabs.module';
import { TextInputModule } from '../text-input/text-input.module';
import { DatepickerFormComponent } from './datepicker-form.component';
import { DatepickerIntervalComponent } from './datepicker-interval.component';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerConfig } from './datepicker.config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    NgxMaskModule,
    TextInputModule
  ],
  declarations: [
    DatepickerComponent,
    DatepickerFormComponent,
    DatepickerIntervalComponent
  ],
  exports: [DatepickerComponent, DatepickerFormComponent]
})
export class DatepickerModule {
  public static forRoot(): ModuleWithProviders<DatepickerModule> {
    return { ngModule: DatepickerModule, providers: [DatepickerConfig] };
  }
}
