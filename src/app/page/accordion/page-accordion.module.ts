import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageAccordionComponent } from './page-accordion.component';

@NgModule({
  declarations: [PageAccordionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageAccordionComponent,
      },
    ]),
    AccordionModule,
    SharedModule,
  ],
})
export class PageAccordionModule {}
