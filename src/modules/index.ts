/* tslint:disable: max-classes-per-file */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DatepickerModule } from './datepicker/datepicker.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { ModalModule } from './modal/modal.module';
import { PaginationModule } from './pagination/pagination.module';
import { TabsModule } from './tabs/tabs.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { TypeaheadModule } from './typeahead/typeahead.module';
import { ModalService } from './modal/modal.service';
import { TabularModule } from './tabular/tabular.module';
import { SelectizeModule } from './selectize/selectize.module';
import {AutoGrowModule} from './auto-grow';
import {EmptyStateModule} from './empty-state/empty-state.module';

export * from './modal/index';
export * from './datepicker/index';
export * from './dropdown/index';
export * from './pagination/index';
export * from './tabs/index';
export * from './tooltip/index';
export * from './typeahead/index';
export * from './tabular/index';
export * from './datepicker/index';
export * from './selectize/index';
export * from './auto-grow/index';
export * from './empty-state/index';

export { OnChange, LinkedList, Trigger, Utils } from './utils/index';

export {
   ComponentLoaderFactory
} from './component-loader/component-loader.factory';

export {
  ContentRef
} from './component-loader/content-ref.class';

export {
  ComponentLoader
} from './component-loader/component-loader.class';

export {
  Positioning, PositioningOptions, PositioningService, positionElements
} from './positioning/index';

export {
  Context
} from './enums';

@NgModule({
  imports: [
    DropdownModule.forRoot(), ModalModule.forRoot(), PaginationModule.forRoot(),
    TabsModule.forRoot(), TooltipModule.forRoot(),
    TypeaheadModule.forRoot(), TabularModule.forRoot(),
    SelectizeModule.forRoot(), DatepickerModule.forRoot(),
    AutoGrowModule.forRoot(), EmptyStateModule.forRoot()
  ],
  exports: [
    DatepickerModule, DropdownModule, ModalModule,
    PaginationModule, TabsModule, TooltipModule,
    TypeaheadModule, TabularModule, SelectizeModule,
    AutoGrowModule, EmptyStateModule
  ]
})

export class HxUiModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: HxUiModule,
      providers: [
        ModalService
      ]
    };
  }
}
