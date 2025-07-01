import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormValidators } from '../../../utils/form-validator';

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

  showPassword = false;
  showConfirmPassword = false;

  registerForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(this.validators.namePattern)],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern(this.validators.namePattern)],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          FormValidators.validateUsername,
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.validators.emailPattern)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          FormValidators.passwordComplexity,
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [
        FormValidators.isFieldOneEqualFieldTwo('password', 'confirmPassword'),
      ],
    }
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
}
