import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormValidators {
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    const control = form.controls[fieldName];
    return control.errors && (control.dirty || control.touched);
  }

  static emailPattern = `^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`;
  static namePattern = "^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'][a-zA-ZáéíóúÁÉÍÓÚüÜñÑ']*$";
  static usernamePattern = '^[a-zA-Z][a-zA-Z0-9_!.-]*$';

  static passwordComplexity(control: AbstractControl) {
    const value = control.value ?? '';

    if (!/[A-Z]/.test(value)) return { missingUppercase: true };
    if (!/[a-z]/.test(value)) return { missingLowercase: true };
    if (!/\d/.test(value)) return { missingNumber: true };

    return null;
  }

  static validateUsername(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    if (!value) return null;

    if (!/^[a-zA-Z]/.test(value)) {
      return { invalidStart: true };
    }

    if (!/^[a-zA-Z0-9_-]*$/.test(value.slice(1))) {
      return { invalidChars: true };
    }

    return null;
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      if (field1Value && field2Value) {
        if (field1Value !== field2Value) {
          formGroup.get(field2)?.setErrors({ passwordsNotMatch: true });
        } else {
          formGroup.get(field2)?.setErrors(null);
        }
      }
      return null;
    };
  }

  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Campo requerido';

        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return 'Email no válido';
          }

          return 'Formato incorrecto';

        case 'missingUppercase':
          return 'Requiere mayúscula';

        case 'missingLowercase':
          return 'Requiere minúscula';

        case 'missingNumber':
          return 'Requiere un número';

        case 'minlength':
          return `Mín. ${errors['minlength'].requiredLength} caracteres`;

        case 'passwordsNotMatch':
          return 'Las contraseñas no coinciden';

        case 'invalidStart':
          return 'Debe iniciar con una letra';
        case 'invalidChars':
          return 'Este caracter no es valido';
      }
    }
    return null;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormValidators.getTextError(errors);
  }
}
