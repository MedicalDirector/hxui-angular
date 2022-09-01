import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageToastComponent } from './page-toast.component';

@NgModule({
  declarations: [PageToastComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageToastComponent,
      },
    ]),
    SharedModule,
  ],
})
export class PageToastModule {}
