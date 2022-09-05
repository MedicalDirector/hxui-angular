import { Component } from '@angular/core';

@Component({
  selector: 'eg-basic-empty-state',
  template: `
    <hxa-empty-state icon="icon-medications" [msg]="emptyStateMsg">
      <button
        class="hx-button is-small"
        id="currentNotTakingMedsBtn"
        (click)="onNotTakingMeds()"
      >
        Not taking any medications
      </button>
      <button
        class="hx-button is-small is-primary"
        id="addCurrentMedicationBtn"
        (click)="onAddMeds()"
      >
        Add current medication
      </button>
    </hxa-empty-state>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleBasicEmptyStateComponent {
  emptyStateMsg = 'No current medications have been recorded';

  onNotTakingMeds() {
    alert('Not taking medications');
  }

  onAddMeds() {
    alert('Add medication');
  }
}
