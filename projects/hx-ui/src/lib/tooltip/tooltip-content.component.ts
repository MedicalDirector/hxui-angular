import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Context } from '../enums';

@Component({
  selector: 'hx-tooltip-content',
  template: `
        <div class="hx-tooltip is-{{ placement }}"
             [style.top]="top + 'px'"
             [style.left]="left + 'px'"
             [class.is-active]="active"
             [class.is-success]="context === contextEnum.Success"
             [class.is-warning]="context === contextEnum.Warning"
             [class.is-danger]="context === contextEnum.Danger"
             role="tooltip">
            <div class="hx-tooltip-content">
                <ng-content></ng-content>
                {{ content }}
            </div>
        </div>
`
})
export class TooltipContentComponent implements AfterViewInit {
  @Input() hostElement: HTMLElement;

  @Input() content: string;

  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @Input() context: Context = Context.None;

  @Input() animation = true;

  top: number = -100000;
  left: number = -100000;
  active = false;
  contextEnum = Context;

  constructor(private element: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.show();
    this.cdr.detectChanges();
  }

  show(): void {
    if (!this.hostElement) {
      return;
    }

    const p = this.positionElements(
      this.hostElement,
      this.element.nativeElement.children[0],
      this.placement
    );

    this.top = p.top;
    this.left = p.left;
    this.active = true;
  }

  hide(): void {
    this.top = -100000;
    this.left = -100000;
    this.active = true;
  }

  private positionElements(
    hostEl: HTMLElement,
    targetEl: HTMLElement,
    positionStr: string,
    appendToBody: boolean = true
  ): { top: number; left: number } {
    const positionStrParts = positionStr.split('-');
    const pos0 = positionStrParts[0];
    const pos1 = positionStrParts[1] || 'center';
    const hostElPos = appendToBody
      ? this.offset(hostEl)
      : this.position(hostEl);
    const targetElWidth = targetEl.offsetWidth;
    const targetElHeight = targetEl.offsetHeight;
    const shiftWidth: any = {
      center: function(): number {
        return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
      },
      left: function(): number {
        return hostElPos.left;
      },
      right: function(): number {
        return hostElPos.left + hostElPos.width;
      }
    };

    const shiftHeight: any = {
      center: function(): number {
        return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
      },
      top: function(): number {
        return hostElPos.top;
      },
      bottom: function(): number {
        return hostElPos.top + hostElPos.height;
      }
    };

    let targetElPos: { top: number; left: number };
    switch (pos0) {
      case 'right':
        targetElPos = {
          top: shiftHeight[pos1](),
          left: shiftWidth[pos0]()
        };
        break;

      case 'left':
        targetElPos = {
          top: shiftHeight[pos1](),
          left: hostElPos.left - targetElWidth
        };
        break;

      case 'bottom':
        targetElPos = {
          top: shiftHeight[pos0](),
          left: shiftWidth[pos1]()
        };
        break;

      default:
        targetElPos = {
          top: hostElPos.top - targetElHeight,
          left: shiftWidth[pos1]()
        };
        break;
    }

    return targetElPos;
  }

  private position(
    nativeEl: HTMLElement
  ): { width: number; height: number; top: number; left: number } {
    let offsetParentBCR = { top: 0, left: 0 };
    const elBCR = this.offset(nativeEl);
    const offsetParentEl = this.parentOffsetEl(nativeEl);
    if (offsetParentEl !== window.document) {
      offsetParentBCR = this.offset(offsetParentEl);
      offsetParentBCR.top +=
        offsetParentEl.clientTop - offsetParentEl.scrollTop;
      offsetParentBCR.left +=
        offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
    }

    const boundingClientRect = nativeEl.getBoundingClientRect();
    return {
      width: boundingClientRect.width || nativeEl.offsetWidth,
      height: boundingClientRect.height || nativeEl.offsetHeight,
      top: elBCR.top - offsetParentBCR.top,
      left: elBCR.left - offsetParentBCR.left
    };
  }

  private offset(
    nativeEl: any
  ): { width: number; height: number; top: number; left: number } {
    const boundingClientRect = nativeEl.getBoundingClientRect();
    return {
      width: boundingClientRect.width || nativeEl.offsetWidth,
      height: boundingClientRect.height || nativeEl.offsetHeight,
      top:
        boundingClientRect.top +
        (window.pageYOffset || window.document.documentElement.scrollTop),
      left:
        boundingClientRect.left +
        (window.pageXOffset || window.document.documentElement.scrollLeft)
    };
  }

  private getStyle(nativeEl: HTMLElement, cssProp: string): string {
    if ((nativeEl as any).currentStyle) {
      // IE
      return (nativeEl as any).currentStyle[cssProp];
    }

    if (window.getComputedStyle) {
      return (window.getComputedStyle(nativeEl) as any)[cssProp];
    }

    // finally try and get inline style
    return (nativeEl.style as any)[cssProp];
  }

  private isStaticPositioned(nativeEl: HTMLElement): boolean {
    return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
  }

  private parentOffsetEl(nativeEl: HTMLElement): any {
    let offsetParent: any = nativeEl.offsetParent || window.document;
    while (
      offsetParent &&
      offsetParent !== window.document &&
      this.isStaticPositioned(offsetParent)
    ) {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || window.document;
  }
}
