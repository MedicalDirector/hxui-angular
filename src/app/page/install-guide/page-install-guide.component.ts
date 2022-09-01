import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageInstallGuideCode } from './page-install-guide.code';

@Component({
  selector: 'app-page-install-guide',
  templateUrl: './page-install-guide.component.html',
  styles: [':host { display: contents; }'],
})
export class PageInstallGuideComponent {
  code = new PageInstallGuideCode();
  contents: Contents[] = [
    { text: 'Installation', link: 'install' },
    { text: 'Setup', link: 'setup' },
    { text: 'Notes', link: 'notes' },
  ];
}
