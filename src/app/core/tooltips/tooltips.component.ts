import {Component, Inject, OnInit} from '@angular/core';
import {PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';
import {CoreBaseComponent} from '../core-base.component';
import {TooltipsCode} from './tooltips.code';

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class TooltipsComponent extends CoreBaseComponent implements OnInit {

  code = new TooltipsCode();
  private _dynamicTooltipText = 'sample text';

  public get dynamicTooltipText(): string{
    return this._dynamicTooltipText;
  }

  public set dynamicTooltipText(txt: string){
    this._dynamicTooltipText = txt;
  }

  constructor(protected pageScrollService: PageScrollService,
              @Inject(DOCUMENT) protected document: any) {
    super(pageScrollService, document);
  }

  ngOnInit() {
  }

}
