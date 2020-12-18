import {ComponentRef, Inject, Injectable, Injector, Optional} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {DialogOverlayRef} from './dialog-overlay.ref';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {FocusTrapFactory} from '@angular/cdk/a11y';
import {DOCUMENT} from '@angular/common';

interface DialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  backdropClickable?: boolean;
}

const DEFAULT_CONFIG: DialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'hx-modal-panel',
  backdropClickable: true
};

@Injectable()
export class DialogService {

  private focusTrap;
  private componentNativeElement;

  constructor(
    private injector: Injector,
    private overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory
  ) {}


  /**
   * Create component dynamically
   */
  open(component: any, config: DialogConfig = {}, parameters?: Object): DialogOverlayRef {

    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.createOverlay(dialogConfig);

    const dialogRef = new DialogOverlayRef(overlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    // and then attach ComponentPortal to PortalHost
    const containerRef = this.attachDialogContainer(component, overlayRef, dialogConfig, dialogRef);

    // pass the @Input parameters to the instance
    Object.assign(containerRef.instance, parameters);

    // Subscribe to a stream that emits when the backdrop was clicked
    if (dialogConfig.backdropClickable) {
      overlayRef.backdropClick().subscribe(_ => dialogRef.close());
    }

    // create and manage focus trap
    this.componentNativeElement = containerRef.location.nativeElement;
    this.trapFocus();

    return dialogRef;
  }

  private createOverlay(config: DialogConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }


  private getOverlayConfig(config: DialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createInjector(dialogRef: DialogOverlayRef): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(DialogOverlayRef, dialogRef);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

  private attachDialogContainer(component: any, overlayRef: OverlayRef, config: DialogConfig, dialogRef: DialogOverlayRef) {
    const injector = this.createInjector(dialogRef);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<any> = overlayRef.attach(containerPortal);

    return containerRef;
  }

  private trapFocus() {
    this.focusTrap = this.focusTrapFactory.create(this.componentNativeElement);
    this.focusTrap.focusInitialElementWhenReady();
  }

}
