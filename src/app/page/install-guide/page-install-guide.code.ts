import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageInstallGuideCode {
  install: Code = {
    lang: ['sh'],
    text: `npm install @hxui/angular --save`,
  };

  all: Code = {
    lang: ['ts'],
    text: `import {HxUiModule} from "@hxui/angular";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HxUiModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
`,
  };
  specific: Code = {
    lang: ['ts'],
    text: `import {DropdownModule} from "@hxui/angular";

@NgModule({
  imports: [DropdownModule.forRoot(),...]
})

export class AppModule {
`,
  };

  cdk: Code = {
    lang: ['scss'],
    text: `/* Structural css needed for CDK to work correctly */
@import '~@angular/cdk/overlay-prebuilt.css';
@import '~@angular/cdk/a11y-prebuilt.css';
@import '~@angular/cdk/text-field-prebuilt.css';
`,
  };
}
