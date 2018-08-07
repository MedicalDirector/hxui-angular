import {Injectable, Input} from '@angular/core';

/** Default values provider for calendar */
@Injectable()
export class DatepickerConfig {
  /** calendar placement, supported positions: 'top', 'bottom', 'left', 'right' */
  public placement: 'top'|'bottom'|'left'|'right' = 'bottom';
  /** delay in ms before showing the calendar after show is called */
  public showDelay = 0;
  /** delay in ms before hiding the calendar after hide is called */
  public hideDelay = 0;
}
