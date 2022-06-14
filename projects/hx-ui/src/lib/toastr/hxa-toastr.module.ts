import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { HxaToastrComponent } from './hxa-toastr.component';

@NgModule({
  imports: [ToastrModule, CommonModule],
  declarations: [HxaToastrComponent],
  exports: [HxaToastrComponent],
})
export class HxaToastrModule {}
