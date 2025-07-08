import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { AuthService } from '../../../auth/services/AuthService.service';

@Component({
  selector: 'app-dashboard',
  imports: [NavComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  id = inject(AuthService).user()!.uid;
}
