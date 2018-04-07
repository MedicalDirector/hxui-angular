import { ViewContainerRef, Injector, ComponentRef, ComponentFactoryResolver } from '@angular/core';
export declare class ModalService {
    private componentFactoryResolver;
    private vcRef;
    private injector;
    private backdropRef;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    registerViewContainerRef(vcRef: ViewContainerRef): void;
    registerInjector(injector: Injector): void;
    /**
     * Create component dynamically
     */
    create<T>(component: any, parameters?: Object): ComponentRef<T>;
    /**
     * Load dynamic component and return componentRef
     */
    private dynamicComponentLoader<T>(component, parameters?);
}
