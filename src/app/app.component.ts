import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class AppComponent {
  nav = true;
  navs = [
    {
      cat: 'Getting started',
      items: [
        {
          name: 'Install guide',
          link: '/install-guide',
        },
        {
          name: 'Migrating to v13',
          link: '/migrate-13',
        },
      ],
    },
    {
      cat: 'Components',
      items: [
        {
          name: 'Accordions',
          link: '/accordion',
        },
        {
          name: 'Date Pickers',
          link: '/date-pickers',
        },
        {
          name: 'Date Range Pickers',
          link: '/date-range-pickers',
        },
        {
          name: 'Dropdowns',
          link: '/dropdowns',
        },
        {
          name: 'Dialogs',
          link: '/dialogs',
        },
        {
          name: 'Inspector',
          link: '/inspector',
        },
        {
          name: 'Modals',
          link: '/modals',
          deprecated: true,
        },
        {
          name: 'Pagination',
          link: '/pagination',
        },
        {
          name: 'Tabs',
          link: '/tabs',
        },
        {
          name: 'Tabular',
          link: '/tabular',
        },
        {
          name: 'Timepicker',
          link: '/time-picker',
        },
        {
          name: 'Tooltips',
          link: '/tooltips',
        },
        {
          name: 'Typeaheads',
          link: '/typeaheads',
        },
        {
          name: 'Toastr',
          link: '/toastr',
        },
        {
          name: 'Ng-Select',
          link: '/ng-select',
        },
        {
          name: 'Loaders',
          link: '/loaders',
        },
        {
          name: 'Line Clamp',
          link: '/line-clamp',
        },
      ],
    },
    {
      cat: 'Patterns',
      items: [
        {
          name: 'Empty States',
          link: '/empty-state',
        },
        {
          name: 'Filters',
          link: '/filters',
        },
      ],
    },
    {
      cat: 'Directives',
      items: [
        {
          name: 'Auto Grow',
          link: '/autogrow',
        },
        {
          name: 'Text Input',
          link: '/text-input',
        },
      ],
    },
    {
      cat: 'Services',
      items: [
        {
          name: 'Online Status',
          link: '/online-status',
        },
      ],
    },
    {
      cat: 'Other',
      items: [
        {
          name: 'Change Log (v11)',
          url: 'https://github.com/MedicalDirector/hxui-angular/blob/master/projects/hx-ui/CHANGELOG.md',
        },
        {
          name: 'Change Log (v8)',
          url: 'https://github.com/MedicalDirector/hxui-angular/blob/8.x/CHANGELOG.md',
        },
        {
          name: 'License',
          url: 'https://bitbucket.org/md-design/angular-hxui/src/master/LICENCE',
        },
      ],
    },
  ];
}
