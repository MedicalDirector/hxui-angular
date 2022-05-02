import {
  Component, ElementRef, TemplateRef, ViewEncapsulation, HostListener, ChangeDetectorRef
} from '@angular/core';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadMatch } from './typeahead-match.class';
import { latinize } from './typeahead-utils';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'hx-typeahead-container',
  // tslint:disable-next-line
  template: `
<!-- inject options list template -->
<ng-template [ngTemplateOutlet]="optionsListTemplate || optionListTemplate"
  [ngTemplateOutletContext]="{matches:matches, itemTemplate:itemTemplate, query:query}"></ng-template>

<!-- default options item template -->
<ng-template #hxItemTemplate let-match="match" let-query="query"><span [innerHtml]="hightlight(match, query)"></span></ng-template>

<!-- options list template -->
<ng-template #optionListTemplate >
<ng-template ngFor let-match let-i="index" [ngForOf]="matches">
   <h6 *ngIf="match.isHeader()" class="hx-dropdown-header">{{match}}</h6>
   
   <ng-template [ngIf]="!match.isHeader()">
      <a href="#"
        class="hx-dropdown-item"
        (click)="selectMatch(match, $event)"
        (mouseenter)="selectActive(match)"
        [class.active]="isActive(match)">
          <ng-template [ngTemplateOutlet]="itemTemplate || hxItemTemplate" 
            [ngTemplateOutletContext]="{item:match.item, index:i, match:match, query:query}"></ng-template>
      </a>
  </ng-template>
</ng-template>
</ng-template>
`,
  // tslint:disable
  host: {
    "class": "hx-dropdown-menu"
  },
  // tslint: enable
  encapsulation: ViewEncapsulation.None,
  styles:[
    'strong.is-matched { background-color: rgba(35, 49, 43, .23) }',
    '.hx-dropdown-item { font-weight: 300 }'
  ]
})
export class TypeaheadContainerComponent {
  public parent: TypeaheadDirective;
  public query: any;
  public isFocused: boolean = false;
  public top: string;
  public left: string;
  public display: string;
  public placement: string;


  protected _active: TypeaheadMatch;
  protected _matches: TypeaheadMatch[] = [];

  /** Subject for notifying that the tooltip has been hidden from the view */
  private readonly _onHide: Subject<any> = new Subject();

  /** The timeout ID of any current timer set to show the tooltip */
  private _showTimeoutId: number;

  /** The timeout ID of any current timer set to hide the tooltip */
  private _hideTimeoutId: number;

  public constructor(
    private element: ElementRef,
    private _changeDetectionRef: ChangeDetectorRef) {
  }

  public get active(): TypeaheadMatch {
    return this._active;
  }

  public get matches(): TypeaheadMatch[] {
    return this._matches;
  }

  public set matches(value: TypeaheadMatch[]) {
    this._matches = value;

    if (this._matches.length > 0) {
      this._active = this._matches[0];
      if (this._active.isHeader()) {
        this.nextActiveMatch();
      }
    }
  }

  public get optionsListTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.optionsListTemplate : undefined;
  }

  public get itemTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.typeaheadItemTemplate : undefined;
  }

  public selectActiveMatch(): void {
    this.selectMatch(this._active);
  }

  public prevActiveMatch(): void {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index - 1 < 0
      ? this.matches.length - 1
      : index - 1];
    if (this._active.isHeader()) {
      this.prevActiveMatch();
    }

  }

  public nextActiveMatch(): void {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index + 1 > this.matches.length - 1
      ? 0
      : index + 1];
    if (this._active.isHeader()) {
      this.nextActiveMatch();
    }
  }

  public selectActive(value: TypeaheadMatch): void {
    this.isFocused = true;
    this._active = value;
  }

  public hightlight(match: TypeaheadMatch, query: any): string {
    let itemStr: string = match.value;
    let itemStrHelper: string = (this.parent && this.parent.typeaheadLatinize
      ? latinize(itemStr)
      : itemStr).toLowerCase();
    let startIdx: number;
    let tokenLen: number;
    // Replaces the capture string with the same string inside of a "strong" tag
    if (typeof query === 'object') {
      let queryLen: number = query.length;
      for (let i = 0; i < queryLen; i += 1) {
        // query[i] is already latinized and lower case
        startIdx = itemStrHelper.indexOf(query[i]);
        tokenLen = query[i].length;
        if (startIdx >= 0 && tokenLen > 0) {
          itemStr = itemStr.substring(0, startIdx) + '<strong class="is-matched">' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
          itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
        }
      }
    } else if (query) {
      // query is already latinized and lower case
      startIdx = itemStrHelper.indexOf(query);
      tokenLen = query.length;
      if (startIdx >= 0 && tokenLen > 0) {
        itemStr = itemStr.substring(0, startIdx) + '<strong  class="is-matched">' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
      }
    }
    return itemStr;
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  public focusLost(): void {
    this.isFocused = false;
  }

  public isActive(value: TypeaheadMatch): boolean {
    return this._active === value;
  }

  public selectMatch(value: TypeaheadMatch, e: Event = void 0): boolean {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.parent.changeModel(value);
    setTimeout(() =>
      this.parent.typeaheadOnSelect.emit(value), 0
    );
    return false;
  }

  show(delay: number): void {
    // Cancel the delayed hide if it is scheduled
    if (this._hideTimeoutId) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = window.setTimeout(() => {
      // Schedule for change detection incase the tooltip is used within a
      // component with OnPush change detection
      this._changeDetectionRef.markForCheck();
      //this.visibility = Visibility.Visible;
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
     // this.visibility = Visibility.Hidden;
      this._onHide.next();
    }, delay);
  }

  /** Returns an observable that notifies when the dropdown has been hidden from view. */
  afterHidden(): Observable<void> {
    return this._onHide.asObservable();
  }
}
