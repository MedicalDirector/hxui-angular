import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll';
import { DOCUMENT } from '@angular/common';
import { CoreBaseComponent } from '../core-base.component';
import { TooltipsCode } from './tooltips.code';
import {Context} from '../../../../projects/hx-ui/src/lib/enums';
import {BreakpointsService} from '../../../../projects/hx-ui/src/lib/utils/breakpoint.service';


@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class TooltipsComponent extends CoreBaseComponent implements OnInit {

  @ViewChild('toolTipContent') toolTipContent: ElementRef;

  code = new TooltipsCode();
  private _dynamicTooltipText = 'sample text';

  public contextEnum = Context;
  public tooltipTemplateHtml = '';

  public get dynamicTooltipText(): string {
    return this._dynamicTooltipText;
  }

  public set dynamicTooltipText(txt: string) {
    this._dynamicTooltipText = txt;
  }

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointsService: BreakpointsService,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointsService, document);
  }

  ngOnInit() {
    this.tooltipTemplateHtml = this.toolTipContent.nativeElement.innerHTML;
  }
}
