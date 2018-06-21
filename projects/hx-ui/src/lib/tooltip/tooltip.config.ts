import { Injectable } from '@angular/core';
import { Context } from '../enums';

/** Default values provider for tooltip */
@Injectable()
export class TooltipConfig {
  /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
  public placement: 'top'|'bottom'|'left'|'right' = 'bottom';
  /** tooltip context (colour) */
  public context: Context = Context.None;
  /** should tooltip start in a disabled state */
  public disabled = false;
  /** animate tooltip or not */
  public animation = true;
}
