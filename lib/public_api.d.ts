import { ModuleWithProviders } from '@angular/core';
export * from './src/modules/modal/index';
export * from './src/modules/datepicker/index';
export * from './src/modules/dropdown/index';
export * from './src/modules/pagination/index';
export * from './src/modules/tabs/index';
export * from './src/modules/tooltip/index';
export * from './src/modules/typeahead/index';
export * from './src/modules/tabular/index';
export * from './src/modules/datepicker/index';
export * from './src/modules/selectize/index';
export * from './src/modules/auto-grow/index';
export * from './src/modules/empty-state/index';
export { OnChange, LinkedList, Trigger, Utils } from './src/modules/utils/index';
export { ComponentLoaderFactory } from './src/modules/component-loader/component-loader.factory';
export { ContentRef } from './src/modules/component-loader/content-ref.class';
export { ComponentLoader } from './src/modules/component-loader/component-loader.class';
export { Positioning, PositioningOptions, PositioningService, positionElements } from './src/modules/positioning/index';
export { Context } from './src/modules/enums';
export declare class HxUiModule {
    static forRoot(): ModuleWithProviders;
}
