import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { UserDetails } from '../../../auth/interfaces/UserDetails.interface';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../auth/services/AuthService.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { toast } from 'ngx-sonner';
import { FormValidators } from '../../../utils/form-validator';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  private readonly router = inject(Router);
  private fb = inject(FormBuilder);
  validators = FormValidators;
  id = inject(AuthService).user()!.uid;

  userDetails = input.required<UserDetails>();
  reloadTrigger = signal(0);

  profileForm = this.fb.group({
    nombre: this.fb.control(''),
    apellido: this.fb.control(''),
  });

  ngOnInit() {
    this.profileForm.patchValue({
      nombre: this.userDetails().nombre,
      apellido: this.userDetails().apellido,
    });
  }
  Logout() {
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }

  onSubmitName() {
    const nombre = this.profileForm.get('nombre')?.value;
    if (!nombre) return;

    this.profileService
      .updateUserName(this.id, { propiedad: nombre })
      .subscribe(() => {
        toast.success('Nombre actualizado correctamente');
        window.location.reload();
      });
  }

  onSubmitLastName() {
    const apellido = this.profileForm.get('apellido')?.value;
    if (!apellido) return;

    this.profileService
      .updateLastName(this.id, { propiedad: apellido })
      .subscribe(() => {
        window.location.reload();
        toast.success('Apellido actualizado correctamente');
      });
  }

  showPasswordModal = signal(false);

  passwordForm: FormGroup = this.fb.group(
    {
      contrasenaAntigua: ['', [Validators.required]],
      nuevaContrasena: [
        '',
        [
          Validators.required,
          Validators.required,
          Validators.minLength(8),
          FormValidators.passwordComplexity,
        ],
      ],
      confirmacionDeContrsena: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          FormValidators.passwordComplexity,
        ],
      ],
    },
    {
      validators: FormValidators.isFieldOneEqualFieldTwo(
        'nuevaContrasena',
        'confirmacionDeContrsena'
      ),
    }
  );

  changePassword() {
    if (this.passwordForm.invalid) return;

    this.profileService
      .changePassword(this.id, this.passwordForm.value!)
      .subscribe(() => {
        toast.success('Contraseña actualizada exitosamente!');
        this.passwordForm.reset();
        this.showPasswordModal.set(false);
      });
  }
}
