import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageAutoGrowCode {
  usage: Code = {
    lang: ['ts'],
    text: `import { AutoGrowModule } from "@hxui/angular";

@NgModule({
  imports: [
    AutoGrowModule.forRoot(),
    ...
  ]
})
exportclass AppModule {}
`,
  };

  egBasic: Code = {
    lang: ['xml'],
    text: `<div class="hx-input-control">
  <textarea
    id="exampletextarea"
    name="textarea-sample"
    class="hx-textarea"
    placeholder="Placeholder text"
    autogrow
  ></textarea>
  <label for="exampletextarea" class="hx-label"
    >Textarea with Placeholder
  </label>
  <div class="hx-help">Textarea hint (if required)</div>
</div>`,
  };
}
