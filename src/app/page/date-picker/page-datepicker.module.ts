import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatepickerModule } from '@hxui/angular';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageDatepickerComponent } from './page-datepicker.component';

@NgModule({
  declarations: [PageDatepickerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageDatepickerComponent,
      },
    ]),
    ReactiveFormsModule,
    DatepickerModule.forRoot(),
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
})
export class PageDatepickerModule {}
