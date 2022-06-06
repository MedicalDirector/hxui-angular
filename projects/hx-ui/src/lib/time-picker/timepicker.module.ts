import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Timepicker } from './timepicker';

export { HxaTimeAdapter } from './hxa-time-adapter';
export { HxaTimeStruct } from './hxa-time-struct';
export { Timepicker } from './timepicker';
export { TimepickerConfig } from './timepicker-config';
export { TimepickerI18n } from './timepicker-i18n';

@NgModule({
  declarations: [Timepicker],
  exports: [Timepicker],
  imports: [CommonModule]
})
export class TimepickerModule {}
