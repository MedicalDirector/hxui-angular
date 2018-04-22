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
    <hxa-datepicker-input align="bottom" [(ngModel)]="form.date"></hxa-datepicker-input>
    `;

  exampleTypescript =
    `
    import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
    import { CoreBaseComponent } from '../core-base.component';

    @Component({
      selector: 'app-datepickers',
      templateUrl: './datepickers.component.html',
      styles: [':host { display:flex; flex: 1; min-width: 0; }']
    })
    export class DatepickersComponent extends CoreBaseComponent {
    
      dayte: string;
    
      constructor() {
        
      }    
    }

    `;
}
