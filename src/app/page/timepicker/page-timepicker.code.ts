import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageTimepickerCode {
  usage: Code = {
    lang: ['ts'],
    text: `import { TimepickerModule } from "@hxui/angular";

@NgModule({
  imports: [
    TimepickerModule, 
    ...
  ]
})
export class AppModule {}
`,
  };

  egBasicHTML: Code = {
    lang: ['xml'],
    text: `<form [formGroup]="form">
  <hxa-timepicker
    formControlName="time"
    [meridian]="true"
    size="medium"
    [spinners]="true"
    [seconds]="false"
  ></hxa-timepicker>
</form>
<p>Form value object: <b>{{ form.get("time").value | json }}</b></p>
`,
  };

  egBasicTS: Code = {
    lang: ['ts'],
    text: `import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HxaTime } from '@hxui/angular';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myapp.component.html'
})
export class MyFeatureComponent implements OnInit {

  form: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      time: [new HxaTime(16, 0, 0), Validators.required],
    });
  }
}
`,
  };
}
