import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TextInputModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageTextInputComponent } from './page-text-input.component';

@NgModule({
  declarations: [PageTextInputComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageTextInputComponent,
      },
    ]),
    SharedModule,
    TextInputModule,
  ],
})
export class PageTextInputModule {}
