import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll';
import { CoreBaseComponent } from '../core-base.component';
import { DOCUMENT } from '@angular/common';
import { SelectizeConfig } from '../../../../projects/hx-ui/src/lib/selectize/selectize.config';
import {SelectizeCode} from './selectize.code';
import {SelectizeCustomItemModel} from './selectize-custom-item.model';
import {SelectizeCustomConfig} from './selectize-custom.config';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-selectize',
  templateUrl: './selectize.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class SelectizeComponent extends CoreBaseComponent implements OnInit {


  public selectedMultiSelectValue: string[] = [];
  public selectedSingleSelectValue: string[] = [];
  public code = new SelectizeCode();
  public multiSelectizeConfig = new SelectizeConfig();
  public singleSelectizeConfig = new SelectizeConfig();
  public customSelectizeConfig = new SelectizeCustomConfig();
  public selectizeOptions: SelectizeCustomItemModel[] = <SelectizeCustomItemModel[]>[
    {
      label: 'Iron studies',
      value: 'ironstudies',
      error: true,
      info: true
    },
    {
      label: 'Glucose fasting',
      value: 'glucosefasting',
      error: false,
      info: false
    },
    {
      label: 'HbA1c',
      value: 'hba1c',
      error: false,
      info: false
    },
    {
      label: 'Glucose tolerance test',
      value: 'gklucosetolerencetest',
      error: true,
      info: true
    },
    {
      label: 'HDL cholesterol',
      value: 'hdlcholesterol',
      error: false,
      info: false
    },
    {
      label: 'INR',
      value: 'inr',
      error: true,
      info: true
    },
    {
      label: 'Fructosamine',
      value: 'fructosamine',
      error: true,
      info: true
    },
    {
      label: 'Thyroid function tests',
      value: 'thyroid functions tests',
      error: false,
      info: false
    }
  ];
  public selectizeOptions2: SelectizeCustomItemModel[] = <SelectizeCustomItemModel[]>[
    {
      label: 'Iron studies2',
      value: 'ironstudies',
      error: true,
      info: true
    },
    {
      label: 'Glucose fasting2',
      value: 'glucosefasting',
      error: false,
      info: false
    },
    {
      label: 'HbA1c2',
      value: 'hba1c',
      error: false,
      info: false
    },
  ];
  public selectizeOptions3: SelectizeCustomItemModel[] = <SelectizeCustomItemModel[]>[
    {
      label: 'Iron studies3',
      value: 'ironstudies',
      error: true,
      info: true
    },
    {
      label: 'Glucose fasting3',
      value: 'glucosefasting',
      error: false,
      info: false
    }
  ];
  public selectizeOptions4: SelectizeCustomItemModel[] = <SelectizeCustomItemModel[]>[
    {
      label: 'Iron studies4',
      value: 'ironstudies',
      error: true,
      info: true
    },
    {
      label: 'Glucose fasting4',
      value: 'glucosefasting',
      error: false,
      info: false
    }
  ];
  public selectedValues: string[] = [];

  private _selectedCustomSelectValue: SelectizeCustomItemModel[] = [];
  private _selectedCustomSelectValue2: SelectizeCustomItemModel[] = [];

  get selectedCustomSelectValue(): SelectizeCustomItemModel[] {
    return this._selectedCustomSelectValue;
  };
  set selectedCustomSelectValue(v: SelectizeCustomItemModel[]) {
    this._selectedCustomSelectValue = v;
    console.log(this._selectedCustomSelectValue.length);
    this.selectizeOptions2 = (this._selectedCustomSelectValue.length === 2) ? this.selectizeOptions3 : this.selectizeOptions4;
  };
  get selectedCustomSelectValue2(): SelectizeCustomItemModel[] {
    return this._selectedCustomSelectValue2;
  }
  set selectedCustomSelectValue2(v: SelectizeCustomItemModel[]) {
    this._selectedCustomSelectValue2 = v;
  };



  ngOnInit(): void {
    this.setMultiSelectizeConfig();
    this.selectedCustomSelectValue = [this.selectizeOptions[0], this.selectizeOptions[1], this.selectizeOptions[2], this.selectizeOptions[5]];
    this.selectedCustomSelectValue2 = [this.selectizeOptions2[1]];
  }

  private setMultiSelectizeConfig() {
     this.singleSelectizeConfig.label = 'Select a test';
     this.singleSelectizeConfig.mandatory = true;
     this.multiSelectizeConfig.create = true;
     this.multiSelectizeConfig.maxItems = null;
     this.multiSelectizeConfig.hideSelected = true;
     this.multiSelectizeConfig.mandatory = true;
     this.multiSelectizeConfig.label = 'Test(s) required';
     this.multiSelectizeConfig.help = 'Select 1 or more tests';
     this.customSelectizeConfig.create = true;
     this.customSelectizeConfig.maxItems = null;
     this.customSelectizeConfig.hideSelected = true;
     this.customSelectizeConfig.label = 'Test(s) required';
     this.customSelectizeConfig.help = 'Select 1 or more tests';
  }


  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointObserver, document);
  }
}
