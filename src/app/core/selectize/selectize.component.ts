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
import {ISelectizeItem} from '../../../../projects/hx-ui/src/lib/selectize/selectize-item.interface';
import {SelectizeCode} from './selectize.code';
import {SelectizeCustomItemModel} from './selectize-custom-item.model';
import {SelectizeCustomConfig} from './selectize-custom.config';

@Component({
  selector: 'app-selectize',
  templateUrl: './selectize.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class SelectizeComponent extends CoreBaseComponent implements OnInit {


  public selectedMultiSelectValue: string[] = [];
  public selectedCustomSelectValue: SelectizeCustomItemModel[] = [];
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
  public selectedValues: string[] = [];



  ngOnInit(): void {
    this.setMultiSelectizeConfig();
    this.selectedCustomSelectValue = [this.selectizeOptions[0], this.selectizeOptions[1], this.selectizeOptions[2], this.selectizeOptions[5]];
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
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, document);
  }
}
