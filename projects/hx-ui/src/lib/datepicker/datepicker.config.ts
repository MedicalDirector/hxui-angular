import {Injectable, Input} from '@angular/core';
import * as moment_ from 'moment';
import { DatepickerIntervalComponent } from './datepicker-interval.component';
const moment = moment_;

/** Default values provider for calendar */
@Injectable()
export class DatepickerConfig {
  /** calendar placement, supported positions: 'top', 'bottom', 'left', 'right' */
  public placement: 'top'|'bottom'|'left'|'right' = 'bottom';
  // public _intyerval: DatepickerIntervalComponent;
  /** delay in ms before showing the calendar after show is called */
  public showDelay = 0;
  /** delay in ms before hiding the calendar after hide is called */
  public hideDelay = 0;
  //private _dp: DatepickerIntervalComponent | null | undefined;
  public interval_duration: any = 'years';

  public interval_number: any = 3;

  // constructor(private _datepickerIntervalComponent: DatepickerIntervalComponent) { }
 // private text: any =  moment().add(this.interval_number , this.interval_duration);

 // public selected_interval: string = (this.text).format('ddd DD/MM/YYYY');
//   public selected_interval: string = this._dp.onSelectoptions(this.interval_number, this.interval_duration);

  public tabSelected: String ;

  // public _dueDatestring: string = (this.text).format('DD/MM/YYYY');

}
