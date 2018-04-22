export class SelectizeCode {

usage = `
import {SelectizeModule} from "@hxui/angular";

@NgModule({
  imports: [SelectizeModule.forRoot(),...]
})
export class AppModule(){}

`;


 simpleExampleTemplate =
 `
 <div class="hx-card not-scrollable">
    <div class="hx-card-content">
      <div class="hx-input-control">
        <div class="hx-select-control">
          <label for="" class="hx-label">Test required <sup>*</sup></label>
          <hxa-selectize [config]="selectizeConfig" [options]="selectizeOptions"></hxa-selectize>
        </div>
      </div>
    </div>
  </div>
  `;

 simpleExampleTypescript =
 `
  import  {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
  } from '@angular/core';
  import  { CoreBaseComponent } from '../core-base.component';
  import  { SelectizeConfig } from '@hxui/angular';
  import  { ISelectizeItem } from '@hxui/angular';

  @Component( {
    selector: 'app-selectize',
    templateUrl: './selectize.component.html',
    styles: [':host  { display:flex; flex: 1; min-width: 0; }']
  })
  export class SelectizeComponent extends CoreBaseComponent implements OnInit  {
    public selectizeConfig = new SelectizeConfig();
    public selectizeOptions: ISelectizeItem[] = <ISelectizeItem[]>[
       {
        label: 'Iron studies',
        value: 'ironstudies'
      },
       {
        label: 'Glucose fasting',
        value: 'glucosefasting'
      },
       {
        label: 'HbA1c',
        value: 'hba1c'
      },
       {
        label: 'Glucose tolerance test',
        value: 'gklucosetolerencetest'
      },
       {
        label: 'HDL cholesterol',
        value: 'hdlcholesterol'
      },
       {
        label: 'INR',
        value: 'inr'
      },
       {
        label: 'Fructosamine',
        value: 'fructosamine'
      },
       {
        label: 'Thyroid function tests',
        value: 'thyroid functions tests'
      }
    ];


    ngOnInit(): void  {}

    constructor()  {}
  }
  `;

 multiExampleTemplate =
  `
 <div class="hx-card not-scrollable">
    <div class="hx-card-content">
      <div class="hx-input-control">
        <div class="hx-select-control">
          <label for="" class="hx-label">Test(s) required <sup>*</sup></label>
          <hxa-selectize [config]="selectizeConfig" [options]="selectizeOptions"></hxa-selectize>
        </div>
      </div>
    </div>
  </div>
  `;

multiExampleTypescript =
  `
  import  {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
  } from '@angular/core';
  import  { CoreBaseComponent } from '../core-base.component';
  import  { SelectizeConfig } from '@hxui/angular';
  import  { ISelectizeItem } from '@hxui/angular';

  @Component( {
    selector: 'app-selectize',
    templateUrl: './selectize.component.html',
    styles: [':host  { display:flex; flex: 1; min-width: 0; }']
  })
  export class SelectizeComponent extends CoreBaseComponent implements OnInit  {
    public selectizeConfig = new SelectizeConfig();
    public selectizeOptions: ISelectizeItem[] = <ISelectizeItem[]>[
       {
        label: 'Iron studies',
        value: 'ironstudies'
      },
       {
        label: 'Glucose fasting',
        value: 'glucosefasting'
      },
       {
        label: 'HbA1c',
        value: 'hba1c'
      },
       {
        label: 'Glucose tolerance test',
        value: 'gklucosetolerencetest'
      },
       {
        label: 'HDL cholesterol',
        value: 'hdlcholesterol'
      },
       {
        label: 'INR',
        value: 'inr'
      },
       {
        label: 'Fructosamine',
        value: 'fructosamine'
      },
       {
        label: 'Thyroid function tests',
        value: 'thyroid functions tests'
      }
    ];


    ngOnInit(): void  {
      this.selectizeConfig.create = true;
      this.selectizeConfig.maxItems = null;
      this.selectizeConfig.hideSelected = true;
    }

    constructor()  {}
  }
  `;

  customItemExampleTemplate =
    `
 <div class="hx-card not-scrollable">
    <div class="hx-card-content">
      <div class="hx-input-control">
        <div class="hx-select-control">
          <label for="" class="hx-label">Test(s) required <sup>*</sup></label>
          <hxa-selectize [config]="selectizeCustomConfig" [options]="selectizeOptions" [value]="selectedValues"></hxa-selectize>
        </div>
      </div>
    </div>
  </div>
  `;

  customItemExampleTypescript =
    `
  import  {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
  } from '@angular/core';
  import  { CoreBaseComponent } from '../core-base.component';
  import  { SelectizeCustomConfig } from './selectize-custom.config';
  import  { SelectizeCustomItemModel } from './selectize-custom-item.model';

  @Component( {
    selector: 'app-selectize',
    templateUrl: './selectize.component.html',
    styles: [':host  { display:flex; flex: 1; min-width: 0; }']
  })
  export class SelectizeComponent extends CoreBaseComponent implements OnInit  {
  
    public selectedValues: string[] = [];
    public selectizeCustomConfig = new SelectizeCustomConfig();
    public selectizeOptions: SelectizeCustomItemModel[] = <SelectizeCustomItemModel[]>[
       {
      label: 'Iron studies',
      value: 'ironstudies',
      error: true
    },
    {
      label: 'Glucose fasting',
      value: 'glucosefasting',
      error: false
    },
    {
      label: 'HbA1c',
      value: 'hba1c',
      error: false
    },
    {
      label: 'Glucose tolerance test',
      value: 'gklucosetolerencetest',
      error: true
    },
    {
      label: 'HDL cholesterol',
      value: 'hdlcholesterol',
      error: false
    },
    {
      label: 'INR',
      value: 'inr',
      error: true
    },
    {
      label: 'Fructosamine',
      value: 'fructosamine',
      error: true
    },
    {
      label: 'Thyroid function tests',
      value: 'thyroid functions tests',
      error: false
    }
    ];


    ngOnInit(): void  {
      this.selectizeCustomConfig.create = true;
      this.selectizeCustomConfig.maxItems = null;
      this.selectizeCustomConfig.hideSelected = true;
      this.selectedValues = [
          this.selectizeOptions[0].value, 
          this.selectizeOptions[1].value, 
          this.selectizeOptions[2].value, 
          this.selectizeOptions[5].value
       ];
    }

    constructor()  {}
  }
  `;

  customItemConfig =
`
import {SelectizeConfig} from '@hxui/angular;
import {SelectizeCustomItemModel} from './selectize-custom-item.model';

export class SelectizeCustomConfig extends SelectizeConfig {

  public render = {
    item: (item: SelectizeCustomItemModel, escape: Function): string => {

      const cssClass = (item.error) ? 'is-danger' : '';
      const info = (item.info) ? '<button class="mr-2 hx-info is-small" title="For now via the render function, only native tooltips are possible :("></button>' : '';
      const multi = \`<span class="hx-badge is-medium \` + cssClass + \`">
                <span class="hx-badge-content">\`
        + info
        + escape(item.label) +
        \`</span>
              </span>\`;
      const single = \`<div class="item">\` + escape(item.label) + \`</div>\`;
      return (!this.maxItems) ? multi : single;
    }
  };

}

`;

  customItemModel =
    `
import {ISelectizeItem} from '@hxui/angular';

export class SelectizeCustomItemModel implements ISelectizeItem {
  public label: string;
  public value: string;
  public error: boolean;
}
`;

}
