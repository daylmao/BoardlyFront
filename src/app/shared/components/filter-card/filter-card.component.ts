import { JsonPipe, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/AuthService.service';
import { UserRole } from '../../enums/UserRole.enum';

@Component({
  selector: 'app-filter-card',
  imports: [RouterLink],
  templateUrl: './filter-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  private location = inject(Location);
  private auth = inject(AuthService);
  rol = this.auth.hasRole([UserRole.Ceo, UserRole.Encargado]);

  title = input.required<string>();
  buttonName = input.required<string>();
  buttonRoute = input.required<string[]>();
  projects = input<number>();

  goBack() {
    this.location.back();
  }
}
