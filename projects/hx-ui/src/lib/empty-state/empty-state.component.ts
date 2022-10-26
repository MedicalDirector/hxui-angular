import { Component, Input, OnInit } from '@angular/core';
import { IEmptyStateAction } from './empty-state-action.interface';
import { EmptyStateConfig } from './empty-state.config';

@Component({
  selector: 'hxa-empty-state',
  templateUrl: './empty-state.component.html',
  styles: [
    ':host { min-height: 12rem; width:100%; display:flex; flex-direction: column; flex:1;}',
    ':host .emptyState { display:flex; flex-direction: column; justify-content: center; align-items: center; flex:1; margin: 1rem 0; }',
    ':host .emptyState__icon { height:3.5rem; width:3.5rem; font-size:64px; margin: 1rem; }',
    ':host .emptyState__msg::ng-deep > * { margin: 1rem; font-size: 1rem; font-weight: 400 }',
    ':host .emptyState__actions{ margin: 1.5rem 1rem ; }',
    ':host .emptyState__actions::ng-deep .hx-button { margin: 0 .5rem; }',
  ],
})
export class EmptyStateComponent implements OnInit {
  @Input() icon: string;
  @Input() msg: string;
  @Input() headingLevel?: number;
  @Input() actions: IEmptyStateAction[] = [];
  msgElement: string;

  constructor(private config: EmptyStateConfig) {}

  ngOnInit() {
    this.buildMsgElement();
  }

  /**
   * Calls the parsed callback with optional arguments
   * @param event
   * @param cb
   */
  executeCallback(event: any, cb: any[]) {
    if (cb.length) {
      if (cb.length === 1) {
        // if callback has no arguments
        cb[0]();
      } else {
        // if callback has 1 or more arguments
        const args: any[] = [];
        for (let i = 1; i < cb.length; i++) {
          args.push(cb[i]);
        }
        cb[0].apply(this, args);
      }
    }
    return false;
  }

  private buildMsgElement(): void {
    const isValidHeadingLevel = this.headingLevel && this.headingLevel < 7;
    const msgClasses = 'class="is-lighter"';

    this.msgElement = isValidHeadingLevel
      ? `<h${this.headingLevel} ${msgClasses}>${this.msg}</h${this.headingLevel}>`
      : `<p ${msgClasses}>${this.msg}</p>`;
  }
}
