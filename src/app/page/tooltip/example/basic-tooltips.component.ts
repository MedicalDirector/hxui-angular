import { Component } from '@angular/core';
import { Context } from '@hxui/angular';

@Component({
  selector: 'eg-basic-tooltips',
  template: `
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
      <a href hxTooltip="Danger!" placement="bottom" [context]="eContext.Danger"
        >danger</a
      >.
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
export class ExampleBasicTooltipsComponent {
  eContext = Context;
}
