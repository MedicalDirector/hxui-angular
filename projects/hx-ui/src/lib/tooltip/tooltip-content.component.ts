import {
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Context, Visibility } from '../enums';
import { TooltipDynamicContentDirective } from './tooltip-dynamic-content.directive';

@Component({
  selector: 'hx-tooltip-content, hxa-tooltip-content',
  template: `
    <div class="hxui-reset">
      <div
        class="hx-tooltip is-{{ placement }}"
        [class.is-active]="visibility === visibilityEnum.Visible"
        [class.is-success]="context === contextEnum.Success"
        [class.is-warning]="context === contextEnum.Warning"
        [class.is-danger]="context === contextEnum.Danger"
        [class.is-white]="context === contextEnum.White"
        role="tooltip"
      >
        <div
          *ngIf="!dynamicContent"
          class="hx-tooltip-content"
          [innerHtml]="content"
          [style.max-width.px]="maxWidth"
        ></div>
        <div
          *ngIf="dynamicContent"
          class="hx-tooltip-content"
          [style.max-width.px]="maxWidth"
        >
          <ng-container [ngTemplateOutlet]="dynamicContent"></ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [
    '.hxa-tooltip-panel { display:flex; position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; max-width: 100%; max-height: 100%;}',
    '.hx-tooltip.is-left, .hx-tooltip.is-left:before{ margin-right:.5rem; }',
    '.hx-tooltip.is-right, .hx-tooltip.is-right:before{ margin-left:.5rem; }',
    '.hx-tooltip.is-bottom, .hx-tooltip.is-bottom:before{ margin-top:.5rem; }',
    '.hx-tooltip.is-top, .hx-tooltip.is-top:before{ margin-bottom:.5rem; }'
  ]
})
export class TooltipContentComponent {
  @Input()
  content: string;

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @Input()
  context: Context = Context.None;

  @Input()
  maxWidth = 200;

  @Input()
  dynamicContent: TemplateRef<TooltipDynamicContentDirective>;

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

  constructor(private _changeDetectionRef: ChangeDetectorRef) {}

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
      // Schedule for change detection incase the tooltip is used within a
      // component with OnPush change detection
      this._changeDetectionRef.markForCheck();
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
      this._onHide.next(true);
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
