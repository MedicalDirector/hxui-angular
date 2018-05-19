export class DropdownsCode {

  usage =
    `
    import {DropdownModule} from "@hxui/angular";
    
     @NgModule({
        imports: [DropdownModule.forRoot(),...]
     })
     export class AppModule(){
    
    `;

  example =
    `
    <div class="hx-dropdown" hxDropdown>
    <button class="hx-button is-primary is-outlined hx-button-dropdown" hxDropdownToggle type="button">
      Dropdown button
    </button>
    <div class="hx-dropdown-menu" *hxDropdownMenu>
      <div class="hx-dropdown-header">Dropdown header</div>
        <a class="hx-dropdown-item" href="#">Action</a>
        <a class="hx-dropdown-item" href="#">Another action</a>
        <div class="hx-dropdown-divider"></div>
        <a class="hx-dropdown-item" href="#">Action</a>
        <a class="hx-dropdown-item" href="#">Another action</a>
      </div>
    </div>
    `;
}
