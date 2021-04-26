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
import {FiltersModule} from './filters/filters.module';
import {LoadersModule} from './loaders/loaders.module';
import {TextInputModule} from './text-input/text-input.module';
import {OnlineStatusService} from './utils/services/online-status.service';
import { DateRangePickerModule } from './date-range-picker/date-range-picker.module';
import { DatePipe } from '@angular/common';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {DialogModule} from './dialog/dialog.module';
import {DialogService} from './dialog/dialog.service';
import {LineClampModule} from './line-clamp/line-clamp.module';
import {InspectorService} from './inspector/inspector.service';
import {InspectorModule} from './inspector/inspector.module';
import {TimepickerModule} from "./time-picker/timepicker.module";
import {HxaToastrModule} from "./toastr/hxa-toastr.module";
import {ToastrModule} from "ngx-toastr";
import {HxaToastrComponent} from "./toastr/hxa-toastr.component";

export const mask_options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  imports: [
    DropdownModule.forRoot(), ModalModule.forRoot(), PaginationModule.forRoot(),
    TabsModule.forRoot(), TooltipModule.forRoot(),
    TypeaheadModule.forRoot(), TabularModule.forRoot(),
    SelectizeModule.forRoot(), DatepickerModule.forRoot(),
    DateRangePickerModule.forRoot(),
    AutoGrowModule.forRoot(), EmptyStateModule.forRoot(),
    AccordionModule, FiltersModule.forRoot(), LoadersModule,
    TextInputModule, NgxMaskModule.forRoot(mask_options),
    DialogModule.forRoot(), InspectorModule.forRoot(),
    LineClampModule, TimepickerModule,  ToastrModule.forRoot({
      toastComponent: HxaToastrComponent,
      toastClass: 'hxa-toastr',
      iconClasses: {
        error: 'is-danger',
        info: 'is-info',
        success: 'is-success',
        warning: 'is-warning',
      }
    })
  ],
  exports: [
    DatepickerModule, DateRangePickerModule, DropdownModule, ModalModule,
    PaginationModule, TabsModule, TooltipModule,
    TypeaheadModule, TabularModule, SelectizeModule,
    AutoGrowModule, EmptyStateModule, AccordionModule,
    FiltersModule, LoadersModule, TextInputModule,
    NgxMaskModule, DialogModule, LineClampModule,
    InspectorModule, TimepickerModule, HxaToastrModule
  ]
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
        InspectorService
      ]
    };
  }
}
