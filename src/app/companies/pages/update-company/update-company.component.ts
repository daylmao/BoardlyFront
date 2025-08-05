import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CompanyService } from '../../services/Company.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toast } from 'ngx-sonner';
import { FormValidators } from '../../../utils/form-validator';
import { rxResource } from '@angular/core/rxjs-interop';
import { signal, effect } from '@angular/core';

@Component({
  selector: 'app-edit-company',
  imports: [ReactiveFormsModule],
  templateUrl: './update-company.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditCompanyComponent {
  private fb = inject(FormBuilder);
  private companyService = inject(CompanyService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  validators = FormValidators;
  companyId = this.route.snapshot.params['id'];

  updateCompanyForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    estado: ['', Validators.required],
  });

  companyResource = rxResource({
    request: () => ({
      companyId: this.companyId,
    }),
    loader: ({ request }) => {
      return this.companyService.getCompanyById(request.companyId!);
    },
  });

  private _loadData = this.companyService
    .getCompanyById(this.companyId)
    .subscribe((company) => {
      if (!company) return;
      this.updateCompanyForm.patchValue(company);
    });

  onSubmit() {
    if (this.updateCompanyForm.invalid)
      return this.updateCompanyForm.markAllAsTouched();

    this.companyService
      .updateCompany(this.companyId, this.updateCompanyForm.value)
      .subscribe(() => {
        toast.success('Empresa actualizada con exito!');
        this.router.navigateByUrl('/');
      });
  }
}
