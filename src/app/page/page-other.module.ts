import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { SharedModule } from '../shared/shared.module';
import { PageInstallGuideComponent } from './install-guide/page-install-guide.component';
import { PageMigrateV13Component } from './migrate-v13/page-migrate-v13.component';
import { PageNotFoundComponent } from './not-found/page-not-found.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    PageInstallGuideComponent,
    PageMigrateV13Component,
  ],
  imports: [HighlightModule, CommonModule, SharedModule],
  exports: [
    PageNotFoundComponent,
    PageInstallGuideComponent,
    PageMigrateV13Component,
  ],
})
export class PageOtherModule {}
