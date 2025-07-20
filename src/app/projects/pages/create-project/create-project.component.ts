import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ProjectService } from '../../services/project.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../employee-dashboard/services/employee.service';
import { EmployeeResponse } from '../../../employee-dashboard/interfaces/EmployeeResponse.interface';
import { FormValidators } from '../../../utils/form-validator';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-create-project',
  imports: [ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateProjectComponent {
  private projectServices = inject(ProjectService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  validators = FormValidators;

  empleados = signal<EmployeeResponse[]>([]);
  companyId: string | null = null;

  projectForm: FormGroup = this.fb.group({
    empresaId: [null],
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    descripcion: ['', [Validators.required, Validators.maxLength(250)]],
    fechaInicio: [null, [Validators.required]],
    fechaFin: [null, [Validators.required]],
    estado: [0, [Validators.required]],
    empleadoId: [null, [Validators.required]],
  });

  cargarEmpleados() {
    if (this.companyId) {
      this.employeeService
        .getEmployeeByCompanyId(this.companyId)
        .subscribe((data) => {
          this.empleados.set(data);
        });
    }
  }

  ngOnInit() {
    this.companyId = this.route.parent?.snapshot.paramMap.get('companyId')!;
    this.projectForm.get('empresaId')?.setValue(this.companyId);
    this.cargarEmpleados();
  }

  onSubmit() {
    if (this.projectForm.invalid) return this.projectForm.markAllAsTouched();

    const formValue = {
      ...this.projectForm.value,
      fechaInicio: new Date(this.projectForm.value.fechaInicio).toISOString(),
      fechaFin: new Date(this.projectForm.value.fechaFin).toISOString(),
    };

    this.projectServices.createProject(formValue).subscribe(() => {
      toast.success('Proyecto creado exitosamente!');
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
