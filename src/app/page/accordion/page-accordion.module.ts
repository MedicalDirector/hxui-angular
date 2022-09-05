import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicAccordionComponent } from './example/basic-accordion.component';
import { ExampleCustomAccordionComponent } from './example/custom-accordion.component';
import { PageAccordionComponent } from './page-accordion.component';

@NgModule({
  declarations: [
    PageAccordionComponent,
    ExampleBasicAccordionComponent,
    ExampleCustomAccordionComponent,
  ],
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
