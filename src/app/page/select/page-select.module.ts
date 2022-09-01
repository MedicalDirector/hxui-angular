import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageSelectComponent } from './page-select.component';

@NgModule({
  declarations: [PageSelectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageSelectComponent,
      },
    ]),
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class PageSelectModule {}
