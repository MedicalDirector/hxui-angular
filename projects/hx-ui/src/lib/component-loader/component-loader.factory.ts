import {
  Injectable, NgZone, ViewContainerRef, ComponentFactoryResolver, Injector,
  Renderer2, ElementRef
} from '@angular/core';
import { ComponentLoader } from './component-loader.class';
import { PositioningService } from '../positioning/positioning.service';

@Injectable()
export class ComponentLoaderFactory {
  private _componentFactoryResolver: ComponentFactoryResolver;
  private _ngZone: NgZone;
  private _injector: Injector;
  private _posService: PositioningService;

  public constructor(componentFactoryResolver: ComponentFactoryResolver, ngZone: NgZone,
                     injector: Injector, posService: PositioningService) {
    this._ngZone = ngZone;
    this._injector = injector;
    this._posService = posService;
    this._componentFactoryResolver = componentFactoryResolver;
  }

  public createLoader<T>(_elementRef: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer2): ComponentLoader<T> {
    return new ComponentLoader<T>(_viewContainerRef, _renderer, _elementRef,
      this._injector, this._componentFactoryResolver, this._ngZone, this._posService);
  }
}
