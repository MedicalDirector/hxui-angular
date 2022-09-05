import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'eg-custom-tooltip',
  template: `
    <p>
      You can use formatted HTML in the tooltip and you can set the width in
      pixels of the tooltip:
      <i
        class="hx-icon icon-information-outline"
        hxTooltip
        [autoClose]="false"
        placement="right"
        maxWidth="350"
      >
        <div *hxaTooltipDynamicContent>
          <div class="is-text-left pa-3">
            ENABLED FOR
            <ul>
              <li>Card payments</li>
              <li>Fully paid patient claims with EasyClaim</li>
              <li>
                Dynamic content with
                <a (click)="onClickHandler($event)">links</a>
              </li>
            </ul>
          </div>
        </div>
      </i>
    </p>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleCustomTooltipComponent implements OnInit {
  @ViewChild('toolTipContent', { static: true }) toolTipContent: ElementRef;

  tooltipTemplateHtml = '';

  private _dynamicTooltipText = 'sample text';
  get dynamicTooltipText(): string {
    return this._dynamicTooltipText;
  }
  set dynamicTooltipText(txt: string) {
    this._dynamicTooltipText = txt;
  }

  ngOnInit() {
    this.tooltipTemplateHtml = this.toolTipContent
      ? this.toolTipContent.nativeElement.innerHTML
      : '';
  }

  onClickHandler($event) {
    alert('clicked');
    $event.preventDefault();
    $event.stopPropagation();
  }
}
