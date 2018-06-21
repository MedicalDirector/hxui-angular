import {
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {Context, Visibility} from '../enums';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'hx-tooltip-content, hxa-tooltip-content',
  template: `    
      <div class="hx-tooltip is-{{ placement }}"
           [class.is-active]='visibility === visibilityEnum.Visible'
           [class.is-success]="context === contextEnum.Success"
           [class.is-warning]="context === contextEnum.Warning"
           [class.is-danger]="context === contextEnum.Danger"
           role="tooltip">
          <div class="hx-tooltip-content">
            {{ content }}
          </div>
      </div>
`,
  styles: [
    '.hxa-tooltip-panel { display:flex; position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; max-width: 100%; max-height: 100%;}',
    '.hx-tooltip.is-left, .hx-tooltip.is-left:before{ margin-right:.5rem; }',
    '.hx-tooltip.is-right, .hx-tooltip.is-right:before{ margin-left:.5rem; }',
    '.hx-tooltip.is-bottom, .hx-tooltip.is-bottom:before{ margin-top:.5rem; }',
    '.hx-tooltip.is-top, .hx-tooltip.is-top:before{ margin-bottom:.5rem; }'
  ],
  encapsulation: ViewEncapsulation.None
})
export class TooltipContentComponent {

  @Input()
  content: string;

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @Input()
  context: Context = Context.None;

  /** Enums to be used in the template **/
  contextEnum = Context;
  visibilityEnum = Visibility;

  visibility: Visibility = Visibility.Hidden;

  /** Subject for notifying that the tooltip has been hidden from the view */
  private readonly _onHide: Subject<any> = new Subject();

  /** The timeout ID of any current timer set to show the tooltip */
  private _showTimeoutId: number;

  /** The timeout ID of any current timer set to hide the tooltip */
  private _hideTimeoutId: number;

  constructor() {}


  /**
   * Shows the tooltip
   * @param delay Amount of milliseconds to the delay showing the tooltip.
   */
  show(delay: number): void {
    // Cancel the delayed hide if it is scheduled
    if (this._hideTimeoutId) {
      clearTimeout(this._hideTimeoutId);
    }

    this._showTimeoutId = window.setTimeout(() => {
      this.visibility = Visibility.Visible;

    }, delay);
  }

  /**
   * Hide the tooltip after the provided delay in ms.
   * @param delay Amount of milliseconds to delay hiding the tooltip.
   */
  hide(delay: number): void {
    // Cancel the delayed show if it is scheduled
    if (this._showTimeoutId) {
      clearTimeout(this._showTimeoutId);
    }

    this._hideTimeoutId = window.setTimeout(() => {
      this.visibility = Visibility.Hidden;
      this._onHide.next();
    }, delay);
  }

  /** Returns an observable that notifies when the tooltip has been hidden from view. */
  afterHidden(): Observable<void> {
    return this._onHide.asObservable();
  }

  isVisible(): boolean {
    return this.visibility === Visibility.Visible;
  }

}
