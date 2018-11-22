import { Component, OnInit, Inject } from '@angular/core';
import {EmptyStateCode} from './empty-state.code';
import {PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {CoreBaseComponent} from '../core-base.component';
import {IEmptyStateAction} from '../../../../projects/hx-ui/src/lib/empty-state/empty-state-action.interface';
import {BreakpointsService} from '../../../../projects/hx-ui/src/lib/utils/breakpoint.service';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class EmptyStateComponent extends CoreBaseComponent {

  code = new EmptyStateCode();
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

  constructor(protected pageScrollService: PageScrollService,
              protected breakpointsService: BreakpointsService,
              @Inject(DOCUMENT) protected document: any) {
    super(pageScrollService, breakpointsService, document);
  }

  onNotTakingMeds() {
    alert('Not taking medications');
  }

  onAddMeds() {
    alert('Add medication');
  }

}
