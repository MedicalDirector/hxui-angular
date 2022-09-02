import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageTabComponent } from './page-tab.component';

@NgModule({
  declarations: [PageTabComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageTabComponent,
      },
    ]),
    SharedModule,
  ],
})
export class PageTabsModule {}
