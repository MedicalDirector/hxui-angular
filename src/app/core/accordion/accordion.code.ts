export class AccordionCode {
  usage =
    `
    import { AccordionModule } from "@hxui/angular";

    @NgModule({
      imports: [AccordionModule, ...]
    })
    export class AppModule() {}
    `;

  exampleTemplate =
    `
  <hx-accordion>
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
    `;

  exampleTemplate2 =
    `
    <hx-accordion [cssClass]="{'is-elevate-3': true, 'is-text-unselectable': true}">
      <hx-accordion-container *ngFor="let item of items; index as i" [expanded]="false" [index]="i" [disabled]="item.body === null" (headerClick)="someFunction($event)">
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
  `;

  exampleComponent2 =
  `
    @Component()
    export class ClassUsingTheAccordionComponent extends SomeOtherClassOrComponent {
      public items: {'header': string, 'body': string}[] = [];

      constructor() {
        this.items.push({header: 'This is the first header', body: 'This is the body of the first accordion component'});
        this.items.push({header: 'Drug reference for Paracetamole', body: 'Paracetamole is a drug'});
        this.items.push({header: 'Item with a null body', body: null});
      }

      public someFunction($event: number){
        alert($event);
      }
    }
  `;
}
