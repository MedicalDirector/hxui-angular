import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmptyStateModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageEmptyStateComponent } from './page-empty-state.component';

@NgModule({
  declarations: [PageEmptyStateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageEmptyStateComponent,
      },
    ]),
    EmptyStateModule.forRoot(),
    SharedModule,
  ],
})
export class PageEmptyStateModule {}
