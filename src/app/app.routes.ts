import { Routes } from '@angular/router';
import { PageInstallGuideComponent } from './page/install-guide/page-install-guide.component';
import { PageMigrateV13Component } from './page/migrate-v13/page-migrate-v13.component';
import { PageNotFoundComponent } from './page/not-found/page-not-found.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/install-guide', pathMatch: 'full' },
  { path: 'install-guide', component: PageInstallGuideComponent },
  { path: 'migrate-13', component: PageMigrateV13Component },
  {
    path: 'accordion',
    loadChildren: () =>
      import('./page/accordion/page-accordion.module').then(
        m => m.PageAccordionModule
      ),
  },
  {
    path: 'date-picker',
    loadChildren: () =>
      import('./page/date-picker/page-datepicker.module').then(
        m => m.PageDatepickerModule
      ),
  },
  {
    path: 'date-range-picker',
    loadChildren: () =>
      import('./page/date-range-picker/page-date-range-picker.module').then(
        m => m.PageDateRangePickerModule
      ),
  },
  {
    path: 'dropdown',
    loadChildren: () =>
      import('./page/dropdown/page-dropdown.module').then(
        m => m.PageDropdownModule
      ),
  },
  {
    path: 'dialog',
    loadChildren: () =>
      import('./page/dialog/page-dialog.module').then(m => m.PageDialogModule),
  },
  {
    path: 'inspector',
    loadChildren: () =>
      import('./page/inspector/page-inspector.module').then(
        m => m.PageInspectorModule
      ),
  },
  {
    path: 'online-status',
    loadChildren: () =>
      import('./page/online-status/page-online-status.module').then(
        m => m.PageOnlineStatusModule
      ),
  },
  {
    path: 'tooltip',
    loadChildren: () =>
      import('./page/tooltip/page-tooltip.module').then(
        m => m.PageTooltipModule
      ),
  },
  {
    path: 'pagination',
    loadChildren: () =>
      import('./page/pagination/page-pagination.module').then(
        m => m.PagePaginationModule
      ),
  },
  {
    path: 'tab',
    loadChildren: () =>
      import('./page/tab/page-tab.module').then(m => m.PageTabsModule),
  },
  {
    path: 'table',
    loadChildren: () =>
      import('./page/table/page-table.module').then(m => m.PageTableModule),
  },
  {
    path: 'autogrow',
    loadChildren: () =>
      import('./page/autogrow/page-autogrow.module').then(
        m => m.PageAutoGrowModule
      ),
  },
  {
    path: 'empty-state',
    loadChildren: () =>
      import('./page/empty-state/page-empty-state.module').then(
        m => m.PageEmptyStateModule
      ),
  },
  {
    path: 'text-input',
    loadChildren: () =>
      import('./page/text-input/page-text-input.module').then(
        m => m.PageTextInputModule
      ),
  },
  {
    path: 'filter',
    loadChildren: () =>
      import('./page/filter/page-filter.module').then(m => m.PageFilterModule),
  },
  {
    path: 'loader',
    loadChildren: () =>
      import('./page/loader/page-loader.module').then(m => m.PageLoaderModule),
  },
  {
    path: 'line-clamp',
    loadChildren: () =>
      import('./page/line-clamp/page-line-clamp.module').then(
        m => m.PageLineClampModule
      ),
  },
  {
    path: 'toast',
    loadChildren: () =>
      import('./page/toast/page-toast.module').then(m => m.PageToastModule),
  },
  {
    path: 'timepicker',
    loadChildren: () =>
      import('./page/timepicker/page-timepicker.module').then(
        m => m.PageTimepickerModule
      ),
  },
  {
    path: 'modal',
    loadChildren: () =>
      import('./page/modal/page-modal.module').then(m => m.PageModalModule),
  },
  {
    path: 'typeahead',
    loadChildren: () =>
      import('./page/typeahead/page-typeahead.module').then(
        m => m.PageTypeaheadModule
      ),
  },
  {
    path: 'select',
    loadChildren: () =>
      import('./page/select/page-select.module').then(m => m.PageSelectModule),
  },
  { path: '**', component: PageNotFoundComponent },
];
