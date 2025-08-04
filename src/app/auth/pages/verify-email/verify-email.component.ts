import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidators } from '../../../utils/form-validator';
import { finalize, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VerifyEmailComponent {
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  validators = FormValidators;
  loading = signal(false);

  userId = this.route.snapshot.paramMap.get('userId') ?? '';
  empresaId = this.route.snapshot.paramMap.get('empresaId');

  verifyEmailForm = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(6)]],
  });

  onSubmit() {
    if (this.verifyEmailForm.invalid) {
      this.verifyEmailForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const code = this.verifyEmailForm.get('code')?.value;

    this.auth
      .confirmAccount(this.userId, code!)
      .pipe(
        switchMap(() => {
          if (this.empresaId) {
            return this.auth.giveEmployeeRol({
              usuarioId: this.userId,
              empresaId: this.empresaId,
            });
          } else {
            return this.auth.giveCeoRol(this.userId);
          }
        }),
        tap(() => this.router.navigateByUrl('/auth/success-register')),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        error: (err) => {
          console.error('Error during verification:', err);
        },
      });
  }

  goBack() {
    this.location.back();
  }
}
