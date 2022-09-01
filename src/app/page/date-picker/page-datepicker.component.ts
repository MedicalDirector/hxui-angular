import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contents } from '../../shared/page-base/page-base.model';
import { PageDatepickerCode } from './page-datepicker.code';

@Component({
  selector: 'app-page-datepicker',
  templateUrl: './page-datepicker.component.html',
  styles: [':host { display: contents; }'],
})
export class PageDatepickerComponent implements OnInit {
  code = new PageDatepickerCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'Interval example', link: 'example-interval' },
    { text: 'API Reference', link: 'api' },
  ];

  basicForm: FormGroup;
  intervalForm: FormGroup;

  dateFormat = 'yyyy-MM-dd';

  intervalOptions: string[] = [
    'Today',
    'Yesterday',
    'Tomorrow',
    'Last Year',
    'Next Year',
    'Last Month',
    'Next Month',
    'Last Week',
    'Next Week',
    'Last Fortnight',
    'Next Fortnight',
  ];

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.basicForm = this._fb.group({
      dayte_basic: [null, Validators.required],
    });

    this.intervalForm = this._fb.group({
      dayte: [null],
    });
  }

  onDateChangedBasic($event: Event) {
    console.log(this.basicForm.get('dayte_basic').value, $event);
  }

  onDateChanged($event: Event) {
    console.log(this.intervalForm.get('dayte').value, $event);
  }

  reset() {
    this.basicForm.reset();
    this.intervalForm.reset();
  }
}
