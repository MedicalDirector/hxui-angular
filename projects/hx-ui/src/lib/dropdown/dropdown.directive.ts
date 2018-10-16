import {
  AfterContentInit, AfterViewInit,
  ComponentFactoryResolver, ContentChild, ContentChildren,
  Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, OnDestroy, OnInit, Optional, Output, QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';

import { takeUntil} from 'rxjs/operators';
import { DropdownConfig } from './dropdown.config';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import {Subject} from 'rxjs/index';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  FlexibleConnectedPositionStrategy,
  Overlay, OverlayRef, OverlaySizeConfig,
  ScrollDispatcher
} from '@angular/cdk/overlay';
import {Directionality} from '@angular/cdk/bidi';
import {DropdownToggleDirective} from './dropdown-toggle.directive';
import {DropdownItemDirective} from './dropdown-item.directive';

@Directive({
  selector: '[hxaDropdown],[hxDropdown]',
  exportAs: 'hx-dropdown, hxa-dropdown'
})
export class DropdownDirective implements OnInit, OnDestroy, AfterContentInit {

  @ContentChild(DropdownMenuDirective) menu: DropdownMenuDirective;

  _overlayRef: OverlayRef | null;
  private _portal: TemplatePortal;
  private readonly _destroyed = new Subject();
  public isOpen = false;

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  private _autoClose = this._config.autoClose;
  @Input() set autoClose(value: boolean) {
      this._autoClose = value;
  };

  get autoClose(): boolean {
    return this._autoClose;
  }

  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() onShown: EventEmitter<any> = new EventEmitter<any>();

  @Output() onHidden: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  isDisabled = false;

  @Input()
  showDelay = this._config.showDelay;

  @Input()
  hideDelay = this._config.hideDelay;

  @Input()
  maxWidthRelativeTo: string;

  @Input()
  minWidthRelativeTo: string;

  constructor(private _elementRef: ElementRef,
              private _viewContainerRef: ViewContainerRef,
              public overlay: Overlay,
              public _config: DropdownConfig) {
  }

  ngOnInit(): void {

  }

  ngAfterContentInit() {
  }

  ngOnDestroy(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
    this._destroyed.next();
    this._destroyed.complete();
  }

  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  toggle(value?: boolean): void {
    if (this.isOpen || value === false) {
      return this.hide();
    }

    return this.show();
  }



  show(delay: number = this.showDelay) {
    if (this.isDisabled || this.isOpen) { return; }

    const overlayRef = this._createOverlay();
    this._detach();
    overlayRef.attach(this._portal);
    this._setWidthsRelativeTo(overlayRef);
    this.isOpen = true;
    this.isOpenChange.emit(this.isOpen);
    this.onShown.emit();
  }

  hide(delay: number = this.hideDelay) {
    this._detach();
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.onHidden.emit();
  }

  private _createOverlay(): OverlayRef {
    if (this._overlayRef) {
      return this._overlayRef;
    }

    this._portal = new TemplatePortal(this.menu.templateRef, this._viewContainerRef);

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this._elementRef)
      .withFlexibleDimensions(false)
      .withDefaultOffsetX(0)
      .withDefaultOffsetY(this._elementRef.nativeElement.clientHeight)
      .withViewportMargin(this._elementRef.nativeElement.clientHeight)
      .withPositions([{ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' }])
      .withTransformOriginOn('.hxa-dropdown-control');


    this._overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      panelClass: ['hxui-reset', 'hxa-dropdown-panel', 'is-open'],
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });


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

  private _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
  }

  private _setWidthsRelativeTo(overlayRef: OverlayRef) {
    if (this.maxWidthRelativeTo && this.minWidthRelativeTo) {
      const elem: Element = document.getElementById(this.maxWidthRelativeTo);
      overlayRef.updateSize({minWidth: elem.clientWidth, maxWidth: elem.clientWidth});
    } else if (this.maxWidthRelativeTo) {
      const elem: Element = document.getElementById(this.maxWidthRelativeTo);
      overlayRef.updateSize({maxWidth: elem.clientWidth});
    }else if (this.minWidthRelativeTo) {
      const elem: Element = document.getElementById(this.minWidthRelativeTo);
      console.log(this.menu.templateRef);
      overlayRef.updateSize({minWidth: elem.clientWidth});
    }
  }
}
