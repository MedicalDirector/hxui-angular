import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TextInputModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicTextInputComponent } from './example/basic-text-input.component';
import { PageTextInputComponent } from './page-text-input.component';

@NgModule({
  declarations: [PageTextInputComponent, ExampleBasicTextInputComponent],
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
