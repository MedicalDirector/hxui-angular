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
   <hxa-empty-state  icon="icon-medications" [msg]="emptyStateMsg" [actions]="emptyStateActions"></hxa-empty-state>
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
      emptyStateActions: IEmptyStateAction[] = [
        {
          id: 'currentNotTakingMedsBtn',
          label: 'Not taking any medications',
          css: '',
          callback: [this.onNotTakingMeds]
        },
        {
          id: 'currentAddMedsBtn',
          label: 'Add current medication',
          css: 'is-primary',
          callback: [this.onAddMeds]
        }];
    
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
