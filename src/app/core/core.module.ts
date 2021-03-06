import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AccordionComponent } from './accordion/accordion.component';
import { AutoGrowComponent } from './auto-grow/auto-grow.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { DatepickersComponent } from './datepicker/datepickers.component';
import { CustomDialogComponent } from './dialogs/custom-dialog/custom-dialog.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { ExampleFilterNewComponent } from './filters/examples/example-filter-new.component';
import { ExampleFilterOldComponent } from './filters/examples/example-filter-old.component';
import { FiltersComponent } from './filters/filters.component';
import { BasicCustomInspectorComponent } from './inspector/custom-inspectors/basic-custom-inspector.component';
import { InspectorComponent } from './inspector/inspector.component';
import { InstallGuideComponent } from './install-guide/install-guide.component';
import { LineClampComponent } from './line-clamp/line-clamp.component';
import { LoadersComponent } from './loaders/loaders.component';
import { MigrateV13Component } from './migrate-v13/migrate-v13.component';
import { CustomModalComponent } from './modals/custom-modal/custom-modal.component';
import { ModalsComponent } from './modals/modals.component';
import { NgSelectComponent } from './ng-select/ng-select.component';
import { NgxToastrComponent } from './ngx-toastr/ngx-toastr.component';
import { OnlineStatusComponent } from './online-status/online-status.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabularComponent } from './tabular/tabular.component';
import { TabularService } from './tabular/tabular.service';
import { TextInputComponent } from './text-input/text-input.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { StaticArrayComponent } from './typeaheads/static-array/static-array.component';
import { TypeaheadsComponent } from './typeaheads/typeaheads.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    PageNotFoundComponent,
    DatepickersComponent,
    DateRangePickerComponent,
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
    AutoGrowComponent,
    EmptyStateComponent,
    AccordionComponent,
    FiltersComponent,
    LoadersComponent,
    TextInputComponent,
    OnlineStatusComponent,
    DateRangePickerComponent,
    DialogsComponent,
    CustomDialogComponent,
    NgSelectComponent,
    LineClampComponent,
    InspectorComponent,
    BasicCustomInspectorComponent,
    NgSelectComponent,
    NgxToastrComponent,
    ExampleFilterNewComponent,
    ExampleFilterOldComponent,
    TimepickerComponent,
    MigrateV13Component,
  ],
  providers: [TabularService],
  exports: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
