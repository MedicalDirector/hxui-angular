import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TimepickerModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageTimepickerComponent } from './page-timepicker.component';

@NgModule({
  declarations: [PageTimepickerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageTimepickerComponent,
      },
    ]),
    SharedModule,
    TimepickerModule,
    ReactiveFormsModule,
  ],
})
export class PageTimepickerModule {}
