import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicTooltipsComponent } from './example/basic-tooltips.component';
import { ExampleCustomTooltipComponent } from './example/custom-tooltip.component';
import { PageTooltipComponent } from './page-tooltip.component';

@NgModule({
  declarations: [
    PageTooltipComponent,
    ExampleBasicTooltipsComponent,
    ExampleCustomTooltipComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageTooltipComponent,
      },
    ]),
    SharedModule,
    TooltipModule.forRoot(),
  ],
})
export class PageTooltipModule {}
