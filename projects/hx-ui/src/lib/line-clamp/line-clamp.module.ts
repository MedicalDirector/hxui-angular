import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LineClampComponent} from './line-clamp.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LineClampComponent
  ],
  exports: [
    LineClampComponent
  ]
})
export class LineClampModule { }
