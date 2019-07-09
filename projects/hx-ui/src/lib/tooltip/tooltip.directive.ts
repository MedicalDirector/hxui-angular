import {
  Directive,
  HostListener,
  ViewContainerRef,
  Input,
  HostBinding, ElementRef,
  OnDestroy, NgZone, ComponentFactoryResolver, Optional, ContentChild
} from '@angular/core';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipConfig } from './tooltip.config';
import { Context } from '../enums';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  OriginConnectionPosition,
  Overlay,
  OverlayConnectionPosition,
  OverlayRef,
  ScrollDispatcher,
  ScrollStrategy,
  VerticalConnectionPos} from '@angular/cdk/overlay';
import {Directionality} from '@angular/cdk/bidi';
import {takeUntil, take} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TooltipDynamicContentDirective} from './tooltip-dynamic-content.directive';


@Directive({
  selector: '[hxTooltip], [hxaTooltip]'
})
export class TooltipDirective implements OnDestroy {
  @ContentChild(TooltipDynamicContentDirective) dynamicContent: TooltipDynamicContentDirective;

  _overlayRef: OverlayRef | null;
  _tooltipInstance: TooltipContentComponent | null;

  private _portal: ComponentPortal<TooltipContentComponent>;
  private readonly _destroyed = new Subject();

  @HostBinding('style.position')
  position = 'relative';

  @Input('hxTooltip')
  content: string;

  @Input()
  disabled: boolean;

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @Input()
  showDelay = this._config.showDelay;

  @Input()
  hideDelay = this._config.hideDelay;

  @Input()
  context: Context = Context.None;

  @Input()
  maxWidth = 200;

  @Input()
  autoClose = true;

  @HostListener('focusin')
  @HostListener('mouseenter')
  show() {
    this._show();
  }

  @HostListener('focusout')
  @HostListener('mouseleave')
  close() {
    if (this.autoClose) {
      this._hide();
    }
  }

  constructor(
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    public overlay: Overlay,
    private _ngZone: NgZone,
    private _scrollDispatcher: ScrollDispatcher,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _config: TooltipConfig,
    @Optional() private _dir: Directionality,
  ) {
    Object.assign(this, _config);
  }

  /**
   * Dispose the tooltip when destroyed.
   */
  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._tooltipInstance = null;
    }

    this._destroyed.next();
    this._destroyed.complete();
  }

  hide() {
    this._hide();
  }

  private _show(delay: number = this.showDelay) {

    if (this.disabled || (!this.content && !this.dynamicContent)) { return; }

    const overlayRef = this._createOverlay();

    this._detach();
    this._portal = this._portal || new ComponentPortal(TooltipContentComponent, this._viewContainerRef);
    this._tooltipInstance = overlayRef.attach(this._portal).instance;
    this._tooltipInstance.afterHidden()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    this._updateTooltipContent();
    this._tooltipInstance!.show(delay);
  }

  private _hide(delay: number = this.hideDelay) {
    if (this._tooltipInstance) {
      this._tooltipInstance.hide(delay);
    }
  }

  private _createOverlay(): OverlayRef {
    if (this._overlayRef) {
      return this._overlayRef;
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this._elementRef)
      .withTransformOriginOn('.hx-tooltip')
      .withFlexibleDimensions(false);

    this._overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      panelClass: 'hxa-tooltip-panel',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: !!(this.dynamicContent),
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

     this._updatePosition();

    this._overlayRef.detachments()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    this._overlayRef.backdropClick().subscribe(() => this._hide());

    const position = this._overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe((pos) => {
        if (pos.connectionPair.originX === 'start') {
          this.placement = 'left';
        } else if (pos.connectionPair.originX === 'end') {
          this.placement = 'right';
        }
        this._updateTooltipContent();
      });

    return this._overlayRef;
  }


  private _updatePosition() {
    const position =
      this._overlayRef!.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();

    position.withPositions([
      {...origin.main, ...overlay.main},
      {...origin.fallback, ...overlay.fallback}
    ]);
  }

  /**
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. `'bottom' -> 'top'`).
   */
  private _getOrigin(): {main: OriginConnectionPosition, fallback: OriginConnectionPosition} {
    const placement = this.placement;
    let originPlacement: OriginConnectionPosition;

    if (placement === 'top' || placement === 'bottom') {
      originPlacement = {originX: 'center', originY: placement === 'top' ? 'top' : 'bottom'};
    } else if (placement === 'left') {
      originPlacement = {originX: 'start', originY: 'center'};
    } else if (placement === 'right') {
      originPlacement = {originX: 'end', originY: 'center'};
    } else {
      console.error('Position error', placement);
    }

    const {x, y} = this._invertPosition(originPlacement.originX, originPlacement.originY);

    return {
      main: originPlacement,
      fallback: {originX: x, originY: y}
    };
  }

  /** Returns the overlay position and a fallback position based on the user's preference */
  private _getOverlayPosition(): {main: OverlayConnectionPosition, fallback: OverlayConnectionPosition} {
    const placement = this.placement;
    let overlayPlacement: OverlayConnectionPosition;

    if (placement === 'top') {
      overlayPlacement = {overlayX: 'center', overlayY: 'bottom'};
    } else if (placement === 'bottom') {
      overlayPlacement = {overlayX: 'center', overlayY: 'top'};
    } else if (placement === 'left') {
      overlayPlacement = {overlayX: 'end', overlayY: 'center'};
    } else if (placement === 'right') {
      overlayPlacement = {overlayX: 'start', overlayY: 'center'};
    } else {
      console.error('Could not find a position', placement);
    }

    const {x, y} = this._invertPosition(overlayPlacement.overlayX, overlayPlacement.overlayY);

    return {
      main: overlayPlacement,
      fallback: {overlayX: x, overlayY: y}
    };
  }


  private _invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos) {
    if (this.position === 'top' || this.position === 'bottom') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }

    return {x, y};
  }

  private _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._tooltipInstance = null;
  }

  /** Updates the tooltip content and repositions the overlay according to the new content length */
  private _updateTooltipContent() {
    // Must wait for the content to be painted to the tooltip so that the overlay can properly
    // calculate the correct positioning based on the size of its contents.
    if (this._tooltipInstance) {
        this._tooltipInstance.content = this.content;
        this._tooltipInstance.placement = this.placement;
        this._tooltipInstance.context = this.context;
        this._tooltipInstance.maxWidth = this.maxWidth;
        if (this.dynamicContent) {
          this._tooltipInstance.dynamicContent = this.dynamicContent.templateRef;
        }


      this._ngZone.onMicrotaskEmpty.asObservable().pipe(
        take(1),
        takeUntil(this._destroyed)
      ).subscribe(() => {
        if (this._tooltipInstance) {
          this._overlayRef!.updatePosition();
        }
      });
    }
  }
}
