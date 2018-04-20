import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll';
import { CoreBaseComponent } from '../core-base.component';
import { DOCUMENT } from '@angular/platform-browser';
import { SelectizeConfig } from 'modules/selectize/selectize.config';
import {ISelectizeItem} from '../../../modules/selectize/selectize-item.interface';

@Component({
  selector: 'app-selectize',
  templateUrl: './selectize.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class SelectizeComponent extends CoreBaseComponent implements OnInit {

  public multiSelectizeConfig = new SelectizeConfig();
  public singleSelectizeConfig = new SelectizeConfig();
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


  ngOnInit(): void {
    this.setMultiSelectizeConfig();
  }

  private setMultiSelectizeConfig() {
     this.multiSelectizeConfig.create = true;
     this.multiSelectizeConfig.maxItems = null;
     this.multiSelectizeConfig.hideSelected = true;
  }


  constructor(
    protected pageScrollService: PageScrollService,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, document);
  }
}
