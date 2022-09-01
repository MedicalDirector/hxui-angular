import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageDatepickerCode {
  usage: Code = {
    lang: ['ts'],
    text: `import { DatepickerModule } from "@hxui/angular";

@NgModule({
  imports: [
    DatepickerModule.forRoot(),
    ...
  ]
})
export class AppModule {}
`,
  };

  usageLazy: Code = {
    lang: ['ts'],
    text: `import { NgxMaskModule } from "ngx-mask";

@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
    ...
  ]
})
export class LazyFeatureModule {}
`,
  };

  egBasicHTML: Code = {
    lang: ['xml'],
    text: `<form [formGroup]="basicForm">
  <hxa-datepicker-input
    name="datepicker_basic"
    placement="bottom"
    [defaultToPresentDate]="false"
    formControlName="dayte_basic"
    (dateChange)="onDateChangedBasic($event)"
    [required]="false"
  ></hxa-datepicker-input>
  <div>
    <span>Emitted Date object: <b>{{basicForm.get('dayte_basic').value}}</b></span><br>
    <span>NgForm Status: <b>{{basicForm.status}}</b></span> <br>
    <span>NgForm Valid: <b>{{basicForm.valid}}</b></span> <br>
    <span>NgForm Touched: <b>{{basicForm.touched}}</b></span><br>
  </div>
</form>
`,
  };

  egBasicTS: Code = {
    lang: ['ts'],
    text: `import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html'
})
export class MyFeatureComponent implements OnInit {

  basicForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.basicForm = this._fb.group({
      dayte_basic: [null]
    });
  }

  onDateChangedBasic($event: Event) {
    console.log(this.basicForm.get('dayte_basic').value, $event);
  }
}
`,
  };

  egIntervalHTML: Code = {
    lang: ['xml'],
    text: `<form [formGroup]="intervalForm">
  <hxa-datepicker-input
    name="datepicker"
    placement="bottom"
    [interval]="true"
    formControlName="dayte"
    [allowPreviousDates]="true"
  ></hxa-datepicker-input>
  <div>
    <span>Emitted Date object: <b>{{intervalForm.get('dayte').value}}</b></span><br>
    <span>NgForm Status: <b>{{intervalForm.status}}</b></span> <br>
    <span>NgForm Valid: <b>{{intervalForm.valid}}</b></span> <br>
    <span>NgForm Touched: <b>{{intervalForm.touched}}</b></span><br>
  </div>
</form>
`,
  };

  egIntervalTS: Code = {
    lang: ['ts'],
    text: `import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html'
})
export class MyFeatureComponent implements OnInit {

  intervalForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.intervalForm = this._fb.group({
      dayte: [null],
    });
  }

  onDateChanged($event: Event) {
    console.log(this.intervalForm.get('dayte').value, $event);
  }
}
`,
  };
}
