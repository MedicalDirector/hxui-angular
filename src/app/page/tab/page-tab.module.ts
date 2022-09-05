import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicTabsetComponent } from './example/basic-tabset.component';
import { ExampleCustomTabsetComponent } from './example/custom-tabset.component';
import { PageTabComponent } from './page-tab.component';

@NgModule({
  declarations: [
    PageTabComponent,
    ExampleBasicTabsetComponent,
    ExampleCustomTabsetComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageTabComponent,
      },
    ]),
    SharedModule,
  ],
})
export class PageTabsModule {}
