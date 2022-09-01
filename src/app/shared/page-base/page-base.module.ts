import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageBaseComponent } from './page-base.component';

@NgModule({
  declarations: [PageBaseComponent],
  imports: [CommonModule, RouterModule],
  exports: [PageBaseComponent],
})
export class PageBaseModule {}
