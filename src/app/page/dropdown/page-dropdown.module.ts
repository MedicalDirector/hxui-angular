import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageDropdownComponent } from './page-dropdown.component';

@NgModule({
  declarations: [PageDropdownComponent],
  imports: [
    CommonModule,
    OverlayModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageDropdownComponent,
      },
    ]),
    DropdownModule.forRoot(),
    SharedModule,
  ],
})
export class PageDropdownModule {}
