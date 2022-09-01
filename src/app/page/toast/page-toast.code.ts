import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageToastCode {
  install: Code = {
    lang: ['sh'],
    text: `npm install ngx-toastr --save`,
  };

  import: Code = {
    lang: ['scss'],
    text: `@import '~ngx-toastr/toastr'`,
  };

  usage: Code = {
    lang: ['ts'],
    text: `import { ToastrModule } from 'ngx-toastr';
import { HxaToastrComponent } from '@hxui/angular';

@NgModule({
  imports: [
    ToastrModule.forRoot({
      toastComponent: HxaToastrComponent,
      toastClass: 'hxa-toastr',
      iconClasses: {
        error: 'is-danger',
        info: 'is-info',
        success: 'is-success',
        warning: 'is-warning',
      },
    }),
    ...
  ],
})
export class AppModule {}
`,
  };

  egBasicHTML: Code = {
    lang: ['xml'],
    text: `<!-- No titles -->
<button class="hx-button is-primary" (click)="showSuccess()">
  Show success
</button>

<button class="hx-button is-danger" (click)="showError()">
  Show error
</button>

<button class="hx-button is-warning" (click)="showWarning()">
  Show warning
</button>

<button class="hx-button is-info" (click)="showInfo()">
  Show info
</button>

<!-- With titles -->
<button class="hx-button is-primary" (click)="showSuccess('Success')">
  Show success
</button>

<button class="hx-button is-danger" (click)="showError('Error')">
  Show error
</button>

<button class="hx-button is-warning" (click)="showWarning('Warning')">
  Show warning
</button>

<button class="hx-button is-info" (click)="showInfo('Informative')">
  Show info
</button>
`,
  };

  egBasicTS: Code = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html',
  styleUrls: ['./myfeature.component.scss']
})
export class MyFeatureComponent {

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
`,
  };
}
