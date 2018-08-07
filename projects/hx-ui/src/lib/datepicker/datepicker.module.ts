import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerFormComponent } from './datepicker-form.component';
import { DatepickerConfig } from './datepicker.config';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DatepickerComponent, DatepickerFormComponent],
  exports: [DatepickerComponent, DatepickerFormComponent],
  entryComponents: [DatepickerComponent]
})
export class DatepickerModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: DatepickerModule, providers: [DatepickerConfig] };
  }
}
