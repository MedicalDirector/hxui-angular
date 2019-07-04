import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerFormComponent } from './datepicker-form.component';
import { DatepickerConfig } from './datepicker.config';
import { DatepickerIntervalComponent } from './datepicker-interval.component';
import {TabsModule} from '../tabs/tabs.module';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [CommonModule, FormsModule, TabsModule,  NgxMaskModule],
  declarations: [DatepickerComponent, DatepickerFormComponent, DatepickerIntervalComponent],
  exports: [DatepickerComponent, DatepickerFormComponent],
  entryComponents: [DatepickerComponent]
})
export class DatepickerModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: DatepickerModule, providers: [DatepickerConfig] };
  }
}
