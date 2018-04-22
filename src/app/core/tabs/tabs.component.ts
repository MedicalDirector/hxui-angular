import {Component, Inject, OnInit} from '@angular/core';
import {CoreBaseComponent} from '../core-base.component';
import {PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';
import {TabsCode} from './tabs.code';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class TabsComponent extends CoreBaseComponent implements OnInit {

  code = new TabsCode();
  public tabs: any[] = [
    {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
    {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true},
    {title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true},
    {title: 'Dynamic Title 4', content: 'Dynamic content 4', customClass: 'customClass'}
  ];

  public alertMe(): void {
    setTimeout(function (): void {
      alert('You\'ve selected the alert tab!');
    });
  }

  public setActiveTab(index: number): void {
    this.tabs[index].active = true;
  }

  public removeTabHandler(): void {
    console.log('Remove Tab handler');
  }

  public onSelect(tabz): void {
    //tabz.active = true;
    console.log('Selected:', tabz);
  }

  public onDeselect(tabz): void {
    //tabz.active = false;
    console.log('Deselected:', tabz);
  }

  constructor(protected pageScrollService: PageScrollService,
              @Inject(DOCUMENT) protected document: any) {
    super(pageScrollService, document);
  }

  ngOnInit() {
  }

}
