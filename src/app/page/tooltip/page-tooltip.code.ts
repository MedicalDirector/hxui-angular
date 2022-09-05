import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageTooltipCode {
  usage: Code = {
    lang: ['ts'],
    text: `import { TooltipsModule } from "@hxui/angular";

@NgModule({
  imports: [
    TooltipsModule.forRoot(),
    ...
  ]
})
export class AppModule {}
`,
  };

  egBasic = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';
import { Context } from '@hxui/angular';

@Component({
  selector: 'app-myfeature',
  template: \`
    <p>
      Here is an example of a link with a tooltip that has a top placement
      <a
        href="#"
        hxTooltip="my tooltip message is here"
        [disabled]="false"
        placement="top"
        >tooltip</a
      >. You can also have tooltips appear on the
      <a
        href="#"
        hxTooltip="my tooltip showing on the right"
        [disabled]="false"
        placement="right"
        >right</a
      >
      or on the
      <a
        href="#"
        hxTooltip="my tooltip showing on the left"
        [disabled]="false"
        placement="left"
        >left</a
      >.
    </p>

    <p>
      You can set the context (colour) of the tooltip to
      <a
        href
        hxTooltip="Success!"
        placement="bottom"
        [context]="eContext.Success"
        >success</a
      >,
      <a
        href
        hxTooltip="Warning!"
        placement="bottom"
        [context]="eContext.Warning"
        >warning</a
      >, or
      <a
        href
        hxTooltip="Danger!"
        placement="bottom"
        [context]="eContext.Danger"
        >danger</a
      >.
    </p>
  \`,
})
export class MyFeatureComponent {
  eContext = Context;
}
`,
  };

  egCustom = {
    lang: ['ts'],
    text: `import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-myfeature',
  template: \`
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
  \`,
})
export class MyFeatureComponent implements OnInit {

  @ViewChild('toolTipContent') toolTipContent: ElementRef;

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
`,
  };
}
