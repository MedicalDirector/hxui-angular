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
     * @param component
     * @param parameters
     * @returns {ReplaySubject}
     */
    create<T>(component: any, parameters?: Object): ComponentRef<T>;
    /**
     * Load dynamic component and return componentRef
     * @param component
     * @param parameters
     * @returns {ComponentRef}
     */
    private dynamicComponentLoader<T>(component, parameters?);
}
