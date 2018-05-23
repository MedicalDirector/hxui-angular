import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerFormComponent } from './datepicker-form.component'


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DatepickerComponent, DatepickerFormComponent],
  exports: [DatepickerComponent, DatepickerFormComponent]
})
export class DatepickerModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: DatepickerModule, providers: [] };
  }
}
