import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleCustomModalComponent } from './example/custom-modal.component';
import { PageModalComponent } from './page-modal.component';

@NgModule({
  declarations: [PageModalComponent, ExampleCustomModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageModalComponent,
      },
    ]),
    SharedModule,
    ModalModule.forRoot(),
  ],
})
export class PageModalModule {}
