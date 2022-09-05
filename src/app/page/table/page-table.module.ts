import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DropdownModule,
  FiltersModule,
  PaginationModule,
  TabularModule,
  TooltipModule,
} from '@hxui/angular';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataService } from './example/data.service';
import { ExampleKitchenSinkTableComponent } from './example/kitchen-sink-table.component';
import { PageTableComponent } from './page-table.component';

@NgModule({
  declarations: [PageTableComponent, ExampleKitchenSinkTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageTableComponent,
      },
    ]),
    TabularModule.forRoot(),
    FiltersModule.forRoot(),
    PaginationModule.forRoot(),
    DropdownModule.forRoot(),
    TooltipModule.forRoot(),
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [DataService, DatePipe],
})
export class PageTableModule {}
