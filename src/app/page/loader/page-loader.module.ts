import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadersModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicLoaderComponent } from './example/basic-loader.component';
import { PageLoaderComponent } from './page-loader.component';

@NgModule({
  declarations: [PageLoaderComponent, ExampleBasicLoaderComponent],
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
