import { Component } from "@angular/core";

@Component({
    selector: 'hx-accordion, hxa-accordion',
    template: `
    <div class="hxui-reset">
        <ul class="hx-accordion">
            <ng-content></ng-content>
        </ul>
    </div>`
})
export class AccordionComponent {
}