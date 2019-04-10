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
  <hx-accordion [additionalClass]="{'is-elevate-3': true}">
    <hx-accordion-container>
      <hx-accordion-header>
        <p>
          <b>The header with an additional HXUI elevation class</b>
        </p>
      </hx-accordion-header>
      <hx-accordion-body>
        <p>The body with an additional HXUI elevation class</p>
      </hx-accordion-body>
    </hx-accordion-container>
  </hx-accordion>
  `;
}
