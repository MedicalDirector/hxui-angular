import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'eg-basic-datepicker',
  template: `
    <form [formGroup]="basicForm">
      <hxa-datepicker-input
        placement="bottom"
        [defaultToPresentDate]="false"
        formControlName="date"
        (dateChange)="onDateChanged($event)"
        [required]="true"
      ></hxa-datepicker-input>
      <div>
        <span>
          Emitted Date object:
          <b>{{ basicForm.get('date').value }}</b>
        </span>
        <br />
        <span>
          NgForm Status: <b>{{ basicForm.status }}</b>
        </span>
        <br />
        <span>
          NgForm Valid: <b>{{ basicForm.valid }}</b>
        </span>
        <br />
        <span>
          NgForm Touched: <b>{{ basicForm.touched }}</b>
        </span>
        <br />
      </div>
    </form>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleBasicDatepickerComponent implements OnInit {
  basicForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.basicForm = this._fb.group({
      date: [null],
    });
  }

  onDateChanged($event: Event) {
    console.log(this.basicForm.get('date').value, $event);
  }

  reset() {
    this.basicForm.reset();
  }
}
