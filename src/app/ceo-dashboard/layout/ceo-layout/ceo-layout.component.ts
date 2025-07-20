import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { AuthService } from '../../../auth/services/AuthService.service';

@Component({
  selector: 'app-ceo-layout',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './ceo-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CeoLayoutComponent {
  id = inject(AuthService).user()!.uid;
}
