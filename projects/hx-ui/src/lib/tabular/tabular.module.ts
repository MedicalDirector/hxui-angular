import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TabularComponent} from './tabular.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TabularSortByService} from './tabular-sort-by.service';
import {TabularConfig} from './tabular.config';
import {TooltipModule} from '../tooltip/tooltip.module';
import {SimpleSearchPipe} from '../utils/pipes/simple-search.pipe';
import {PaginationModule} from '../pagination/pagination.module';
import {DropdownModule} from '../dropdown/dropdown.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    TabularComponent,
    SimpleSearchPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    PaginationModule,
    TooltipModule,
    DropdownModule,
    FormsModule
  ],
  providers: [
    TabularSortByService,
    TabularConfig
  ],
  exports: [
    TabularComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class TabularModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TabularModule,
      providers: [
        TabularSortByService,
        TabularConfig
      ]
    };
  }
}


