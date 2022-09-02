import { Component } from '@angular/core';
import { ModalService } from '@hxui/angular';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { ExampleCustomModalComponent } from './example/custom-modal.component';
import { PageModalCode } from './page-modal.code';

@Component({
  selector: 'app-page-modal',
  templateUrl: './page-modal.component.html',
  styles: [':host { display: contents; }'],
})
export class PageModalComponent {
  code = new PageModalCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'API reference', link: 'api' },
  ];

  constructor(private _modalService: ModalService) {}

  openModal = () => {
    this._modalService.create<ExampleCustomModalComponent>(
      ExampleCustomModalComponent,
      {
        onSuccess: data => alert(data),
        close: () => this._modalService.close(),
      }
    );
  };
}
