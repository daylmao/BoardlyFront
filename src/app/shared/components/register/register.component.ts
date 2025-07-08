import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  Output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormValidators } from '../../../utils/form-validator';
import { UserRequest } from '../../../auth/interfaces/UserRequest.interface';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private location = inject(Location);
  private fb = inject(FormBuilder);
  validators = FormValidators;
  register = output<FormData>();

  showPassword = false;
  showConfirmPassword = false;
  image: File | undefined = undefined;
  tempImage = signal<string>('');

  registerForm: FormGroup = this.fb.group(
    {
      Nombre: [
        '',
        [Validators.required, Validators.pattern(this.validators.namePattern)],
      ],
      Apellido: [
        '',
        [Validators.required, Validators.pattern(this.validators.namePattern)],
      ],
      NombreUsuario: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          FormValidators.validateUsername,
        ],
      ],

      FotoPerfil: ['', Validators.required],

      Correo: [
        '',
        [Validators.required, Validators.pattern(this.validators.emailPattern)],
      ],
      Contrasena: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          FormValidators.passwordComplexity,
        ],
      ],

      // confirmarContrasena: ['', Validators.required],
    }
    // {
    //   validators: [
    //     FormValidators.isFieldOneEqualFieldTwo(
    //       'contrasena',
    //       'confirmarContrasena'
    //     ),
    //   ],
    // }
  );

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (!this.image) {
      return;
    }

    const formData = new FormData();
    Object.entries(this.registerForm.value).forEach(([key, value]) => {
      if (key !== 'FotoPerfil') {
        formData.append(key, String(value));
      }
    });

    formData.append('FotoPerfil', this.image);

    this.register.emit(formData);
  }

  onFilesChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.image = file;

      if (this.tempImage()) {
        URL.revokeObjectURL(this.tempImage());
      }

      const imageUrl = URL.createObjectURL(file);
      this.tempImage.set(imageUrl);
    }
  }
}
