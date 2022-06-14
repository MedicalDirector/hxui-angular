import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextInputDirective } from './text-input.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TextInputDirective],
  exports: [TextInputDirective],
})
export class TextInputModule {}
