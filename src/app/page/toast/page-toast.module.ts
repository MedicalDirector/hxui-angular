import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicToastComponent } from './example/basic-toast.component';
import { PageToastComponent } from './page-toast.component';

@NgModule({
  declarations: [PageToastComponent, ExampleBasicToastComponent],
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
