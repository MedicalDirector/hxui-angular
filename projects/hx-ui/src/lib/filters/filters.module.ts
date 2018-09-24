import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import {FiltersConfig} from './filters.config';
import {DropdownModule} from '../dropdown/dropdown.module';
import {FiltersCollapsedComponent} from './filters-collapsed.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
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
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: FiltersModule,
      providers: [FiltersConfig]
    };
  };
}
