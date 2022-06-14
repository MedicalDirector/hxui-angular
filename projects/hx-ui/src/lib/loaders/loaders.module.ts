import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadersComponent } from './loaders.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadersComponent],
  exports: [LoadersComponent],
})
export class LoadersModule {}
