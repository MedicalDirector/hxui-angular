import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LineClampModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageLineClampComponent } from './page-line-clamp.component';

@NgModule({
  declarations: [PageLineClampComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageLineClampComponent,
      },
    ]),
    LineClampModule,
    SharedModule,
  ],
})
export class PageLineClampModule {}
