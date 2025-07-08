// register-ceo.component.ts
import { Component, inject, signal } from '@angular/core';
import RegisterComponent from '../../../shared/components/register/register.component';
import { AuthService } from '../../services/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-ceo',
  imports: [RegisterComponent],
  templateUrl: './register-ceo.component.html',
})
export default class RegisterCeoComponent {
  router = inject(Router);
  private service = inject(AuthService);
  loading = signal(false);

  onSubmit(data: FormData) {
    this.loading.set(true);
    this.service.register(data).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.router.navigate(['auth/verify-email/', response.usuarioId]);
      },
      error: () => this.loading.set(false),
    });
  }
}
