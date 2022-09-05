import { Component } from '@angular/core';
import { Context, Size } from '@hxui/angular';

@Component({
  selector: 'eg-basic-loader',
  template: `
    <div class="hx-columns">
      <div class="hx-column">
        <div class="hx-card">
          <div class="hx-card-header">
            <div class="hx-card-header-title">Sizes</div>
          </div>
          <div class="hx-card-content">
            <div class="hx-columns">
              <div class="hx-column"><hxa-loader></hxa-loader></div>
              <div class="hx-column">
                <hxa-loader [size]="eSize.Small"></hxa-loader>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hx-column">
        <div class="hx-card">
          <div class="hx-card-header">
            <div class="hx-card-header-title">Contextual</div>
          </div>
          <div class="hx-card-content">
            <div class="hx-columns">
              <div class="hx-column">
                <hxa-loader [context]="eContext.Info"></hxa-loader>
              </div>
              <div class="hx-column">
                <hxa-loader [context]="eContext.Success"></hxa-loader>
              </div>
              <div class="hx-column">
                <hxa-loader [context]="eContext.Danger"></hxa-loader>
              </div>
              <div class="hx-column">
                <hxa-loader [context]="eContext.Warning"></hxa-loader>
              </div>
            </div>
          </div>
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
export class ExampleBasicLoaderComponent {
  /** Enums to be used in the template **/
  eContext = Context;
  eSize = Size;
}
