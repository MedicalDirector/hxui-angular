export class TextInputCode {

  usage =
    `
    import {TextInputModule} from "@hxui/angular";

    @NgModule({
      imports: [TextInputModule.forRoot(),...]
    })
    export class AppModule(){}
    `;

  exampleTemplate =
    `
   <div class="hx-input-control">
            <input hxaTextInput class="hx-input" type="text" required >
            <label class="hx-label">Required field <sup>*</sup></label>
            <div class="hx-help">Help text</div>
          </div>

          <div class="hx-input-control">
            <input hxaTextInput class="hx-input" type="text" value="Hello" required>
            <label class="hx-label">Required field with default value <sup>*</sup></label>
            <div class="hx-help">Help text</div>
          </div>

          <div class="hx-input-control">
            <input hxaTextInput class="hx-input" type="text" placeholder="Sample placeholder" required>
            <label class="hx-label">Required field with placeholder <sup>*</sup></label>
            <div class="hx-help">Help text</div>
          </div>

          <div class="hx-input-control">
            <input hxaTextInput class="hx-input" type="text" >
            <label class="hx-label">Optional field</label>
            <div class="hx-help">Help text</div>
          </div>

          <div class="hx-input-control">
            <input hxaTextInput class="hx-input" type="text" value="Hello">
            <label class="hx-label">Optional field with default value</label>
            <div class="hx-help">Help text</div>
          </div>

          <div class="hx-input-control">
            <input hxaTextInput class="hx-input" type="text" placeholder="Sample placeholder">
            <label class="hx-label">Optional field with placeholder</label>
            <div class="hx-help">Help text</div>
          </div>


        <div class="hx-input-control is-danger">
            <input hxaTextInput class="hx-input" type="email" value="joe.chan@medicaldirector.com" required>
            <label class="hx-label">Email <sup>*</sup></label>
            <div class="hx-help">Danger!</div>
        </div>


        <div class="hx-input-control">
            <input hxaTextInput class="hx-input" type="text" disabled placeholder="I am disabled" required>
            <label class="hx-label">This is Disabled</label>
            <div class="hx-help">Danger!</div>
        </div>


        <div class="hx-input-group">
            <i class="hx-icon icon-search"></i>
            <div class="hx-input-control">
            <input hxaTextInput class="hx-input" type="text" required>
            <label class="hx-label">Search <sup>*</sup></label>
            <div class="hx-help">Please search by patient name</div>
            </div>
            <div class="hx-input-actions">
            <div class="hx-loader is-small"><div></div><div></div><div></div><div></div></div>
            <div class="hx-button-group">
                <button class="hx-button is-flat"><span class="hx-icon-control"><i class="icon icon-close-empty"></i></span></button>
                <button class="hx-button is-flat"><span class="hx-icon-control"><i class="icon icon-plus"></i></span></button>
            </div>
            </div>
        </div>

        <div class="hx-input-group">
            <i class="hx-icon icon-person"></i>
            <div class="hx-input-control">
            <input hxaTextInput class="hx-input" type="text" value="JG001" required>
            <label class="hx-label">Username <sup>*</sup></label>
            <div class="hx-help">Please enter your username</div>
            </div>
            <i class="hx-icon icon-check-empty is-medium is-success"></i>
        </div>

    `;

  exampleTypescript =
    `
    import { Component, OnInit } from '@angular/core';

    @Component({
      selector: 'app-tooltips',
      templateUrl: './tooltips.component.html'
    })
    export class TooltipsComponent implements OnInit {

      public contextEnum = Context;


      constructor() { }

      ngOnInit() {
      }

    }

    `;
}
