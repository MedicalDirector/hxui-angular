import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageEmptyStateCode {
  usage: Code = {
    lang: ['ts'],
    text: `import {EmptyStateModule} from "@hxui/angular";

@NgModule({
  imports: [EmptyStateModule.forRoot(),...]
})
export class AppModule {
`,
  };

  egBasicHTML: Code = {
    lang: ['xml'],
    text: `<hxa-empty-state icon="icon-medications" [msg]="emptyStateMsg">
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
</hxa-empty-state>`,
  };

  egBasicTS: Code = {
    lang: ['ts'],
    text: `import { Component, OnInit, Inject } from '@angular/core';
import {EmptyStateCode} from './empty-state.code';
import {IEmptyStateAction} from '@hxui/angular/empty-state/empty-state-action.interface';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html'
})
export class EmptyStateComponent {

  emptyStateMsg = 'No current medications have been recorded';

  onNotTakingMeds() {
    alert('Not taking medications');
  }

  onAddMeds() {
    alert('Add medication');
  }
}
`,
  };
}
