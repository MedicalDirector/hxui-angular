export class TypeaheadsCode {

usage =
`
import {TypeaheadsModule} from "@hxui/angular";

@NgModule({
  imports: [TypeaheadsModule.forRoot(),...]
})
export class AppModule(){}

`;

exampleTemplate =
`

<div class="hx-input-control" id="parentEL">
  <input class="hx-input" hxaTextInput type="text" [(ngModel)]="selected"
    [hxaTypeahead]="medications" minWidthRelativeTo="parentEL">
  <label class="hx-label"><i class="icon icon-search is-small"></i> Medications</label>
  <div class="hx-help">Search for medication names</div>
</div>

`;

exampleTypescript =
`
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typeaheads',
  templateUrl: './typeaheads.component.html'
})
export class TypeaheadsComponent implements OnInit {
  public selected: string;
  public medications: string[] = [
    'SABRIL powder for oral solution 500mg',
    'SABRIL tablet 500mg',
    'SACROSIDASE oral liquid, solution 8,500 Units/mL',
    'SACUBITRIL/VALSARTAN tablet 24.3mg/25.7mg',
    'SACUBITRIL/VALSARTAN tablet 48.6mg/51.4mg',
    'SACUBITRIL/VALSARTAN tablet 97.3mg/102.8mg',
    'SAFLUTAN eye drops 0.0015% (4.5mcg/0.3mL)',
    'SAIZEN 8 CLICK.EASY powder for injection 8mg (24 units)',
    'SAIZEN powder for injection 3mg (10 units)',
    'SAIZEN injection 6mg (18 units)',
    'SAIZEN injection 12mg (36 units)',
    'SAIZEN injection 20mg (60 units)',
    'SALAZOPYRIN-EN enteric-coated tablet 500mg',
    'SALBUTAMOL ACTAVIS inhalation 2.5mg/2.5mL',
    'SALBUTAMOL ACTAVIS inhalation 5mg/2.5mL',
    'SALBUTAMOL SANDOZ inhalation 2.5mg/2.5mL',
    'SALBUTAMOL SANDOZ inhalation 5mg/2.5mL',
    'SALBUTAMOL metered-dose aerosol 100mcg/dose',
    'SALBUTAMOL injection 1mg/mL'];
  constructor() { }

  ngOnInit() {
  }

}

`;


  phoneExampleTemplate =
    `

      <div class="hx-input-control" id="parentEL2">
          <input class="hx-input" type="text"
                 #phoneTypeahead
                 hxaTextInput
                 mask="0000 000 000"
                 [(ngModel)]="selected_number"
                 [hxaTypeahead]="phone_numbers"
                 minWidthRelativeTo="parentEL2"
                 typeaheadOptionField="number"
                 typeaheadGroupField="category"
                 [typeaheadMinLength]="0"
                 [typeaheadItemTemplate]="customItemTemplate"
                 (typeaheadOnSelect)="onSelect($event)"
                (typeaheadOnBlur)="onBlur()">
          <label class="hx-label">Phone number</label>
          <div class="hx-help">Select a phone number</div>
        </div>
          <div class="hx-input-actions">
            <i class="hx-icon icon-caret-down"></i>
          </div>
        </div>

        <ng-template #customItemTemplate let-model="item" let-index="index" let-query="query">
          <hxa-highlight [result]="model.number" [term]="query | mask: '0000 000 000'"></hxa-highlight>
        </ng-template>


      </div>

`;

  phoneExampleTypescript =
    `
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typeaheads',
  templateUrl: './typeaheads.component.html'
})
export class TypeaheadsComponent implements OnInit, AfterViewInit {

  @ViewChild('phoneTypeahead', { read: TextInputDirective }) txtInputDirective: TextInputDirective;

   public selected_number;
  public phone_numbers: {category:  string; type: string, number: string}[] = [
    { category: 'Saved Phone Numbers', type: 'icon-mobile', number: '0405 238 765' },
    { category: 'Saved Phone Numbers', type: 'icon-telephone', number: '(03) 97275154' },
    { category: 'Saved Phone Numbers', type: 'icon-mobile', number: '0404 235 766' }
  ];
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.txtInputDirective.styleLabel();
    });
  }

  onSelect($event) {
    this.txtInputDirective.styleLabel();
  }

}

`;
}
