import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormValidators {
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    const control = form.controls[fieldName];
    return control.errors && (control.dirty || control.touched);
  }

  static emailPattern = `^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`;
  static slugPattern = '^[a-z0-9_]+(?:-[a-z0-9_]+)*$';

  static passwordComplexity(control: AbstractControl) {
    const value = control.value ?? '';

    if (!/[A-Z]/.test(value)) return { missingUppercase: true };
    if (!/[a-z]/.test(value)) return { missingLowercase: true };
    if (!/\d/.test(value)) return { missingNumber: true };

    return null;
  }

  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return `El email ingresado no es valido`;
          }
          return 'El formato es inválido';

        case 'missingUppercase':
          return 'La contraseña debe tener al menos una letra mayúscula';

        case 'missingLowercase':
          return 'La contraseña debe tener al menos una letra minúscula';

        case 'missingNumber':
          return 'La contraseña debe tener al menos un número';
        case 'minlength':
          return `Este campo debe de tener al menos ${errors['minlength'].requiredLength} caracteres`;
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
