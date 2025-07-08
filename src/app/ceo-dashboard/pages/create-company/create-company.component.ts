import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidators } from '../../../utils/form-validator';
import { AuthService } from '../../../auth/services/AuthService.service';
import { CeoService } from '../../services/Ceo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-create-company',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './create-company.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateCompanyComponent {
  private company = inject(CompanyService);
  private fb = inject(FormBuilder);
  private userId = inject(AuthService).user()?.uid;
  private route = inject(Router);
  private ceoService = inject(CeoService);
  readonly ceoIdSignal = toSignal(this.ceoService.getCeoId(this.userId!));
  validators = FormValidators;

  createCompanyForm: FormGroup = this.fb.group({
    ceoId: [null],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  readonly updateCeoIdEffect = effect(() => {
    const ceoId = this.ceoIdSignal();
    if (ceoId) {
      this.createCompanyForm.get('ceoId')?.setValue(ceoId);
    }
  });

  onSubmit() {
    if (this.createCompanyForm.invalid)
      return this.createCompanyForm.markAllAsTouched();

    this.company.createCompany(this.createCompanyForm.value).subscribe(() => {
      toast.success('Empresa creada con exito!');
      this.route.navigateByUrl('/');
    });
  }
}
