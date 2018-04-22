export class AutoGrowCode {

usage =
`
import {AutoGrowModule} from "@hxui/angular";

 @NgModule({
    imports: [AutoGrowModule.forRoot(),...]
 })
 exportclass AppModule(){

`;

example =
`
<div class="hx-card">
    <div class="hx-card-content">
      <div class="hx-input-control">
        <textarea id="exampletextarea" name="textarea-sample" class="hx-textarea" placeholder="Placeholder text... (mandatory)" autogrow></textarea>
        <label for="exampletextarea" class="hx-label">Textarea with Placeholder </label>
        <div class="hx-help">Textarea hint (if required)</div>
      </div>
    </div>
  </div>
  
`;
}
