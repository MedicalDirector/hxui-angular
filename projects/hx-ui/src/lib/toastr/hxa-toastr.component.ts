import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import {Toast, ToastPackage, ToastrService} from "ngx-toastr";


@Component({
  selector: 'hxa-toastr-component',
  styles: [':host{ pointer-events: all; }'],
  template: `
    <div class="hx-alert is-elevate-2 {{ toastPackage.toastType }}">
      <span class="hx-icon-control mr-2">
        <i class="hx-icon is-medium"
        [class.icon-exclamation]="toastPackage.toastType === 'is-warning' || toastPackage.toastType === 'is-danger'"
        [class.icon-information]="toastPackage.toastType === 'is-info'"
        [class.icon-check]="toastPackage.toastType === 'is-success'"></i>
      </span>
      <span class="hx-flex-1">
        <h5 class="ma-0 pa-0 is-text-weight-boldest">{{ title }}</h5>
        <div *ngIf="message && options.enableHtml" role="alert" aria-live="polite"
             [class]="options.messageClass" [innerHTML]="message">
        </div>
        <div *ngIf="message && !options.enableHtml" role="alert" aria-live="polite"
             [class]="options.messageClass" [attr.aria-label]="message">
          {{ message }}
        </div>
      </span>
      <span class="hx-icon-control hx-flex hx-flex-align-center ml-8"  *ngIf="options.closeButton">
        <button class="hx-delete" (click)="remove()"></button>
      </span>
    </div>
  `,
  animations: [
    trigger('flyInOut', [
      state('inactive', style({ opacity: 0 })),
      transition(
        'inactive => active',
        animate(
          '300ms ease-out',
          keyframes([
            style({
              opacity: 0,
              bottom: '-15px',
              'max-height': 0,
              'max-width': 0,
              'margin-top': 0,
            }),
            style({
              opacity: 0.8,
              bottom: '-3px',
            }),
            style({
              opacity: 1,
              bottom: '0',
              'max-height': '200px',
              'margin-top': '12px',
              'max-width': '400px',
            }),
          ]),
        ),
      ),
      state(
        'active',
        style({
          bottom: '0',
          'max-height': '200px',
          'margin-top': '12px',
          'max-width': '400px',
        }),
      ),
      transition(
        'active => removed',
        animate(
          '300ms ease-out',
          keyframes([
            style({
              opacity: 1,
              transform: 'translateY(0)'
            }),
            style({
              opacity: 0,
              transform: 'translateY(25%)'
            }),
          ]),
        ),
      ),
    ]),
  ],
})
export class HxaToastrComponent extends Toast {
  // constructor is only necessary when not using AoT
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }

  close(){
    this.remove();
    console.log('you');
  }
}
