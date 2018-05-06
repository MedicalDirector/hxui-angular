import { Injectable, ElementRef } from '@angular/core';
import { positionElements } from './ng-positioning';
import {PositioningOptions} from './positioning.options';



@Injectable()
export class PositioningService {
  public position(options: PositioningOptions): void {
    const {element, target, attachment, appendToBody} = options;
    positionElements(
      this._getHtmlElement(target),
      this._getHtmlElement(element),
      <any>attachment,
      appendToBody);
  }

  public isElementBelowTheFold(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return ((rect.top + rect.height) > document.body.clientHeight) ;
  }

  private _getHtmlElement(element: any): HTMLElement {
    // it means that we got a selector
    if (typeof element === 'string') {
      return document.querySelector(element) as HTMLElement;
    }

    if (element instanceof ElementRef) {
      return element.nativeElement;
    }

    return element as HTMLElement;
  }
}
