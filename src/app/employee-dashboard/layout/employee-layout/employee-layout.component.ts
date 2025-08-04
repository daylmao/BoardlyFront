import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/AuthService.service';
import { NavComponent } from '../../../shared/components/nav/nav.component';

@Component({
  selector: 'app-employee-layout',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './employee-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeLayoutComponent {
  id = inject(AuthService).user()!.uid;
}
