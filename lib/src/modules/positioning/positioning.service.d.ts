import { PositioningOptions } from './positioning.options';
export declare class PositioningService {
    position(options: PositioningOptions): void;
    isElementBelowTheFold(element: HTMLElement): boolean;
    private _getHtmlElement(element);
}
