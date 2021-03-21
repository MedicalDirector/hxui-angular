export class DatepickersCode {

  usage =
    `
    import { DatepickerModule } from "@hxui/angular";

    @NgModule({
      imports: [DatepickerModule.forRoot(), ...]
    })
    export class AppModule() {}
    `;

  exampleTemplate =
    `
    <form [formGroup]="basicForm">
            <hxa-datepicker-input
              name="datepicker_basic"
              align="bottom"
              [defaultToPresentDate]="false"
              formControlName="dayte_basic"
              (onDateChange)="onDateChangedBasic($event)"
              [required]="false"
            ></hxa-datepicker-input>
            <div>
              <span>Emitted Date object: <b>{{basicForm.get('dayte_basic').value}}</b></span><br>
              <span>NgForm Status: <b>{{basicForm.status}}</b></span> <br>
              <span>NgForm Valid: <b>{{basicForm.valid}}</b></span> <br>
              <span>NgForm Touched: <b>{{basicForm.touched}}</b></span><br>
            </div>
        </form>
    `;

  exampleTypescript =
    `
    import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
    import { CoreBaseComponent } from '../core-base.component';

    @Component({
      selector: 'app-datepickers',
      templateUrl: './datepickers.component.html'
    })
    export class DatepickersComponent {
    
     basicForm = this.fb.group({
        dayte_basic: [null]
      });
    
      intervalForm = this.fb.group({
        dayte: [null],
      });
    
      constructor(private fb: FormBuilder) {
      }
    
      onDateChangedBasic($event) {
        console.log(this.dayte_basic, $event);
      }
   
    }

    `;

  intervalExampleTemplate =
    `
    <form [formGroup]="intervalForm">
          <hxa-datepicker-input
            name="datepicker"
            align="bottom"
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
    `;

  intervalExampleTypescript =
    `
    import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
    import { CoreBaseComponent } from '../core-base.component';

    @Component({
      selector: 'app-datepickers',
      templateUrl: './datepickers.component.html'
    })
    export class DatepickersComponent  {
    
      basicForm = this.fb.group({
        dayte_basic: [null]
      });
    
      intervalForm = this.fb.group({
        dayte: [null],
      });
    
      constructor(private fb: FormBuilder) {
      }
    
      onDateChanged($event) {
        console.log(this.dayte, $event);
      } 
    }

    `;
}
