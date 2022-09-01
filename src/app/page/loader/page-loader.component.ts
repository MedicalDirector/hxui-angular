import { Component } from '@angular/core';
import { Context, Size } from '@hxui/angular';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageLoaderCode } from './page-loader.code';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styles: [':host { display: contents; }'],
})
export class PageLoaderComponent {
  code = new PageLoaderCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'API reference', link: 'api' },
  ];

  /** Enums to be used in the template **/
  eContext = Context;
  eSize = Size;
}
