import {
  ComponentFactoryResolver, ContentChild,
  Directive, ElementRef, EmbeddedViewRef, EventEmitter, HostBinding, Input, NgZone, OnDestroy, OnInit, Optional, Output,
  Renderer2, ViewChild, ViewChildren, ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';
import { DropdownConfig } from './dropdown.config';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import {Subject} from 'rxjs/index';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos, OriginConnectionPosition, Overlay, OverlayConnectionPosition, OverlayRef,
  ScrollDispatcher, VerticalConnectionPos
} from '@angular/cdk/overlay';
import {Directionality} from '@angular/cdk/bidi';
import {DropdownToggleDirective} from './dropdown-toggle.directive';

@Directive({
  selector: '[hxaDropdown],[hxDropdown]',
  exportAs: 'hx-dropdown, hxa-dropdown',
  host: {
    '[class.is-dropup]': 'dropup',
    '[class.is-open]': 'isOpen',
    '[class.is-right]': 'isRight'
  }
})
export class DropdownDirective implements OnInit, OnDestroy {

  @ContentChild(DropdownToggleDirective) trigger: DropdownToggleDirective;
  @ContentChild(DropdownMenuDirective) menu: DropdownMenuDirective;

  _overlayRef: OverlayRef | null;
  private _portal: TemplatePortal;
  private readonly _destroyed = new Subject();


  /**
   * Placement of a popover. Accepts: "top", "bottom", "left", "right"
   */
  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  /**
   * Indicates that dropdown will be closed on item or document click,
   * and after pressing ESC
   */
  @Input() set autoClose(value: boolean) {
    if (typeof value === 'boolean') {
      this._config.autoClose = value;
    }
  };

  get autoClose(): boolean {
    return this._config.autoClose;
  }



  /**
   * Emits an event when isOpen change
   */
  @Output() isOpenChange: EventEmitter<any>;

  /**
   * Emits an event when the popover is shown
   */
  @Output() onShown: EventEmitter<any>;

  /**
   * Emits an event when the popover is hidden
   */
  @Output() onHidden: EventEmitter<any>;

  @Input() isRight;
  @Input() isDisabled;

  @Input()
  showDelay = this._config.showDelay;

  @Input()
  hideDelay = this._config.hideDelay;


  constructor(private _elementRef: ElementRef,
              private _viewContainerRef: ViewContainerRef,
              public overlay: Overlay,
              private _ngZone: NgZone,
              private _scrollDispatcher: ScrollDispatcher,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _config: DropdownConfig,
              @Optional() private _dir: Directionality) {


  }

  ngOnInit(): void {
      this.trigger.isOpenChange.subscribe((data) => {
        if (data) {
          this.show();
        }
      });
  }



  ngOnDestroy(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
    this._destroyed.next();
    this._destroyed.complete();
  }


  show(delay: number = this.showDelay) {
    const overlayRef = this._createOverlay();
    this._detach();
    overlayRef.attach(this._portal);
  }

  hide(delay: number = this.hideDelay) {
    this._detach();
  }

  private _createOverlay(): OverlayRef {
    if (this._overlayRef) {
      return this._overlayRef;
    }

    this._portal = new TemplatePortal(this.menu.templateRef, this._viewContainerRef);

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.trigger.elementRef)
      .withTransformOriginOn('.hxa-dropdown-control')
      .withFlexibleDimensions(false);

    this._overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      panelClass: ['hxa-dropdown-panel', 'is-open'],
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    this._updatePosition();

    this._overlayRef.detachments()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    this._overlayRef.backdropClick().
    subscribe(() => this.hide());

    const position = this._overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe((pos) => {
        if (pos.connectionPair.originX === 'start') {
          this.placement = 'left';
        } else if (pos.connectionPair.originX === 'end') {
          this.placement = 'right';
        }
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
    if (this.placement === 'top' || this.placement === 'bottom') {
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
  }
}
