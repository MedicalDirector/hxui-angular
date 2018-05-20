/* tslint:disable: max-classes-per-file */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DatepickerModule } from './src/modules/datepicker/datepicker.module';
import { DropdownModule } from './src/modules/dropdown/dropdown.module';
import { ModalModule } from './src/modules/modal/modal.module';
import { PaginationModule } from './src/modules/pagination/pagination.module';
import { TabsModule } from './src/modules/tabs/tabs.module';
import { TooltipModule } from './src/modules/tooltip/tooltip.module';
import { TypeaheadModule } from './src/modules/typeahead/typeahead.module';
import { ModalService } from './src/modules/modal/modal.service';
import { TabularModule } from './src/modules/tabular/tabular.module';
import { SelectizeModule } from './src/modules/selectize/selectize.module';
import { AutoGrowModule } from './src/modules/auto-grow';
import {EmptyStateModule} from './src/modules/empty-state/empty-state.module';

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

export {
  ComponentLoaderFactory
} from './src/modules/component-loader/component-loader.factory';

export {
  ContentRef
} from './src/modules/component-loader/content-ref.class';

export {
  ComponentLoader
} from './src/modules/component-loader/component-loader.class';

export {
  Positioning, PositioningOptions, PositioningService, positionElements
} from './src/modules/positioning/index';

export {
  Context
} from './src/modules/enums';

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
