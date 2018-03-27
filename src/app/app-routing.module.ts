import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { WelcomeComponent } from './core/welcome/welcome.component';
import { DatepickersComponent } from './core/datepicker/datepickers.component';
import { DropdownsComponent } from './core/dropdowns/dropdowns.component';
import { ModalsComponent } from './core/modals/modals.component';
import { TabsComponent } from './core/tabs/tabs.component';
import { TypeaheadsComponent } from './core/typeaheads/typeaheads.component';
import { TooltipsComponent } from './core/tooltips/tooltips.component';
import { PaginationComponent } from './core/pagination/pagination.component';
import { TabularComponent } from './core/tabular/tabular.component';
import { InstallGuideComponent } from './core/install-guide/install-guide.component';
import { SelectizeComponent } from 'app/core/selectize/selectize.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome',  component: WelcomeComponent },
  { path: 'install-guide',  component: InstallGuideComponent },
  { path: 'datepickers',  component: DatepickersComponent },
  { path: 'dropdowns',  component: DropdownsComponent },
  { path: 'modals',  component: ModalsComponent },
  { path: 'tabs',  component: TabsComponent },
  { path: 'typeaheads',  component: TypeaheadsComponent },
  { path: 'tooltips',  component: TooltipsComponent },
  { path: 'pagination',  component: PaginationComponent },
  { path: 'tabular',  component: TabularComponent },
  { path: 'selectize',  component: SelectizeComponent },
  { path: '**',  component: PageNotFoundComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
