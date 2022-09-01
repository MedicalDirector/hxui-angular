import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DateRangePickerConfig,
  DropdownModule,
  FiltersModule,
} from '@hxui/angular';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleFilterNewComponent } from './example/filter-new.component';
import { ExampleFilterOldComponent } from './example/filter-old.component';
import { PageFilterComponent } from './page-filter.component';

@NgModule({
  declarations: [
    PageFilterComponent,
    ExampleFilterNewComponent,
    ExampleFilterOldComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageFilterComponent,
      },
    ]),
    FiltersModule.forRoot(),
    DropdownModule.forRoot(),
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [DatePipe, DateRangePickerConfig],
})
export class PageFilterModule {}
