import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageLineClampCode {
  usage: Code = {
    lang: ['ts'],
    text: `import {LineClampModule} from "@hxui/angular";

@NgModule({
  imports: [LineClampModule,...]
})
export class AppModule {}
`,
  };

  egBasicHTML: Code = {
    lang: ['xml'],
    text: `<hxa-line-clamp row="3">
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
`,
  };

  egBasicTS: Code = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html',
  styleUrls: ['./myfeature.component.scss']
})
export class MyFeatureComponent implements OnInit {
  message = [...Array(100)].map(() => 'Lorem ipsum dolor sit amet').join(', ');
}
`,
  };
}
