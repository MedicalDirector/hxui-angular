import { Component, Input } from '@angular/core';

@Component({
  selector: 'hx-accordion, hxa-accordion',
  template: `
    <div class="hxui-reset">
      <ul class="hx-accordion" [ngClass]="cssClass">
        <ng-content></ng-content>
      </ul>
    </div>
  `
})
export class AccordionComponent {
  @Input() cssClass?: string = null;
}
