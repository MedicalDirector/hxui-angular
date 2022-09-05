import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicPaginationComponent } from './example/basic-pagination.component';
import { PagePaginationComponent } from './page-pagination.component';

@NgModule({
  declarations: [PagePaginationComponent, ExampleBasicPaginationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PagePaginationComponent,
      },
    ]),
    PaginationModule.forRoot(),
    SharedModule,
    FormsModule,
  ],
})
export class PagePaginationModule {}
