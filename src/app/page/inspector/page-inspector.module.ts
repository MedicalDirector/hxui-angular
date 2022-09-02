import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InspectorModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicCustomInspectorComponent } from './example/basic-custom-inspector.component';
import { PageInspectorComponent } from './page-inspector.component';

@NgModule({
  declarations: [PageInspectorComponent, ExampleBasicCustomInspectorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageInspectorComponent,
      },
    ]),
    InspectorModule.forRoot(),
    SharedModule,
    OverlayModule,
  ],
})
export class PageInspectorModule {}
