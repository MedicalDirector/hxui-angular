import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageEmptyStateCode } from './page-empty-state.code';

@Component({
  selector: 'app-page-empty-state',
  templateUrl: './page-empty-state.component.html',
  styles: [':host { display: contents; }'],
})
export class PageEmptyStateComponent {
  code = new PageEmptyStateCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'API Reference', link: 'api' },
  ];

  emptyStateMsg = 'No current medications have been recorded';

  onNotTakingMeds() {
    alert('Not taking medications');
  }

  onAddMeds() {
    alert('Add medication');
  }
}
