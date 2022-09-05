import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoGrowModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicAutogrowComponent } from './example/basic-autogrow.component';
import { PageAutoGrowComponent } from './page-autogrow.component';

@NgModule({
  declarations: [PageAutoGrowComponent, ExampleBasicAutogrowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageAutoGrowComponent,
      },
    ]),
    AutoGrowModule.forRoot(),
    SharedModule,
  ],
})
export class PageAutoGrowModule {}
