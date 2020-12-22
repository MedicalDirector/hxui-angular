import {ComponentRef, Inject, Injectable, Injector, Optional} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {InspectorOverlayRef} from './inspector-overlay.ref';
import {CdkPortalOutlet, ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {FocusTrapFactory} from '@angular/cdk/a11y';
import {InspectorComponent} from './inspector.component';
import {InspectorSize} from './inspector-size.enum';
import {InspectorLocation} from "./inspector-location.enum";

interface InspectorConfig {
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  backdropClass?: string;
  size?: InspectorSize;
  location?: InspectorLocation;
  hasClose?: boolean;
}

const DEFAULT_CONFIG: InspectorConfig = {
  hasBackdrop: true,
  backdropClass: 'hx-modal-background',
  panelClass: [],
  hasClose: true
};

@Injectable()
export class InspectorService {

  private focusTrap;
  private componentNativeElement;
  private overlayCollection: InspectorOverlayRef[] = [];

  constructor(
    private injector: Injector,
    private overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory
  ) {}


  /**
   * Create component dynamically
   */
  open(component: any, config: InspectorConfig = {}, parameters?: Object): InspectorOverlayRef {

    // Override default configuration
    const inspectorConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.createOverlay(inspectorConfig);

    const inspectorRef = new InspectorOverlayRef(overlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    // and then attach ComponentPortal to PortalHost
    const containerRef = this.attachInspectorContainer(component, overlayRef, inspectorConfig, inspectorRef, parameters);

    // get reference to the inspector instance
    const inspectorInstance = containerRef.instance;

    // set size
    inspectorInstance.size = (inspectorConfig.size && inspectorConfig.size === InspectorSize.Large) ? 'large' : 'small';

    // set location
    inspectorInstance.location = (inspectorConfig.location === InspectorLocation.Left) ? InspectorLocation.Left : InspectorLocation.Right;

    // pass the @Input parameters to the instance
    Object.assign(inspectorInstance.parameters, parameters);

    // add reference to inspector component
    inspectorRef.inspectorInstance = inspectorInstance;

    // Subscribe to a stream that emits when the backdrop was clicked
    overlayRef.backdropClick().subscribe(_ => inspectorRef.close());

    // subscribe to events when close animation completes
    inspectorInstance.onSlideOutComplete$.subscribe(_ => {
      overlayRef.dispose();
      this.overlayCollection.pop();
        const lastInspector = this.overlayCollection[this.overlayCollection.length - 1];
        if (lastInspector) {
          lastInspector.inspectorInstance.size = lastInspector.inspectorInstance.previousSize;
          lastInspector.inspectorInstance.hideClose = false;
        }
    });

    // subscribe to events when open animation starts
    inspectorInstance.onSlideInStart$.subscribe(_ => {
      if (this.overlayCollection.length > 1) {
        const previousInspector = this.overlayCollection[this.overlayCollection.length - 2];
        previousInspector.inspectorInstance.previousSize = previousInspector.inspectorInstance.size;
        const offsetSize = (previousInspector.inspectorInstance.size === previousInspector.inspectorInstance.sizes[InspectorSize.Small] && inspectorInstance.size === inspectorInstance.sizes[InspectorSize.Small]) ? InspectorSize.Offset : InspectorSize.FullWidth;
        previousInspector.resize(offsetSize);
        previousInspector.inspectorInstance.hideClose = true;
      }
    });

    // create and manage focus trap
    this.componentNativeElement = containerRef.location.nativeElement;
    this.trapFocus();

    // assign inspector ref
    this.overlayCollection.push(inspectorRef);

    return inspectorRef;
  }

  private createOverlay(config: InspectorConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }


  private getOverlayConfig(config: InspectorConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally();

    if (config.location === InspectorLocation.Left){
      positionStrategy.left('0');
    } else {
      positionStrategy.right('0');
    }

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlayInjector(inspectorRef: InspectorOverlayRef): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(InspectorOverlayRef, inspectorRef);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

  private attachInspectorContainer(component: any, overlayRef: OverlayRef, config: InspectorConfig, inspectorRef: InspectorOverlayRef, parameters?: Object) {
    const injector = this.createOverlayInjector(inspectorRef);
    const containerPortal = new ComponentPortal(InspectorComponent , null, injector);
    const containerRef: ComponentRef<InspectorComponent> = overlayRef.attach(containerPortal);
    containerRef.instance.componentPortal = new ComponentPortal(component);

    return containerRef;
  }

  private trapFocus() {
    this.focusTrap = this.focusTrapFactory.create(this.componentNativeElement);
    this.focusTrap.focusInitialElementWhenReady();
  }

}
