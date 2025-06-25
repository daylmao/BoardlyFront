import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavComponent } from '../../../shared/components/nav/nav.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {}
