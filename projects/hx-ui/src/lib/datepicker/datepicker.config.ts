import {Injectable, Input} from '@angular/core';
import * as moment from 'moment';

/** Default values provider for calendar */
@Injectable()
export class DatepickerConfig {
  /** calendar placement, supported positions: 'top', 'bottom', 'left', 'right' */
  public placement: 'top'|'bottom'|'left'|'right' = 'bottom';
  /** delay in ms before showing the calendar after show is called */
  public showDelay = 0;
  /** delay in ms before hiding the calendar after hide is called */
  public hideDelay = 0;

  public interval_duration: any = 'days';

  public interval_number: any = 0;

  private text: any =  moment().add(this.interval_number , this.interval_duration);

  public selected_interval: string = (this.text).format('ddd DD/MM/YYYY');

}
