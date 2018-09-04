export class AccordionCode {
  usage =
    `
    import { AccordianModule } from "@hxui/angular";

    @NgModule({
      imports: [AccordianModule, ...]
    })
    export class AppModule() {}
    `;

  exampleTemplate =
    `
    <hx-accordion>
      <hx-accordion-container>
        <hx-accordion-header>
          FIRST CONTAINER HEADER
        </hx-accordion-header>
        <hx-accordion-body>
          FIRST CONTAINER BODY
        </hx-accordion-body>
      </hx-accordion-container>
      <hx-accordion-container>
        <hx-accordion-header>
          SECOND CONTAINER HEADER
        </hx-accordion-header>
        <hx-accordion-body>
          SECOND CONTAINER BODY
        </hx-accordion-body>
      </hx-accordion-container>
    </hx-accordian>
    `;
}
