import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DatepickersComponent } from './datepicker/datepickers.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { ModalsComponent } from './modals/modals.component';
import { CustomModalComponent } from './modals/custom-modal/custom-modal.component';
import { TabsComponent } from './tabs/tabs.component';
import { TypeaheadsComponent } from './typeaheads/typeaheads.component';
import { StaticArrayComponent } from './typeaheads/static-array/static-array.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TabularComponent } from './tabular/tabular.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './tabular/in-memory-data.service';
import { TabularService } from './tabular/tabular.service';
import { InstallGuideComponent } from './install-guide/install-guide.component';
import { SelectizeComponent } from 'app/core/selectize/selectize.component';
import { AutoGrowComponent } from './auto-grow/auto-grow.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { AccordionComponent } from './accordion/accordion.component';
import { FiltersComponent } from './filters/filters.component';
import { LoadersComponent } from './loaders/loaders.component';
import { TextFieldComponent } from './text-field/text-field.component';

@NgModule({
  imports: [
    SharedModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService,  {dataEncapsulation: false })
  ],
  declarations: [
      PageNotFoundComponent,
      WelcomeComponent,
      DatepickersComponent,
      DropdownsComponent,
      ModalsComponent,
      CustomModalComponent,
      TabsComponent,
      TypeaheadsComponent,
      StaticArrayComponent,
      TooltipsComponent,
      PaginationComponent,
      TabularComponent,
      InstallGuideComponent,
      SelectizeComponent,
      AutoGrowComponent,
      EmptyStateComponent,
      AccordionComponent,
      FiltersComponent,
      LoadersComponent,
      TextFieldComponent,
      
  ],
  providers: [
     TabularService,
     InMemoryDataService
  ],
  exports: [],
  entryComponents: [CustomModalComponent]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
      ]
    };
  }
}
