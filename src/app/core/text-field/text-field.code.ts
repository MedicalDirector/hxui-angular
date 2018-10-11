export class TextFieldCode {

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

    `;

  exampleTypescript =
    `
    import { Component, OnInit } from '@angular/core';

    @Component({
      selector: 'app-tooltips',
      templateUrl: './tooltips.component.html'
    })
    export class TooltipsComponent implements OnInit {

      public contextEnum = Context;


      constructor() { }

      ngOnInit() {
      }

    }

    `;
}
