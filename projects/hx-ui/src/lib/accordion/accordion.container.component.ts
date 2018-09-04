import { Component, ChangeDetectorRef, Input } from "@angular/core";
import { state, style, transition, animate, trigger } from "@angular/animations";

@Component({
    selector: 'hx-accordion-container, hxa-accordion-container',
    template: `    
    <li class="hx-accordion-container">
        <a class="hx-accordion-header" (click)="toggle()">
            <div class="header-title"><ng-content select="hx-accordion-header, hxa-accordion-header"></ng-content></div>
            <div class="header-icon">
                <i class="hx-icon is-small icon-angle-down" *ngIf="!expanded"></i>
                <i class="hx-icon is-small icon-angle-up" *ngIf="expanded"></i>
            </div>
        </a>
        <div class="hx-accordion-body" [@slideIn]="expanded" *ngIf="expanded">
            <div class="hx-accordion-body-wrapper">
                <ng-content select="hx-accordion-body, hxa-accordion-body"></ng-content>
            </div>
        </div>
    </li>
`,
    styleUrls: ['./accordian.container.scss'],
    animations: [
        trigger('slideIn', [
            state('*', style({ 'overflow-y': 'hidden' })),
            state('void', style({ 'overflow-y': 'hidden' })),
            transition('* => void', [
                style({ height: '*' }),
                animate(250, style({ height: 0, opacity: 0 }))
            ]),
            transition('void => *', [
                style({ height: '0' }),
                animate(250, style({ height: '*', opacity: 1 }))
            ])
        ])
    ]
})
export class AccordionContainerComponent {
    @Input() expanded: boolean = true;

    constructor(private _changeDetectionRef: ChangeDetectorRef) { }

    public toggle(): void {
        this.expanded = !this.expanded;
        this._changeDetectionRef.markForCheck();
    }
}