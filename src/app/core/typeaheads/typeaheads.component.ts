import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import {DOCUMENT} from '@angular/common';
import {CoreBaseComponent} from '../core-base.component';
import {TypeaheadsCode} from './typeaheads.code';
import {BreakpointObserver} from '@angular/cdk/layout';
import {TextInputDirective} from '../../../../projects/hx-ui/src/lib/text-input/text-input.directive';

@Component({
  selector: 'app-typeaheads',
  templateUrl: './typeaheads.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class TypeaheadsComponent extends CoreBaseComponent implements OnInit, AfterViewInit {

  @ViewChild('phoneTypeahead', { read: TextInputDirective, static: false }) txtInputDirective: TextInputDirective;

  code = new TypeaheadsCode();
  public selected: string;
  public states: string[] = [
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

  public selected_number;
  public phone_numbers: {category:  string; type: string, number: string}[] = [
    { category: 'Saved Phone Numbers', type: 'icon-mobile', number: '0405238765' },
    { category: 'Saved Phone Numbers', type: 'icon-telephone', number: '(03) 97275154' },
    { category: 'Saved Phone Numbers', type: 'icon-mobile', number: '0404235766' }
  ];

  constructor(protected pageScrollService: PageScrollService,
              protected breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) protected document: any) {
    super(pageScrollService, breakpointObserver, document);
  }

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
