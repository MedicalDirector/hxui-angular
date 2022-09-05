import { Component } from '@angular/core';

@Component({
  selector: 'eg-custom-accordion',
  template: `
    <hx-accordion
      [cssClass]="{ 'is-elevate-3': true, 'is-text-unselectable': true }"
    >
      <hx-accordion-container
        *ngFor="let item of items; index as i"
        [expanded]="false"
        [index]="i"
        [disabled]="item.body === null"
        [empty]="item.body"
        (headerClick)="someFunction($event)"
      >
        <hx-accordion-header>
          <p>
            <b>{{ item.header }}</b>
          </p>
        </hx-accordion-header>
        <hx-accordion-body>
          <p>{{ item.body }}</p>
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
export class ExampleCustomAccordionComponent {
  items: { header: string; body: string }[] = [
    {
      header: 'This is the first header',
      body: 'This is the body of the first accordion component',
    },
    {
      header: 'Drug reference for Paracetamole',
      body: 'Paracetamole is a drug',
    },
    { header: 'Item with a null body', body: null },
  ];

  someFunction($event: number) {
    alert($event);
  }
}
