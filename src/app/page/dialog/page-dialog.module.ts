import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule, TypeaheadModule } from '@hxui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleCustomDialogComponent } from './example/custom-dialog.component';
import { PageDialogComponent } from './page-dialog.component';

@NgModule({
  declarations: [PageDialogComponent, ExampleCustomDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageDialogComponent,
      },
    ]),
    DialogModule.forRoot(),
    OverlayModule,
    SharedModule,
    FormsModule,
    TypeaheadModule.forRoot(),
  ],
})
export class PageDialogModule {}
