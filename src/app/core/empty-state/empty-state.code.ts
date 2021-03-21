export class EmptyStateCode {

  usage =
    `
    import {EmptyStateModule} from "@hxui/angular";

     @NgModule({
        imports: [EmptyStateModule.forRoot(),...]
     })
     export class AppModule(){

    `;

  exampleTemplate =
  `
      <hxa-empty-state  icon="icon-medications" [msg]="emptyStateMsg">
         <button class="hx-button is-small" id="currentNotTakingMedsBtn" (click)="onNotTakingMeds()">Not taking any medications</button>
         <button class="hx-button is-small is-primary" id="addCurrentMedicationBtn" (click)="onAddMeds()">Add current medication</button>
       </hxa-empty-state>
  `;


  exampleTypescript =
  `
    import { Component, OnInit, Inject } from '@angular/core';
    import {EmptyStateCode} from './empty-state.code';
    import {IEmptyStateAction} from '@hxui/angular/empty-state/empty-state-action.interface';

    @Component({
      selector: 'app-empty-state',
      templateUrl: './empty-state.component.html'
    })
    export class EmptyStateComponent {

      emptyStateMsg = 'No current medications have been recorded';

      constructor() {}

      onNotTakingMeds() {
        alert('Not taking medications');
      }

      onAddMeds() {
        alert('Add medication');
      }

    }

  `;

}
