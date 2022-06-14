import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { DateRangePickerModule } from '../date-range-picker/date-range-picker.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { FiltersCollapsedComponent } from './filters-collapsed.component';
import { FiltersComponent } from './filters.component';
import { FiltersConfig } from './filters.config';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    DateRangePickerModule,
    NgxMaskModule
  ],
  declarations: [FiltersComponent, FiltersCollapsedComponent],
  exports: [FiltersComponent, FiltersCollapsedComponent]
})
export class FiltersModule {
  public static forRoot(): ModuleWithProviders<FiltersModule> {
    return {
      ngModule: FiltersModule,
      providers: [FiltersConfig]
    };
  }
}
