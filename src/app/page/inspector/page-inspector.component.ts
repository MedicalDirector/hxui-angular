import { Component } from '@angular/core';
import { InspectorLocation, InspectorService } from '@hxui/angular';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { ExampleBasicCustomInspectorComponent } from './example/basic-custom-inspector.component';
import { PageInspectorCode } from './page-inspector.code';

@Component({
  selector: 'app-page-inspector',
  templateUrl: './page-inspector.component.html',
  styles: [':host { display: contents; }'],
})
export class PageInspectorComponent {
  code = new PageInspectorCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'API reference', link: 'api' },
  ];

  constructor(private inspectorService: InspectorService) {}

  openInspector = () => {
    this.inspectorService.open(
      ExampleBasicCustomInspectorComponent,
      {
        hasClose: false,
        closeOnBackdropClick: true,
        location: InspectorLocation.Right,
      },
      {
        visitId: 10,
        onClose: data => {
          console.log(data);
        },
        onResize: data => {
          console.log(data);
        },
      }
    );
  };
}
