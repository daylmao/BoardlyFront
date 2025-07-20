import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/AuthService.service';

@Component({
  selector: 'app-project-layout',
  imports: [RouterOutlet],
  templateUrl: './project-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectLayoutComponent {
  id = inject(AuthService).user()!.uid;
}
