import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'eg-interval-datepicker',
  template: `
    <form [formGroup]="intervalForm">
      <hxa-datepicker-input
        placement="bottom"
        [interval]="true"
        formControlName="date"
        [required]="true"
        [allowPreviousDates]="true"
      ></hxa-datepicker-input>
      <div>
        <span>
          Emitted Date object:
          <b>{{ intervalForm.get('date').value }}</b>
        </span>
        <br />
        <span>
          NgForm Status: <b>{{ intervalForm.status }}</b>
        </span>
        <br />
        <span>
          NgForm Valid: <b>{{ intervalForm.valid }}</b>
        </span>
        <br />
        <span>
          NgForm Touched: <b>{{ intervalForm.touched }}</b>
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
export class ExampleIntervalDatepickerComponent implements OnInit {
  intervalForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.intervalForm = this._fb.group({
      date: [null],
    });
  }

  onDateChanged($event: Event) {
    console.log(this.intervalForm.get('date').value, $event);
  }

  reset() {
    this.intervalForm.reset();
  }
}
