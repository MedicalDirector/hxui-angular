import { ModuleWithProviders } from '@angular/core';
export * from './modal/index';
export * from './dropdown/index';
export * from './pagination/index';
export * from './tabs/index';
export * from './tooltip/index';
export * from './typeahead/index';
export * from './tabular/index';
export { OnChange, LinkedList, Trigger, Utils } from './utils/index';
export { ComponentLoaderFactory } from './component-loader/component-loader.factory';
export { ContentRef } from './component-loader/content-ref.class';
export { ComponentLoader } from './component-loader/component-loader.class';
export { Positioning, PositioningOptions, PositioningService, positionElements } from './positioning/index';
export declare class HxUiModule {
    static forRoot(): ModuleWithProviders;
}
