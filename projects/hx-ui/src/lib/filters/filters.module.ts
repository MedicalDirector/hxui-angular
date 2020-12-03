import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import {FiltersConfig} from './filters.config';
import {DropdownModule} from '../dropdown/dropdown.module';
import {FiltersCollapsedComponent} from './filters-collapsed.component';
import { FormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    NgxMaskModule
  ],
  declarations: [
    FiltersComponent,
    FiltersCollapsedComponent
  ],
  exports: [
    FiltersComponent,
    FiltersCollapsedComponent
  ]
})
export class FiltersModule {
  public static forRoot(): ModuleWithProviders<FiltersModule> {
    return {
      ngModule: FiltersModule,
      providers: [FiltersConfig]
    };
  };
}
