import { ViewContainerRef, ReflectiveInjector, Injectable, Injector, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ModalBackdropComponent } from './modal-backdrop.component';
var ModalService = /** @class */ (function () {
    function ModalService(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ModalService.prototype.registerViewContainerRef = function (vcRef) {
        this.vcRef = vcRef;
    };
    ModalService.prototype.registerInjector = function (injector) {
        this.injector = injector;
    };
    /**
     * Create component dynamically
     * @param component
     * @param parameters
     * @returns {ReplaySubject}
     */
    /**
         * Create component dynamically
         * @param component
         * @param parameters
         * @returns {ReplaySubject}
         */
    ModalService.prototype.create = /**
         * Create component dynamically
         * @param component
         * @param parameters
         * @returns {ReplaySubject}
         */
    function (component, parameters) {
        //create backdrop
        this.backdropRef = this.dynamicComponentLoader(ModalBackdropComponent);
        //create dynamic component
        return this.dynamicComponentLoader(component, parameters);
    };
    /**
     * Load dynamic component and return componentRef
     * @param component
     * @param parameters
     * @returns {ComponentRef}
     */
    /**
         * Load dynamic component and return componentRef
         * @param component
         * @param parameters
         * @returns {ComponentRef}
         */
    ModalService.prototype.dynamicComponentLoader = /**
         * Load dynamic component and return componentRef
         * @param component
         * @param parameters
         * @returns {ComponentRef}
         */
    function (component, parameters) {
        var _this = this;
        // compile the component based on its type and
        // create a component factory
        var factory = this.componentFactoryResolver.resolveComponentFactory(component);
        // the injector will be needed for DI in
        // the custom component
        var childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
        // create the actual component
        var componentRef = this.vcRef.createComponent(factory, 0, childInjector);
        // pass the @Input parameters to the instance
        Object.assign(componentRef.instance, parameters);
        // add a destroy method to the modal instance
        componentRef.instance['destroy'] = function () {
            // this will close the backdrop
            // this will close the backdrop
            _this.backdropRef.destroy();
            // this will destroy the component
            componentRef.destroy();
        };
        return componentRef;
    };
    ModalService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ModalService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
    ]; };
    return ModalService;
}());
export { ModalService };
//# sourceMappingURL=modal.service.js.map