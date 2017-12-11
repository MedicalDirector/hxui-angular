import { Injectable, NgZone, ViewContainerRef, ComponentFactoryResolver, Injector, Renderer, ElementRef } from '@angular/core';
import { ComponentLoader } from './component-loader.class';
import { PositioningService } from '../positioning/positioning.service';
var ComponentLoaderFactory = /** @class */ (function () {
    function ComponentLoaderFactory(componentFactoryResolver, ngZone, injector, posService) {
        this._ngZone = ngZone;
        this._injector = injector;
        this._posService = posService;
        this._componentFactoryResolver = componentFactoryResolver;
    }
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     * @returns {ComponentLoader}
     */
    /**
       *
       * @param _elementRef
       * @param _viewContainerRef
       * @param _renderer
       * @returns {ComponentLoader}
       */
    ComponentLoaderFactory.prototype.createLoader = /**
       *
       * @param _elementRef
       * @param _viewContainerRef
       * @param _renderer
       * @returns {ComponentLoader}
       */
    function (_elementRef, _viewContainerRef, _renderer) {
        return new ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._posService);
    };
    ComponentLoaderFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ComponentLoaderFactory.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: NgZone, },
        { type: Injector, },
        { type: PositioningService, },
    ]; };
    return ComponentLoaderFactory;
}());
export { ComponentLoaderFactory };
//# sourceMappingURL=component-loader.factory.js.map