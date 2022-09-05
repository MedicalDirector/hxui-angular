import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextInputModule, TypeaheadModule } from '@hxui/angular';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleBasicTypeaheadComponent } from './example/basic-typeahead.component';
import { ExamplePredefinedTypeaheadComponent } from './example/predefined-typeahead.component';
import { PageTypeaheadComponent } from './page-typeahead.component';

@NgModule({
  declarations: [
    PageTypeaheadComponent,
    ExampleBasicTypeaheadComponent,
    ExamplePredefinedTypeaheadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageTypeaheadComponent,
      },
    ]),
    SharedModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    OverlayModule,
    TextInputModule,
    NgxMaskModule.forRoot(),
  ],
})
export class PageTypeaheadModule {}
