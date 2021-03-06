import { Component, OnInit, Inject } from '@angular/core';
import {EmptyStateCode} from './empty-state.code';
import { PageScrollService } from 'ngx-page-scroll-core';
import {DOCUMENT} from '@angular/common';
import {CoreBaseComponent} from '../core-base.component';
import {IEmptyStateAction} from '../../../../projects/hx-ui/src/lib/empty-state/empty-state-action.interface';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class EmptyStateComponent extends CoreBaseComponent {

  code = new EmptyStateCode();
  emptyStateMsg = 'No current medications have been recorded';

  constructor(protected pageScrollService: PageScrollService,
              protected breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) protected document: any) {
    super(pageScrollService, breakpointObserver, document);
  }

  onNotTakingMeds() {
    alert('Not taking medications');
  }

  onAddMeds() {
    alert('Add medication');
  }

}
