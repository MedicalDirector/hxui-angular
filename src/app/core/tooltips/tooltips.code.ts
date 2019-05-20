export class TooltipsCode {

  usage =
    `
    import {TooltipsModule} from "@hxui/angular";

    @NgModule({
      imports: [TooltipsModule.forRoot(),...]
    })
    export class AppModule(){}
    `;

  exampleTemplate =
    `
    <p>Here is an example of a link with a tooltip that has a top placement
      <a href="#" hxTooltip="my tooltip message is here" [disabled]="false" placement="top">tooltip</a>. You can also have tooltips appear on the
      <a href="#" hxTooltip="my tooltip showing on the right" [disabled]="false"  placement="right">right</a> or on the
      <a href="#" hxTooltip="my tooltip showing on the left" [disabled]="false"  placement="left">left</a>.
    </p>


    <p>You can set the context (colour) of the tooltip to
      <a href hxTooltip="Success!" placement="bottom" [context]="contextEnum.Success">success</a>,
      <a href hxTooltip="Warning!" placement="bottom" [context]="contextEnum.Warning">warning</a>, or
      <a href hxTooltip="Danger!"  placement="bottom" [context]="contextEnum.Danger">danger</a>.
    </p>

    <p>
        You can use formatted HTML in the tooltip and you can set the width in pixels of the tooltip:
        <i class="hx-icon icon-information-outline" hxTooltip [autoClose]="false" placement="right" maxWidth="350">
          <div *hxaTooltipDynamicContent>
            <div class='is-text-left pa-3'>
              ENABLED FOR
              <ul>
                <li>Card payments</li>
                <li>Fully paid patient claims with EasyClaim</li>
                <li>Dynamic content with <a (click)="onClickHandler($event)">links</a></li>
              </ul>
            </div>
          </div>
        </i>
      </p>
    `;

  exampleTypescript =
    `
    import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
    import { PageScrollService } from 'ngx-page-scroll';
    import { DOCUMENT } from '@angular/common';
    import { CoreBaseComponent } from '../core-base.component';
    import { TooltipsCode } from './tooltips.code';
    import {Context} from '@hxui/angular';
    import {BreakpointObserver} from '@angular/cdk/layout';
    
    
    @Component({
      selector: 'app-tooltips',
      templateUrl: './tooltips.component.html',
    })
    export class TooltipsComponent implements OnInit {
    
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
    
      constructor() {
      }
    
      ngOnInit() {
        
      }
    
      onClickHandler($event) {
        alert('clicked');
        $event.preventDefault();
        $event.stopPropagation();
      }
    }


    `;
}
