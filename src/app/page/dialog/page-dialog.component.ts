import { Component } from '@angular/core';
import { DialogService } from '@hxui/angular';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { ExampleCustomDialogComponent } from './example/custom-dialog.component';
import { PageDialogCode } from './page-dialog.code';

@Component({
  selector: 'app-page-dialog',
  templateUrl: './page-dialog.component.html',
  styles: [':host { display: contents; }'],
})
export class PageDialogComponent {
  code = new PageDialogCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'API Reference', link: 'api' },
  ];

  constructor(private _dialogService: DialogService) {}

  openDialog() {
    this._dialogService.open(
      ExampleCustomDialogComponent,
      {},
      {
        onSuccess: data => {
          alert(data);
        },
        onCancelled: data => {
          alert(data);
        },
      }
    );
  }
}
