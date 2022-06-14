import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionBodyComponent } from './accordion.body';
import { AccordionComponent } from './accordion.component';
import { AccordionContainerComponent } from './accordion.container.component';
import { AccordionHeaderComponent } from './accordion.header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AccordionComponent,
    AccordionContainerComponent,
    AccordionHeaderComponent,
    AccordionBodyComponent,
  ],
  exports: [
    AccordionComponent,
    AccordionContainerComponent,
    AccordionHeaderComponent,
    AccordionBodyComponent,
  ],
})
export class AccordionModule {}
