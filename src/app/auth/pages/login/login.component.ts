import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormValidators } from '../../../utils/form-validator';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/AuthService.service';
import { UserRole } from '../../../shared/enums/UserRole.enum';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private location = inject(Location);
  private fb = inject(FormBuilder);
  validators = FormValidators;
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  OnSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email, password).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        if (this.authService.hasRole(UserRole.Student)) {
          this.router.navigateByUrl('/ceo-dashboard');
        } else {
          this.router.navigateByUrl('/');
        }
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
