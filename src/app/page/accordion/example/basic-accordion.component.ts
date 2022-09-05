import { Component } from '@angular/core';

@Component({
  selector: 'eg-basic-accordion',
  template: `
    <hx-accordion>
      <hx-accordion-container>
        <hx-accordion-header> This is the header </hx-accordion-header>
        <hx-accordion-body>
          <p>This is the body</p>
        </hx-accordion-body>
      </hx-accordion-container>
      <hx-accordion-container [expanded]="false">
        <hx-accordion-header>
          This is the second header. <b>You can even style it!</b>
          <i class="hx-icon icon-helix is-small is-info"></i>
        </hx-accordion-header>
        <hx-accordion-body>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu
            suscipit ante. Nulla nec nulla eget quam fringilla blandit. Vivamus
            gravida purus erat, id ultrices lacus sagittis vel. Etiam nec nulla
            eleifend velit tristique faucibus sed ut nisl.
          </p>
        </hx-accordion-body>
      </hx-accordion-container>
    </hx-accordion>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleBasicAccordionComponent {}
