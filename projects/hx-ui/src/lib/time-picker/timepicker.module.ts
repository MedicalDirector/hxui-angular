import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Timepicker} from './timepicker';

export {Timepicker} from './timepicker';
export {TimepickerConfig} from './timepicker-config';
export {HxaTimeStruct} from './hxa-time-struct';
export {HxaTimeAdapter} from './hxa-time-adapter';
export {TimepickerI18n} from './timepicker-i18n';

@NgModule({
  declarations: [Timepicker],
  exports: [Timepicker],
  imports: [CommonModule]
})
export class TimepickerModule {
}
