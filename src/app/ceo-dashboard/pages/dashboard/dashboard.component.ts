import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { CeoStatsComponent } from '../../components/ceo-stats/ceo-stats.component';
import { CompaniesComponent } from '../../components/Companies/Companies.component';
import { CeoSidebarComponent } from '../../components/ceo-sidebar/ceo-sidebar.component';
import { CeoProjectsComponent } from '../../components/ceo-projects/ceo-projects.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CeoStatsComponent,
    CompaniesComponent,
    CeoSidebarComponent,
    CeoProjectsComponent,
    NavComponent,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {}
