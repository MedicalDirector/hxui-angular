import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabsModule } from '@hxui/angular';
import { HighlightModule } from 'ngx-highlightjs';
import { PageBaseModule } from './page-base/page-base.module';

@NgModule({
  imports: [
    CommonModule,
    HighlightModule,
    TabsModule.forRoot(),
    PageBaseModule,
  ],
  exports: [HighlightModule, TabsModule, PageBaseModule],
})
export class SharedModule {}
