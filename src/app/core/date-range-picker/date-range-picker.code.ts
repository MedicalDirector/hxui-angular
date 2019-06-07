export class DateRangePickersCode {

    usage =
      `
      import { DateRangePickerModule } from "@hxui/angular";
  
      @NgModule({
        imports: [DateRangePickerModule.forRoot(), ...]
      })
      export class AppModule() {}
      `;
  
    exampleTemplateforcustomtab =
      `
      <hxa-date-range-picker 
      [displayMode]=2 
      (onDateRangeSelected)="getSelectedDateRange($event)">
      </hxa-date-range-picker>
      `;
  
    exampleTypescriptforcustomtab =
      `
      import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
      import { CoreBaseComponent } from '../core-base.component';
  
      @Component({
        selector: 'app-date-range-picker',
        templateUrl: './date-range-picker.component.html'
      })
      export class DateRangePickerComponent extends CoreBaseComponent {
      
        selectedDateRange: DateRange = {fromDate:new Date(), toDate:new Date()};
      
        constructor() { 
        }    
      }

      getSelectedDateRange(dateRange: DateRange){
        this.selectedDateRange = dateRange;
    }
  
      `;

      exampleTemplateforintervaltab =
      `
      <hxa-date-range-picker 
      [displayMode]=3 
      [intervalOptions]="intervalOptions" 
      [defaultDateRange]="defaultDateRange"
      (onDateRangeSelected)="getSelectedDateRange($event)">
      </hxa-date-range-picker>
      `;
  
    exampleTypescriptforintervaltab =
      `
      import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
      import { CoreBaseComponent } from '../core-base.component';
  
      @Component({
        selector: 'app-date-range-picker',
        templateUrl: './date-range-picker.component.html'
      })
      export class DateRangePickerComponent extends CoreBaseComponent {
      
        selectedDateRange: DateRange = {fromDate:new Date(),toDate:new Date()};

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
          'Next Fortnight'
        ];
      
        constructor() { }    
      }

      defaultDateRange = {fromDate:new Date('01/06/2018'), toDate: new Date('02/06/2018')};

      getSelectedDateRange(dateRange: DateRange){
        this.selectedDateRange = dateRange;
    }
  
      `;
  
      exampleTemplatefortabs =
      `
      <hxa-date-range-picker 
      [intervalOptions]="intervalOptions" 
      [displayMode]=1 
      [dateFormat]="dateFormat" 
      (onDateRangeSelected)="getSelectedDateRange($event)">
      </hxa-date-range-picker>
      `;
  
      exampleTypescriptfortabs =
      `
      import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
      import { CoreBaseComponent } from '../core-base.component';
  
      @Component({
        selector: 'app-date-range-picker',
        templateUrl: './date-range-picker.component.html'
      })
      export class DateRangePickerComponent extends CoreBaseComponent {
      
        selectedDateRange: DateRange = {fromDate:new Date(),toDate:new Date()};

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
          'Next Fortnight'
        ];

        dateFormat = "yyyy-MM-dd";
      
        constructor() { }    
      }

      getSelectedDateRange(dateRange: DateRange){
        this.selectedDateRange = dateRange;
    }
  `;
  }