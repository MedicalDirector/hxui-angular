import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule } from '../dropdown/dropdown.module';
import { PaginationModule } from '../pagination/pagination.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { SimpleSearchPipe } from '../utils/pipes/simple-search.pipe';
import { TabularContentService } from './tabular-content.service';
import { TabularSortByService } from './tabular-sort-by.service';
import { TabularComponent } from './tabular.component';
import { TabularConfig } from './tabular.config';

@NgModule({
  declarations: [TabularComponent, SimpleSearchPipe],
  imports: [
    CommonModule,
    RouterModule,
    PaginationModule,
    TooltipModule,
    DropdownModule,
    FormsModule,
    ScrollingModule
  ],
  providers: [TabularSortByService, TabularConfig, TabularContentService],
  exports: [TabularComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabularModule {
  public static forRoot(): ModuleWithProviders<TabularModule> {
    return {
      ngModule: TabularModule,
      providers: [TabularSortByService, TabularConfig, TabularContentService]
    };
  }
}
