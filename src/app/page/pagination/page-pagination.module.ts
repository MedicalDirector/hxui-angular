import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PagePaginationComponent } from './page-pagination.component';

@NgModule({
  declarations: [PagePaginationComponent],
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
