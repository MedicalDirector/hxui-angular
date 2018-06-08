import {
  ViewContainerRef,
  ReflectiveInjector,
  Injectable,
  Injector,
  ComponentRef,
  ComponentFactoryResolver,
  Optional,
  Inject
} from '@angular/core';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ModalService {
  // here we hold our placeholder
  private vcRef: ViewContainerRef;
  // here we hold our injector
  private injector: Injector;
  // here we hold the backdrop component
  private backdropRef: ComponentRef<ModalBackdropComponent>;
  // Element that was focused before the dialog was opened. Save this to restore upon close.
  private elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

  private componentRef;

  private componentNativeElement;

  private focusTrap;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private focusTrapFactory: FocusTrapFactory,
    @Optional()
    @Inject(DOCUMENT)
    private document: any
  ) {}

  registerViewContainerRef(vcRef: ViewContainerRef): void {
    this.vcRef = vcRef;
  }

  registerInjector(injector: Injector): void {
    this.injector = injector;
  }

  /**
   * Create component dynamically
   */
  create<T>(component: any, parameters?: Object): ComponentRef<T> {
    // create backdrop
    this.backdropRef = this.dynamicComponentLoader<ModalBackdropComponent>(
      ModalBackdropComponent
    );

    // create dynamic component
    this.componentRef = this.dynamicComponentLoader<T>(component, parameters);

    this.componentNativeElement = this.componentRef.location.nativeElement;
    this.trapFocus();

    return this.componentRef;
  }

  close() {
    if (!!this.componentRef) {
      this.componentRef.destroy();
    }
  }

  /**
   * Load dynamic component and return componentRef
   */
  private dynamicComponentLoader<T>(
    component: any,
    parameters?: Object
  ): ComponentRef<any> {
    // compile the component based on its type and
    // create a component factory
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );
    // the injector will be needed for DI in
    // the custom component
    const childInjector = ReflectiveInjector.resolveAndCreate(
      [],
      this.injector
    );
    // create the actual component
    const componentRef = this.vcRef.createComponent(factory, 0, childInjector);

    // pass the @Input parameters to the instance
    Object.assign(componentRef.instance, parameters);
    // add a destroy method to the modal instance
    componentRef.instance['destroy'] = () => {
      // this will close the backdrop
      this.backdropRef.destroy();
      // this will destroy the component
      componentRef.destroy();
      this.restoreFocus();
    };

    return componentRef;
  }

  private trapFocus() {
    this.focusTrap = this.focusTrapFactory.create(this.componentNativeElement);
    this.savePreviouslyFocusedElement();
    this.focusTrap.focusInitialElementWhenReady();
  }

  private restoreFocus() {
    const toFocus = this.elementFocusedBeforeDialogWasOpened;

    if (toFocus && typeof toFocus.focus === 'function') {
      toFocus.focus();
    }

    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }

  private savePreviouslyFocusedElement() {
    if (this.document) {
      this.elementFocusedBeforeDialogWasOpened = this.document
        .activeElement as HTMLElement;
    }
  }
}
