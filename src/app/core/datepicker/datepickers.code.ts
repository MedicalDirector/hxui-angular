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
   <form #formBasic="ngForm">
      <hxa-datepicker-input
        name="datepicker_basic"
        align="bottom"
        #db="ngModel"
        [(ngModel)]="dayte_basic"
        [allowPreviousDates]="false"
        (onDateChange)="onDateChangedBasic($event)"
        [required]="true"
      ></hxa-datepicker-input>
      <div>
        <span>Emitted Date object: {{dayte_basic}}</span><br>
        <span>NgForm Valid: {{formBasic.valid}}</span> <br>
        <span>NgModel Valid: {{db.valid}}</span><br>
        <span>NgForm Touched: {{formBasic.touched}}</span><br>
        <span>NgModel Touched: {{db.touched}}</span>
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
    
      public dayte_basic: string;
    
      constructor() {
      }
    
      onDateChangedBasic($event) {
        console.log(this.dayte_basic, $event);
      }
   
    }

    `;

  intervalExampleTemplate =
    `
    <form #form="ngForm">
          <hxa-datepicker-input
            name="datepicker"
            align="bottom"
            [interval]="true"
            #d="ngModel"
            [(ngModel)]="dayte"
            [allowPreviousDates]="false"
          ></hxa-datepicker-input>
          <div>
            <span>Emitted Date object: {{dayte}}</span><br>
            <span>NgForm Valid: {{form.valid}}</span> <br>
            <span>NgModel Valid: {{d.valid}}</span><br>
            <span>NgForm Touched: {{form.touched}}</span><br>
            <span>NgModel Touched: {{d.touched}}</span>
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
    
      public dayte: string;
    
      constructor() {
      }
    
      onDateChanged($event) {
        console.log(this.dayte, $event);
      } 
    }

    `;
}
