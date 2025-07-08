import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { UserDetails } from '../../../auth/interfaces/UserDetails.interface';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../auth/services/AuthService.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-profile',
  imports: [NavComponent, DatePipe],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private readonly router = inject(Router);
  id = inject(AuthService).user()!.uid;

  userDetails = input.required<UserDetails>();

  Logout() {
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }
}
