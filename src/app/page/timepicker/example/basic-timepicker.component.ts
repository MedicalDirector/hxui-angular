import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HxaTime } from '@hxui/angular';

@Component({
  selector: 'eg-basic-timpicker',
  template: `
    <form [formGroup]="form">
      <div class="hx-columns">
        <div class="hx-column is-half-tablet is-one-third-desktop">
          <kbd>meridian: true</kbd>
          <br />
          <kbd>size: medium</kbd>
          <hxa-timepicker
            formControlName="time"
            [meridian]="true"
          ></hxa-timepicker>
        </div>
        <div class="hx-column is-half-tablet is-one-third-desktop">
          <kbd>meridian: true</kbd>
          <br />
          <kbd>size: small</kbd>
          <hxa-timepicker
            formControlName="time"
            size="small"
            [meridian]="true"
          ></hxa-timepicker>
        </div>
        <div class="hx-column is-half-tablet is-one-third-desktop">
          <kbd>meridian: true</kbd>
          <br />
          <kbd>size: large</kbd>
          <hxa-timepicker
            formControlName="time"
            size="large"
            [meridian]="true"
          ></hxa-timepicker>
        </div>
        <div class="hx-column is-half-tablet is-one-third-desktop">
          <kbd>meridian: false</kbd>
          <br />
          <kbd>size: small</kbd>
          <hxa-timepicker
            formControlName="time"
            size="small"
            [meridian]="false"
          ></hxa-timepicker>
        </div>
        <div class="hx-column is-half-tablet is-one-third-desktop">
          <kbd>meridian: false</kbd>
          <br />
          <kbd>size: medium</kbd>
          <br />
          <kbd>spinners: false</kbd>
          <hxa-timepicker
            formControlName="time"
            [spinners]="false"
            [meridian]="false"
          ></hxa-timepicker>
        </div>
        <div class="hx-column is-half-tablet is-one-third-desktop">
          <kbd>meridian: false</kbd>
          <br />
          <kbd>size: medium</kbd>
          <br />
          <kbd>seconds: true</kbd>
          <hxa-timepicker
            formControlName="time"
            [seconds]="true"
            [meridian]="true"
          ></hxa-timepicker>
        </div>
      </div>
    </form>
    <div>
      <span>
        Form value object:
        <b>{{ form.get('time').value | json }}</b>
      </span>
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
export class ExampleBasicTimepickerComponent implements OnInit {
  form: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      time: [new HxaTime(16, 0, 0), Validators.required],
    });
  }
}
