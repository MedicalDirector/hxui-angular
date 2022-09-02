import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en-AU';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { PageOtherModule } from './page/page-other.module';
import { SidebarComponent } from './sidebar/sidebar.component';

registerLocaleData(localeEn, 'en-AU');

@NgModule({
  declarations: [AppComponent, SidebarComponent],
  imports: [CoreModule.forRoot(), PageOtherModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
