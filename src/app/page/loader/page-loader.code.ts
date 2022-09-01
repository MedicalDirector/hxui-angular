import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageLoaderCode {
  usage: Code = {
    lang: ['ts'],
    text: `import { LoadersModule } from "@hxui/angular";

@NgModule({
  imports: [LoadersModule.forRoot(), ...]
})
export class AppModule {}
`,
  };

  egBasicHTML: Code = {
    lang: ['xml'],
    text: `<hxa-loader></hxa-loader></div>
<hxa-loader [size]="eSize.Small"></hxa-loader>
<hxa-loader [context]="eContext.Info"></hxa-loader>
<hxa-loader [context]="eContext.Success"></hxa-loader>
<hxa-loader [context]="eContext.Danger"></hxa-loader>
<hxa-loader [context]="eContext.Warning"></hxa-loader>
`,
  };

  egBasicTS: Code = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';
import { Context, Size } from '@hxui/angular';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html',
})
export class MyFeatureComponent {
  eContext = Context;
  eSize = Size;
}
`,
  };
}
