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

export * from './src/modules/modal/index';
export * from './src/modules/datepicker/index';
export * from './src/modules/dropdown/index';
export * from './src/modules/pagination/index';
export * from './src/modules/tabs/index';
export * from './src/modules/tooltip/index';
export * from './src/modules/typeahead/index';
export * from './src/modules/tabular/index';
export * from './src/modules/datepicker/index';

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



@NgModule({
  imports: [
    DropdownModule.forRoot(), ModalModule.forRoot(), PaginationModule.forRoot(),
    TabsModule.forRoot(), TooltipModule.forRoot(),
    TypeaheadModule.forRoot(), TabularModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  exports: [
    DatepickerModule, DropdownModule, ModalModule,
    PaginationModule, TabsModule, TooltipModule,
    TypeaheadModule, TabularModule
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
