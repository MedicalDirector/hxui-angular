import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Context } from '@hxui/angular';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageTooltipCode } from './page-tooltip.code';

@Component({
  selector: 'app-page-tooltip',
  templateUrl: './page-tooltip.component.html',
  styles: [':host { display: contents; }'],
})
export class PageTooltipComponent implements OnInit {
  code = new PageTooltipCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Examples', link: 'example' },
    { text: 'API reference', link: 'api' },
  ];

  @ViewChild('toolTipContent', { static: true }) toolTipContent: ElementRef;

  eContext = Context;
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
