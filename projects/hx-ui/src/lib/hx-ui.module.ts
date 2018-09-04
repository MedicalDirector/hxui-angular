import {ModuleWithProviders, NgModule} from '@angular/core';
import {DropdownModule} from './dropdown/dropdown.module';
import {ModalModule} from './modal/modal.module';
import {PaginationModule} from './pagination/pagination.module';
import {TabsModule} from './tabs/tabs.module';
import {TooltipModule} from './tooltip/tooltip.module';
import {TypeaheadModule} from './typeahead/typeahead.module';
import {TabularModule} from './tabular/tabular.module';
import {SelectizeModule} from './selectize/selectize.module';
import {DatepickerModule} from './datepicker/datepicker.module';
import {AutoGrowModule} from './auto-grow/auto-grow.module';
import {EmptyStateModule} from './empty-state/empty-state.module';
import {ModalService} from './modal/modal.service';
import {AccordionModule} from './accordion/accordion.module';

@NgModule({
  imports: [
    DropdownModule.forRoot(), ModalModule.forRoot(), PaginationModule.forRoot(),
    TabsModule.forRoot(), TooltipModule.forRoot(),
    TypeaheadModule.forRoot(), TabularModule.forRoot(),
    SelectizeModule.forRoot(), DatepickerModule.forRoot(),
    AutoGrowModule.forRoot(), EmptyStateModule.forRoot(),
    AccordionModule
  ],
  exports: [
    DatepickerModule, DropdownModule, ModalModule,
    PaginationModule, TabsModule, TooltipModule,
    TypeaheadModule, TabularModule, SelectizeModule,
    AutoGrowModule, EmptyStateModule, AccordionModule
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
