import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoGrowModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageAutoGrowComponent } from './page-autogrow.component';

@NgModule({
  declarations: [PageAutoGrowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageAutoGrowComponent,
      },
    ]),
    AutoGrowModule.forRoot(),
    SharedModule,
  ],
})
export class PageAutoGrowModule {}
