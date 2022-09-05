import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'eg-basic-toast',
  template: `
    <p>No titles</p>

    <div class="hx-columns">
      <div class="hx-column">
        <button class="hx-button is-primary" (click)="showSuccess()">
          Show success
        </button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-danger" (click)="showError()">
          Show error
        </button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-warning" (click)="showWarning()">
          Show warning
        </button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-info" (click)="showInfo()">
          Show info
        </button>
      </div>
    </div>

    <hr />

    <p>With titles</p>

    <div class="hx-columns">
      <div class="hx-column">
        <button class="hx-button is-primary" (click)="showSuccess('Success')">
          Show success
        </button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-danger" (click)="showError('Error')">
          Show error
        </button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-warning" (click)="showWarning('Warning')">
          Show warning
        </button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-info" (click)="showInfo('Informative')">
          Show info
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleBasicToastComponent {
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
