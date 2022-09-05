import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TextInputDirective } from '@hxui/angular';

@Component({
  selector: 'eg-predefined-typeahead',
  template: `
    <div class="hx-input-group">
      <div class="hx-input-control" id="parentEL2">
        <input
          class="hx-input"
          type="text"
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
          (typeaheadOnBlur)="onBlur()"
        />
        <label class="hx-label">Phone number</label>
        <div class="hx-help">Select a phone number</div>
      </div>
      <div class="hx-input-actions">
        <i class="hx-icon icon-caret-down"></i>
      </div>
    </div>

    <ng-template
      #customItemTemplate
      let-model="item"
      let-index="index"
      let-query="query"
    >
      <hxa-highlight
        [result]="model.number"
        [term]="query | mask: '0000 000 000'"
      ></hxa-highlight>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExamplePredefinedTypeaheadComponent implements AfterViewInit {
  @ViewChild('phoneTypeahead', { read: TextInputDirective })
  txtInputDirective: TextInputDirective;

  selected_number;
  phone_numbers: { category: string; type: string; number: string }[] = [
    {
      category: 'Saved Phone Numbers',
      type: 'icon-mobile',
      number: '0405 238 765',
    },
    {
      category: 'Saved Phone Numbers',
      type: 'icon-telephone',
      number: '(03) 97275154',
    },
    {
      category: 'Saved Phone Numbers',
      type: 'icon-mobile',
      number: '0404 235 766',
    },
  ];

  ngAfterViewInit() {
    this.txtInputDirective?.styleLabel();
  }

  onSelect($event) {
    this.txtInputDirective?.styleLabel();
  }

  onBlur() {
    console.log('on blur!');
  }
}
