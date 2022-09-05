import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnlineStatusService } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicOnlineStatusComponent } from './example/basic-online-status.component';
import { PageOnlineStatusComponent } from './page-online-status.component';

@NgModule({
  declarations: [PageOnlineStatusComponent, ExampleBasicOnlineStatusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageOnlineStatusComponent,
      },
    ]),
    SharedModule,
  ],
  providers: [OnlineStatusService],
})
export class PageOnlineStatusModule {}
