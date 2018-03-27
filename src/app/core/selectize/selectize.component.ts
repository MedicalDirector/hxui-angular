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

@Component({
  selector: 'app-selectize',
  templateUrl: './selectize.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class SelectizeComponent extends CoreBaseComponent implements OnInit {
  public selectizeConfig = new SelectizeConfig();
  public selectizeOptions = [
    {
      label: 'Angular',
      value: 'angular',
      code: 'NG'
    },
    {
      label: 'ReactJS',
      value: 'reactjs',
      code: 'RJS'
    },
    {
      label: 'Ember JS',
      value: 'emberjs',
      code: 'emjs'
    },
    {
      label: 'Ruby on Rails',
      value: 'ruby_on_rails',
      code: 'ROR'
    }
  ];

  ngOnInit(): void {
    this.selectizeConfig.create = true;
    this.selectizeConfig.maxItems = null;
    this.selectizeConfig.hideSelected = true;
  }

  constructor(
    protected pageScrollService: PageScrollService,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, document);
  }
}
