import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { DatepickerComponent } from './datepicker.component';
import { DatepickerFormComponent } from './datepicker-form.component'


@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule, PortalModule],
  declarations: [DatepickerComponent, DatepickerFormComponent],
  exports: [DatepickerComponent, DatepickerFormComponent],
  entryComponents: [DatepickerComponent]
})
export class DatepickerModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: DatepickerModule, providers: [] };
  }
}
