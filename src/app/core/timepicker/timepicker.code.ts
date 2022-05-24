export class TimepickerCode {
  usage = `
  import { TimepickerModule } from "@hxui/angular";

  @NgModule({
    imports: [TimepickerModule, ...]
  })
  export class AppModule() {}
  `;

  exampleTemplate = `
  <form [formGroup]="form">
    <hxa-datepicker-input
      formControlName="time"
      [meridian]="true"
      size="medium"
      [spinners]="true"
      [seconds]="false"
    ></hxa-datepicker-input>
  </form>
  <p>Form value object: <b>{{ form.get("time").value | json }}</b></p>
  `;

  exampleTypescript = `
  import { Component } from '@angular/core';
  import { FormBuilder, Validators } from '@angular/forms';
  import { HxaTime } from '@hxui/angular

  @Component({
    selector: 'app-myapp',
    templateUrl: './myapp.component.html'
  })
  export class MyAppComponent {
  
    public form = this.fb.group({
      time: [new HxaTime(16, 0, 0), Validators.required]
    });
  
    constructor(
      private fb: FormBuilder
    ) {}
  }
  `;
}
