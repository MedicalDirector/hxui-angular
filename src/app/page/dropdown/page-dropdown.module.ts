import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicDropdownComponent } from './example/basic-dropdown.component';
import { ExampleClippathDropdownComponent } from './example/clippath-dropdown.component';
import { ExampleManualDropdownComponent } from './example/manual-dropdown.component';
import { ExampleMaxDropdownComponent } from './example/max-dropdown.component';
import { PageDropdownComponent } from './page-dropdown.component';

@NgModule({
  declarations: [
    PageDropdownComponent,
    ExampleBasicDropdownComponent,
    ExampleMaxDropdownComponent,
    ExampleManualDropdownComponent,
    ExampleClippathDropdownComponent,
  ],
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
