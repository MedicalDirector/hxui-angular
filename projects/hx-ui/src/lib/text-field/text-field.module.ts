import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TextFieldComponent],
  exports: [TextFieldComponent]
})
export class TextFieldModule { }
