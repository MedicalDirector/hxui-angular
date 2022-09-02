import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadersModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageLoaderComponent } from './page-loader.component';

@NgModule({
  declarations: [PageLoaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageLoaderComponent,
      },
    ]),
    LoadersModule,
    SharedModule,
  ],
})
export class PageLoaderModule {}
