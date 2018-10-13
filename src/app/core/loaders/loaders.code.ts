export class LoadersCode {

  usage =
    `
    import { LoadersModule } from "@hxui/angular";

    @NgModule({
      imports: [LoadersModule.forRoot(), ...]
    })
    export class AppModule() {}
    `;

  exampleTemplate =
    `
  <div class="hx-columns">
    <div class="hx-column">
      <div class="hx-card">
        <div class="hx-card-header"><div class="hx-card-header-title">Sizes</div></div>
        <div class="hx-card-content">
          <div class="hx-columns">
            <div class="hx-column"><hxa-loader></hxa-loader></div>
            <div class="hx-column"><hxa-loader [size]="sizeEnum.Small"></hxa-loader></div>
          </div>
        </div>
      </div>
    </div>
    <div class="hx-column">
      <div class="hx-card">
        <div class="hx-card-header"><div class="hx-card-header-title">Contextual</div></div>
        <div class="hx-card-content">
          <div class="hx-columns">
            <div class="hx-column"><hxa-loader [context]="contextEnum.Info"></hxa-loader></div>
            <div class="hx-column"><hxa-loader [context]="contextEnum.Success"></hxa-loader></div>
            <div class="hx-column"><hxa-loader [context]="contextEnum.Danger"></hxa-loader></div>
            <div class="hx-column"><hxa-loader [context]="contextEnum.Warning"></hxa-loader></div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;

  exampleTypescript =
    `
  import { Component, OnInit } from '@angular/core';
  import {Context, Size} from '@hxui/angular/enums';
  
  @Component({
    selector: 'app-loaders',
    templateUrl: './loaders.component.html',
  })
  export class LoadersComponent implements OnInit {
  
    contextEnum = Context;
    sizeEnum = Size;
  
    constructor() { }
  
    ngOnInit() {
    }  
  }

    `;
}
