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
      <a href="#" hxTooltip="my tooltip message is here" [disabled]="false" [animation]="true" placement="top">tooltip</a>. You can also have tooltips appear on the
      <a href="#" hxTooltip="my tooltip showing on the right" [disabled]="false" [animation]="true" placement="right">right</a> or on the
      <a href="#" hxTooltip="my tooltip showing on the left" [disabled]="false" [animation]="true" placement="left">left</a>.
    </p>

    <p>You can also add styles, dynamic html content to a tooltip and have it show while hovering over a
      <hx-tooltip-content #myTooltip [animation]="true" placement="left">
        <b>Very</b> <span class="is-danger">Dynamic</span> <span class="is-text-capitalise is-primary">Reusable</span>
        <b><i><span class="is-warning">Tooltip With</span></i></b> <small>Html support</small>.
      </hx-tooltip-content>
      <button class="hx-button is-primary is-small" [hxTooltip]="myTooltip">Button</button>.
    </p>

    <p>You can set the context (colour) of the tooltip to
      <a href hxTooltip="Success!" [animation]="true" placement="bottom" [context]="contextEnum.Success">success</a>,
      <a href hxTooltip="Warning!" [animation]="true" placement="bottom" [context]="contextEnum.Warning">warning</a>, or
      <a href hxTooltip="Danger!" [animation]="true" placement="bottom" [context]="contextEnum.Danger">danger</a>.
    </p>

    <hr>

    <p>You can also have dynamic content in your <a href="#" [hxTooltip]="dynamicContentTooltip">tooltips</a>.</p>
    <div class="hx-input-control">
      <input class="hx-input" type="text" [(ngModel)]="dynamicTooltipText" name="dynamicTooltipText" [hxTooltip]="dynamicContentTooltip" required>
      <label class="hx-label">Tooltip text <sup>*</sup></label>
      <div class="hx-help">Please enter some text</div>
    </div>

    <hx-tooltip-content #dynamicContentTooltip [animation]="true" placement="top">
      {{dynamicTooltipText}}
    </hx-tooltip-content>.

    `;

  exampleTypescript =
    `
    import { Component, OnInit } from '@angular/core';

    @Component({
      selector: 'app-tooltips',
      templateUrl: './tooltips.component.html'
    })
    export class TooltipsComponent implements OnInit {

      private _dynamicTooltipText = 'sample text';

      public contextEnum = Context;

      public get dynamicTooltipText(): string {
        return this._dynamicTooltipText;
      }

      public set dynamicTooltipText(txt: string) {
        this._dynamicTooltipText = txt;
      }

      constructor() { }

      ngOnInit() {
      }

    }

    `;
}
