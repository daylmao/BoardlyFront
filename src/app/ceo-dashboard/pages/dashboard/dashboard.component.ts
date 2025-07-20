import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { CeoStatsComponent } from '../../components/ceo-stats/ceo-stats.component';
import { CompaniesComponent } from '../../../companies/components/companies/companies.component';
import { CeoSidebarComponent } from '../../components/ceo-sidebar/ceo-sidebar.component';
import { CeoProjectsComponent } from '../../components/ceo-projects/ceo-projects.component';
import { AuthService } from '../../../auth/services/AuthService.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CeoStatsComponent,
    CompaniesComponent,
    CeoSidebarComponent,
    CeoProjectsComponent,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {}
