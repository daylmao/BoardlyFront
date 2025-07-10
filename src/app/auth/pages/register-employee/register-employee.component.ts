import { Component, inject, signal } from '@angular/core';
import RegisterComponent from '../../../shared/components/register/register.component';
import { AuthService } from '../../services/AuthService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-register-employee',
  imports: [RegisterComponent, SpinnerComponent],
  templateUrl: './register-employee.component.html',
})
export default class RegisterEmployeeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(AuthService);
  loading = signal(false);

  onSubmit(data: FormData) {
    const empresaId = this.route.snapshot.paramMap.get('empresaId');
    if (!empresaId) return;

    this.loading.set(true);
    this.service.register(data).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.router.navigate([
          'auth/verify-email',
          response.usuarioId,
          empresaId,
        ]);
      },
      error: () => this.loading.set(false),
    });
  }
}
