import { Injectable } from '@angular/core';

/** Default values provider for tooltip */
@Injectable()
export class TooltipConfig {
  /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
  public placement: 'top'|'bottom'|'left'|'right' = 'bottom';
  /** should tooltip start in a disabled state */
  public disabled = false;
  /** animate tooltip or not */
  public animation = true;
}
