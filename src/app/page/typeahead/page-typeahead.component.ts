import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TextInputDirective } from '@hxui/angular';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageTypeaheadCode } from './page-typeahead.code';

@Component({
  selector: 'app-page-typeahead',
  templateUrl: './page-typeahead.component.html',
  styles: [':host { display: contents; }'],
})
export class PageTypeaheadComponent implements AfterViewInit {
  code = new PageTypeaheadCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'Predefined example', link: 'example-predefined' },
    { text: 'API reference', link: 'api' },
  ];

  @ViewChild('phoneTypeahead', { read: TextInputDirective })
  txtInputDirective: TextInputDirective;

  selected: string;
  states: string[] = [
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
    'SALBUTAMOL injection 1mg/mL',
  ];

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
    this.txtInputDirective.styleLabel();
  }

  onSelect($event) {
    this.txtInputDirective.styleLabel();
  }

  onBlur() {
    console.log('on blur!');
  }
}
