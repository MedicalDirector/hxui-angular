import { Component } from '@angular/core';

@Component({
  selector: 'eg-basic-autogrow',
  template: `
    <div class="hx-card">
      <div class="hx-card-content mt-8">
        <div class="hx-input-control">
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
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleBasicAutogrowComponent {}
