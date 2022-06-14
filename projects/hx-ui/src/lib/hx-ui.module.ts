import { DatePipe } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { AccordionModule } from './accordion/accordion.module';
import { AutoGrowModule } from './auto-grow/auto-grow.module';
import { DateRangePickerModule } from './date-range-picker/date-range-picker.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { DialogModule } from './dialog/dialog.module';
import { DialogService } from './dialog/dialog.service';
import { DropdownModule } from './dropdown/dropdown.module';
import { EmptyStateModule } from './empty-state/empty-state.module';
import { FiltersModule } from './filters/filters.module';
import { InspectorModule } from './inspector/inspector.module';
import { InspectorService } from './inspector/inspector.service';
import { LineClampModule } from './line-clamp/line-clamp.module';
import { LoadersModule } from './loaders/loaders.module';
import { ModalModule } from './modal/modal.module';
import { ModalService } from './modal/modal.service';
import { PaginationModule } from './pagination/pagination.module';
import { SelectizeModule } from './selectize/selectize.module';
import { TabsModule } from './tabs/tabs.module';
import { TabularModule } from './tabular/tabular.module';
import { TextInputModule } from './text-input/text-input.module';
import { TimepickerModule } from './time-picker/timepicker.module';
import { HxaToastrComponent } from './toastr/hxa-toastr.component';
import { HxaToastrModule } from './toastr/hxa-toastr.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { TypeaheadModule } from './typeahead/typeahead.module';
import { OnlineStatusService } from './utils/services/online-status.service';

export const mask_options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  imports: [
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabularModule.forRoot(),
    SelectizeModule.forRoot(),
    DatepickerModule.forRoot(),
    DateRangePickerModule.forRoot(),
    AutoGrowModule.forRoot(),
    EmptyStateModule.forRoot(),
    AccordionModule,
    FiltersModule.forRoot(),
    LoadersModule,
    TextInputModule,
    NgxMaskModule.forRoot(mask_options),
    DialogModule.forRoot(),
    InspectorModule.forRoot(),
    LineClampModule,
    TimepickerModule,
    ToastrModule.forRoot({
      toastComponent: HxaToastrComponent,
      toastClass: 'hxa-toastr',
      iconClasses: {
        error: 'is-danger',
        info: 'is-info',
        success: 'is-success',
        warning: 'is-warning',
      },
    }),
  ],
  exports: [
    DatepickerModule,
    DateRangePickerModule,
    DropdownModule,
    ModalModule,
    PaginationModule,
    TabsModule,
    TooltipModule,
    TypeaheadModule,
    TabularModule,
    SelectizeModule,
    AutoGrowModule,
    EmptyStateModule,
    AccordionModule,
    FiltersModule,
    LoadersModule,
    TextInputModule,
    NgxMaskModule,
    DialogModule,
    LineClampModule,
    InspectorModule,
    TimepickerModule,
    HxaToastrModule,
  ],
})
export class HxUiModule {
  public static forRoot(): ModuleWithProviders<HxUiModule> {
    return {
      ngModule: HxUiModule,
      providers: [
        ModalService,
        OnlineStatusService,
        DatePipe,
        DialogService,
        InspectorService,
      ],
    };
  }
}
