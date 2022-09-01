import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageAccordionCode {
  usage: Code = {
    lang: ['ts'],
    text: `import { AccordionModule } from "@hxui/angular";

@NgModule({
  imports: [
    AccordionModule,
    ...
    // Add following on app root for animations to work
    BrowserAnimationsModule
  ]
})
export class AppModule {}
`,
  };

  egBasic: Code = {
    lang: ['xml'],
    text: `<hx-accordion>
  <hx-accordion-container>
    <hx-accordion-header>
      This is the header
    </hx-accordion-header>
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer eu suscipit ante. Nulla nec nulla eget quam fringilla blandit.
        Vivamus gravida purus erat, id ultrices lacus sagittis vel.
        Etiam nec nulla eleifend velit tristique faucibus sed ut nisl.
      </p>
    </hx-accordion-body>
  </hx-accordion-container>
</hx-accordion>
`,
  };

  egCustomHTML: Code = {
    lang: ['xml'],
    text: `<hx-accordion
  [cssClass]="{'is-elevate-3': true, 'is-text-unselectable': true}"
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
  };

  egCustomTS: Code = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html',
})
export class MyFeatureComponent {

  items = [
    {
      header: 'This is the first header',
      body: 'This is the body of the first accordion component',
    },
    {
      header: 'Drug reference for Paracetamole',
      body: 'Paracetamole is a drug',
    },
    { 
      header: 'Item with a null body', 
      body: null
    },
  ];

  someFunction($event: number) {
    alert($event);
  }
}
`,
  };
}
