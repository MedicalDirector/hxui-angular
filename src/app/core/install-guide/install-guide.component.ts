import { Component, OnInit } from '@angular/core';
import {InstallGuideCode} from './install-guide.code';

@Component({
  selector: 'app-install-guide',
  templateUrl: './install-guide.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class InstallGuideComponent implements OnInit {

  code = new InstallGuideCode();

  constructor() { }

  ngOnInit() {
  }

}
