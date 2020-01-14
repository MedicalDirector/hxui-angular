export class LineClampCode {

  usage =
    `
    import {LineClampModule} from "@hxui/angular";

    @NgModule({
      imports: [LineClampModule,...]
    })
    export class AppModule(){}
    `;

  exampleTemplate =
    `
    <hxa-line-clamp row="3">
        <div #content>
          test<br>
          test<br>
          test<br>
          test
        </div>
      </hxa-line-clamp>

      <br>

      <hxa-line-clamp row="2">
        <div #content>
          test<br>
          test
        </div>
      </hxa-line-clamp>

      <br>

      <hxa-line-clamp row="2">
        <div #content style="color: red">
          {{message}}
        </div>
      </hxa-line-clamp>
    `;

  exampleTypescript =
    `
    import {Component, Inject, OnInit} from '@angular/core';
    import {LineClampCode} from './line-clamp.code';

    @Component({
      selector: 'hx-line-clamp',
      templateUrl: './line-clamp.component.html',
      styleUrls: ['./line-clamp.component.scss']
    })
    export class LineClampComponent implements OnInit {

      message: string;

      constructor() {
      }

      ngOnInit() {
        this.message = Array.apply(null, Array(100)).map(() => 'Lorem ipsum dolor sit amet').join(', ');
      }

    }

    `;
}
