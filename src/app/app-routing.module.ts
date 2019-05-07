import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { DatepickersComponent } from './core/datepicker/datepickers.component';
import { DropdownsComponent } from './core/dropdowns/dropdowns.component';
import { ModalsComponent } from './core/modals/modals.component';
import { TabsComponent } from './core/tabs/tabs.component';
import { TypeaheadsComponent } from './core/typeaheads/typeaheads.component';
import { TooltipsComponent } from './core/tooltips/tooltips.component';
import { PaginationComponent } from './core/pagination/pagination.component';
import { TabularComponent } from './core/tabular/tabular.component';
import { InstallGuideComponent } from './core/install-guide/install-guide.component';
import { SelectizeComponent } from 'app/core/selectize/selectize.component';
import {AutoGrowComponent} from './core/auto-grow/auto-grow.component';
import {EmptyStateComponent} from './core/empty-state/empty-state.component';
import { AccordionComponent } from './core/accordion/accordion.component';
import {FiltersComponent} from './core/filters/filters.component';
import {LoadersComponent} from './core/loaders/loaders.component';
import {TextInputComponent} from './core/text-input/text-input.component';
import {OnlineStatusComponent} from './core/online-status/online-status.component';
import {ToastrComponent} from './core/toastr/toastr.component';
import { DateRangePickerComponent } from './core/date-range-picker/date-range-picker.component';

const routes: Routes = [
  { path: '', redirectTo: '/install-guide', pathMatch: 'full' },
  { path: 'install-guide',  component: InstallGuideComponent },
  { path: 'accordion',  component: AccordionComponent },
  { path: 'datepickers',  component: DatepickersComponent },
  { path:  'daterangepickers', component: DateRangePickerComponent},
  { path: 'dropdowns',  component: DropdownsComponent },
  { path: 'modals',  component: ModalsComponent },
  { path: 'tabs',  component: TabsComponent },
  { path: 'typeaheads',  component: TypeaheadsComponent },
  { path: 'tooltips',  component: TooltipsComponent },
  { path: 'pagination',  component: PaginationComponent },
  { path: 'tabular',  component: TabularComponent },
  { path: 'selectize',  component: SelectizeComponent },
  { path: 'autogrow',  component: AutoGrowComponent },
  { path: 'empty-state',  component: EmptyStateComponent },
  { path: 'filters',  component: FiltersComponent },
  { path: 'loaders',  component: LoadersComponent },
  { path: 'text-input',  component: TextInputComponent },
  { path: 'online-status',  component: OnlineStatusComponent },
  { path: 'toastr',  component: ToastrComponent },
  { path: '**',  component: PageNotFoundComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
