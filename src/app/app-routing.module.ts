import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordionComponent } from './core/accordion/accordion.component';
import { AutoGrowComponent } from './core/auto-grow/auto-grow.component';
import { DateRangePickerComponent } from './core/date-range-picker/date-range-picker.component';
import { DatepickersComponent } from './core/datepicker/datepickers.component';
import { DialogsComponent } from './core/dialogs/dialogs.component';
import { DropdownsComponent } from './core/dropdowns/dropdowns.component';
import { EmptyStateComponent } from './core/empty-state/empty-state.component';
import { FiltersComponent } from './core/filters/filters.component';
import { InspectorComponent } from './core/inspector/inspector.component';
import { InstallGuideComponent } from './core/install-guide/install-guide.component';
import { LineClampComponent } from './core/line-clamp/line-clamp.component';
import { LoadersComponent } from './core/loaders/loaders.component';
import { ModalsComponent } from './core/modals/modals.component';
import { NgSelectComponent } from './core/ng-select/ng-select.component';
import { NgxToastrComponent } from './core/ngx-toastr/ngx-toastr.component';
import { OnlineStatusComponent } from './core/online-status/online-status.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { PaginationComponent } from './core/pagination/pagination.component';
import { SelectizeComponent } from './core/selectize/selectize.component';
import { TabsComponent } from './core/tabs/tabs.component';
import { TabularComponent } from './core/tabular/tabular.component';
import { TextInputComponent } from './core/text-input/text-input.component';
import { TimepickerComponent } from './core/timepicker/timepicker.component';
import { TooltipsComponent } from './core/tooltips/tooltips.component';
import { TypeaheadsComponent } from './core/typeaheads/typeaheads.component';

const routes: Routes = [
  { path: '', redirectTo: '/install-guide', pathMatch: 'full' },
  { path: 'install-guide', component: InstallGuideComponent },
  { path: 'accordion', component: AccordionComponent },
  { path: 'date-pickers', component: DatepickersComponent },
  { path: 'time-picker', component: TimepickerComponent },
  { path: 'date-range-pickers', component: DateRangePickerComponent },
  { path: 'dropdowns', component: DropdownsComponent },
  { path: 'dialogs', component: DialogsComponent },
  { path: 'inspector', component: InspectorComponent },
  { path: 'modals', component: ModalsComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'typeaheads', component: TypeaheadsComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'tabular', component: TabularComponent },
  { path: 'selectize', component: SelectizeComponent },
  { path: 'autogrow', component: AutoGrowComponent },
  { path: 'empty-state', component: EmptyStateComponent },
  { path: 'filters', component: FiltersComponent },
  { path: 'loaders', component: LoadersComponent },
  { path: 'text-input', component: TextInputComponent },
  { path: 'online-status', component: OnlineStatusComponent },
  { path: 'ng-select', component: NgSelectComponent },
  { path: 'line-clamp', component: LineClampComponent },
  { path: 'toastr', component: NgxToastrComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
