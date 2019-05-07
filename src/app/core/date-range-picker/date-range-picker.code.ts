export class DateRangePickersCode {

    usage =
      `
      import { DateRangePickerModule } from "@hxui/angular";
  
      @NgModule({
        imports: [DateRangePickerModule.forRoot(), ...]
      })
      export class AppModule() {}
      `;
  
    exampleTemplate =
      `
      <hxa-date-range-picker [displayMode] = 2></hxa-date-range-picker>
      `;
  
    exampleTypescript =
      `
      import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
      import { CoreBaseComponent } from '../core-base.component';
  
      @Component({
        selector: 'app-datepickers',
        templateUrl: './datepickers.component.html'
      })
      export class DatepickersComponent extends CoreBaseComponent {
      
        date: string;
      
        constructor() { }    
      }
  
      `;

      exampleTemplate2 =
      `
      <hxa-date-range-picker [displayMode] = 3 [intervalOptions]=intervalOptions></hxa-date-range-picker>
      `;
  
    exampleTypescript2 =
      `
      import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
      import { CoreBaseComponent } from '../core-base.component';
  
      @Component({
        selector: 'app-datepickers',
        templateUrl: './datepickers.component.html'
      })
      export class DatepickersComponent extends CoreBaseComponent {
      
        date: string;
      
        constructor() { }    
      }
  
      `;
  
    intervalExampleTemplate =
      `
      <hxa-date-range-picker [intervalOptions]=intervalOptions [displayMode] = 1 [dateFormat]=dateFormat></hxa-date-range-picker>
      `;
  
    intervalExampleTypescript =
      `
      import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
      import { CoreBaseComponent } from '../core-base.component';
  
      @Component({
        selector: 'app-datepickers',
        templateUrl: './datepickers.component.html'
      })
      export class DatepickersComponent extends CoreBaseComponent {
      
        date: string;
      
        constructor() { }    
      }
  
      `;
  }