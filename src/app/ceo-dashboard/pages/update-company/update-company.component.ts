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

  companyId = this.route.snapshot.params['id'];

  updateCompanyForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    estado: ['', Validators.required],
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
