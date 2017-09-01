/* tslint:disable: max-classes-per-file */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DropdownModule } from './dropdown/dropdown.module';
import { ModalModule } from './modal/modal.module';
import { PaginationModule } from './pagination/pagination.module';
import { TabsModule } from './tabs/tabs.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { TypeaheadModule } from './typeahead/typeahead.module';
import {ModalService} from "./modal/modal.service";
import {TabularModule} from "./tabular/tabular.module";

export * from './modal';
export * from './dropdown';
export * from './pagination';
export * from './tabs';
export * from './tooltip';
export * from './typeahead';
export * from './tabular';

export { OnChange, LinkedList, Trigger, Utils } from './utils';

export {
  ComponentLoader, ComponentLoaderFactory, ContentRef
} from './component-loader';

export {
  Positioning, PositioningOptions, PositioningService, positionElements
} from './positioning';


@NgModule({
  imports: [
    DropdownModule.forRoot(), ModalModule.forRoot(), PaginationModule.forRoot(),
    TabsModule.forRoot(), TooltipModule.forRoot(),
    TypeaheadModule.forRoot(), TabularModule.forRoot()
  ],
  exports: [
    DropdownModule, ModalModule, PaginationModule,
    TabsModule, TooltipModule,
    TypeaheadModule, TabularModule
  ]
})


export class HxUiModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: HxUiModule,
      providers:[
        ModalService
      ]
    };
  }
}
