import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidators } from '../../../utils/form-validator';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VerifyEmailComponent {
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  validators = FormValidators;

  userId = this.route.snapshot.paramMap.get('userId') ?? '';

  loading = signal(false);

  verifyEmailForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(6)]],
  });

  onSubmit() {
    if (this.verifyEmailForm.invalid) {
      this.verifyEmailForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.authService
      .confirmCeoAccount(this.userId, this.verifyEmailForm.get('code')?.value)
      .pipe(switchMap(() => this.authService.giveCeoRol(this.userId)))
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigateByUrl('auth/success-register');
        },
        complete: () => this.loading.set(false),
      });
  }

  goBack() {
    this.location.back();
  }
}
