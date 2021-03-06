import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

/**
 * TODO: !BREAKING! align accordion markup for accessibility,
 * consider using attribute selector
 * @see {@link https://www.w3.org/TR/wai-aria-practices/#accordion}
 * @see {@link https://medium.com/javascript-everyday/when-to-use-an-attribute-selector-for-angular-components-7e788ba1bfe7}
 */
@Component({
  selector: 'hx-accordion-container, hxa-accordion-container',
  template: `
    <li
      class="hx-accordion-container"
      [class.is-active]="expanded && !disabled"
    >
      <a
        class="hx-accordion-header"
        [class.is-disabled]="!empty && disabled"
        (click)="toggle()"
      >
        <div class="header-title">
          <ng-content
            select="hx-accordion-header, hxa-accordion-header"
          ></ng-content>
        </div>
        <div class="header-icon" *ngIf="empty">
          <i class="hx-icon icon-angle-down" *ngIf="!expanded || disabled"></i>
          <i class="hx-icon icon-angle-up" *ngIf="expanded && !disabled"></i>
        </div>
      </a>
      <div
        class="hx-accordion-body"
        [@slideIn]="expanded && !disabled"
        *ngIf="expanded && !disabled"
      >
        <div class="hx-accordion-body-wrapper">
          <ng-content
            select="hx-accordion-body, hxa-accordion-body"
          ></ng-content>
        </div>
      </div>
    </li>
  `,
  styleUrls: ['./accordian.container.scss'],
  animations: [
    trigger('slideIn', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate('0.25s ease-out', style({ height: 0, opacity: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate('0.25s ease-out', style({ height: '*', opacity: 1 }))
      ])
    ])
  ]
})
export class AccordionContainerComponent {
  @Input() expanded = true;
  @Input() index: number = null;
  @Input() disabled = false;
  @Input() empty = true;
  @Output() headerClick: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _changeDetectionRef: ChangeDetectorRef) {}

  public toggle(): void {
    if (this.index !== null) {
      this.headerClick.emit(this.index);
    }
    this.expanded = !this.expanded;
    this._changeDetectionRef.markForCheck();
  }
}
