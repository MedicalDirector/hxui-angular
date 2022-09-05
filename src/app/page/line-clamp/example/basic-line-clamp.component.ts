import { Component } from '@angular/core';

@Component({
  selector: 'eg-basic-lineclamp',
  template: `
    <hxa-line-clamp row="3">
      <div #content>
        test<br />
        test<br />
        test<br />
        test
      </div>
    </hxa-line-clamp>

    <br />

    <hxa-line-clamp row="2">
      <div #content>
        test<br />
        test
      </div>
    </hxa-line-clamp>

    <br />

    <hxa-line-clamp row="2">
      <div #content style="color: red">{{ message }}</div>
    </hxa-line-clamp>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleBasicLineClampComponent {
  message = [...Array(100)].map(() => 'Lorem ipsum dolor sit amet').join(', ');
}
