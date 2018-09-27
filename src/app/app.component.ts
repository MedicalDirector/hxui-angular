import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease-in-out', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})

export class AppComponent {
  nav = true;
  navs = [
    {
      cat: 'Getting started',
      items: [
        {
          name: 'Welcome',
          link: '/welcome'
        },
        {
          name: 'Install guide',
          link: '/install-guide'
        }
      ]
    },
    {
      cat: 'Components',
      items: [
        {
          name: 'Accordions',
          link: '/accordion'
        },
        {
          name: 'Datepickers',
          link: '/datepickers'
        },
        {
          name: 'Dropdowns',
          link: '/dropdowns'
        },
        {
          name: 'Modals',
          link: '/modals'
        },
        {
          name: 'Pagination',
          link: '/pagination'
        },
        {
          name: 'Tabs',
          link: '/tabs'
        },
        {
          name: 'Tabular',
          link: '/tabular'
        },
        {
          name: 'Tooltips',
          link: '/tooltips'
        },
        {
          name: 'Typeaheads',
          link: '/typeaheads'
        },
        {
          name: 'Selectize',
          link: '/selectize'
        },
        {
          name: 'Loaders',
          link: '/loaders'
        }
      ]
    },
    {
      cat: 'Patterns',
      items: [
        {
          name: 'Empty States',
          link: '/empty-state'
        },
        {
          name: 'Filters',
          link: '/filters'
        }
      ]
    },
    {
      cat: 'Directives',
      items: [
        {
          name: 'Auto Grow',
          link: '/autogrow'
        },
      ]
    }
    // {
    //   cat: 'Feedback',
    //   items: [
    //     {
    //       name: 'Feedback',
    //       url: 'https://bitbucket.org/md-design/angular-hxui'
    //     }
    //   ]
    // }
  ];
}
