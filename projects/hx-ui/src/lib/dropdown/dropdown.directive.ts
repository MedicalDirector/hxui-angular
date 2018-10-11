import {
  ComponentFactoryResolver,
  Directive, ElementRef, EmbeddedViewRef, EventEmitter, HostBinding, Input, NgZone, OnDestroy, OnInit, Optional, Output,
  Renderer2, ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { ComponentLoader } from '../component-loader/component-loader.class';
import { DropdownConfig } from './dropdown.config';
import { DropdownContainerComponent } from './dropdown-container.component';
import { DropdownState } from './dropdown.state';
import { HxComponentRef } from '../component-loader/hx-component-ref.class';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import {Subject} from 'rxjs/index';
import {ComponentPortal, TemplatePortal, TemplatePortal} from '@angular/cdk/portal';
import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos, OriginConnectionPosition, Overlay, OverlayConnectionPosition, OverlayRef,
  ScrollDispatcher, VerticalConnectionPos
} from '@angular/cdk/overlay';
import {DatepickerComponent} from '../datepicker/datepicker.component';
import {DatepickerConfig} from '../datepicker/datepicker.config';
import {Directionality} from '@angular/cdk/bidi';

@Directive({
  selector: '[hxaDropdown],[hxDropdown]',
  exportAs: 'hx-dropdown, hxa-dropdown',
  providers: [DropdownState],
  host: {
    '[class.is-dropup]': 'dropup',
    '[class.is-open]': 'isOpen',
    '[class.is-right]': 'isRight'
  }
})
export class DropdownDirective implements OnInit, OnDestroy {

  _overlayRef: OverlayRef | null;
  private _portal: TemplatePortal;
  private readonly _destroyed = new Subject();


  /**
   * Placement of a popover. Accepts: "top", "bottom", "left", "right"
   */
  @Input() placement: string;
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  @Input() triggers: string;
  /**
   * A selector specifying the element the popover should be appended to.
   * Currently only supports "body".
   */
  @Input() container: string;

  /**
   * This attribute indicates that the dropdown should be opened upwards
   */
  @Input() dropup: boolean;

  /**
   * Indicates that dropdown will be closed on item or document click,
   * and after pressing ESC
   */
  @Input() set autoClose(value: boolean) {
    if (typeof value === 'boolean') {
      this._state.autoClose = value;
    }
  };

  get autoClose(): boolean {
    return this._state.autoClose;
  }

  /**
   * Disables dropdown toggle and hides dropdown menu if opened
   */
  @Input() set isDisabled(value: boolean) {
    this._isDisabled = value;
    this._state.isDisabledChange.emit(value);
    if (value) {
      this._hide();
    }
  }

  get isDisabled(): boolean { return this._isDisabled; }

  /**
   * Returns whether or not dropdown is position right of the toggle
   */
  @Input() get isRight(): boolean {
    return this._isInlineRight;
  }

  set isRight(value: boolean) {
    this._isInlineRight = value;
  }

  /**
   * Returns whether or not the dropdown is currently being shown
   */
  @Input() get isOpen(): boolean {
    if (this._showInline) {
      return this._isInlineOpen;
    }
    return this._dropdown.isShown;
  }

  set isOpen(value: boolean) {
    if (value) {
      this._show();
    } else {
      this._hide();
    }
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


  @Input()
  showDelay = this._config.showDelay;

  @Input()
  hideDelay = this._config.hideDelay;

  // todo: move to component loader
  private _isInlineOpen = false;
  private _isInlineRight = false;
  private _showInline: boolean;
  private _inlinedMenu: EmbeddedViewRef<DropdownMenuDirective>;

  private _isDisabled: boolean;
  private _dropdown: ComponentLoader<DropdownContainerComponent>;
  private _subscriptions: Subscription[] = [];
  private _isInited = false;

  constructor(private _elementRef: ElementRef,
              private _viewContainerRef: ViewContainerRef,
              public overlay: Overlay,
              private _ngZone: NgZone,
              private _scrollDispatcher: ScrollDispatcher,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _config: DropdownConfig,
              private _state: DropdownState,
              @Optional() private _dir: Directionality) {


  }

  ngOnInit(): void {

  }


  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  toggle(value?: boolean): void {
    if (this.isOpen || value === false) {
      return this._hide();
    }

    return this._show();
  }

  ngOnDestroy(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }

    this._destroyed.next();
    this._destroyed.complete();
  }


  private _show(delay: number = this.showDelay) {

    if (this._isDisabled || this._state.isOpen) { return; }

    const overlayRef = this._createOverlay();

    this._detach();
    overlayRef.attach(this._portal);

    if (this.menu.lazyContent) {
      this.menu.lazyContent.attach(this.menuData);
    }

    this._closeSubscription = this._menuClosingActions().subscribe(() => this.closeMenu());
    this._initMenu();

    if (this.menu instanceof MatMenu) {
      this.menu._startAnimation();
    }

  }

  private _hide(delay: number = this.hideDelay) {
    if (this._menuInstance) {
      this._menuInstance.hide(delay);
    }
  }

  private _createOverlay(): OverlayRef {
    if (this._overlayRef) {
      return this._overlayRef;
    }

    this._portal = new TemplatePortal(this._state.templateRef, this._viewContainerRef);

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this._elementRef)
      .withTransformOriginOn('.hxa-dropdown-control')
      .withFlexibleDimensions(false);

    this._overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      panelClass: 'hxa-dropdown-panel',
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    this._updatePosition();

    this._overlayRef.detachments()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    this._overlayRef.backdropClick().
    subscribe(() => this._hide());

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
