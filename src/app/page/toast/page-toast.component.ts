import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageToastCode } from './page-toast.code';

@Component({
  selector: 'app-page-toast',
  templateUrl: './page-toast.component.html',
  styles: [':host { display: contents; }'],
})
export class PageToastComponent {
  code = new PageToastCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Examples', link: 'example' },
    { text: 'API reference', link: 'api' },
  ];

  constructor(private _toast: ToastrService) {}

  showSuccess(title?: string) {
    this._toast.success('The action performed was successful.', title, {
      closeButton: true,
      disableTimeOut: true,
    });
  }

  showError(title?: string) {
    this._toast.error('An issue occurred with the action performed.', title);
  }

  showInfo(title?: string) {
    this._toast.info(
      "Notice, this notice you should notice it's worth noticing.",
      title
    );
  }

  showWarning(title?: string) {
    this._toast.warning(
      'Performing this action could have consequence.',
      title
    );
  }
}
