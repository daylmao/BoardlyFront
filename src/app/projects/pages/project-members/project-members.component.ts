import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { EmployeeService } from '../../../employee-dashboard/services/employee.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidators } from '../../../utils/form-validator';
import { toast } from 'ngx-sonner';
import { EmployeesCardComponent } from '../../../shared/components/Employees-card/Employees-card.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-project-members',
  imports: [ReactiveFormsModule, PaginationComponent],
  templateUrl: './project-members.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectMembersComponent {
  private location = inject(Location);
  private employeeService = inject(EmployeeService);
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  validators = FormValidators;

  currentPageProject = signal(1);
  reloadTriggerProject = signal(0);

  currentPageCompany = signal(1);
  reloadTriggerCompany = signal(0);

  projectId = this.route.snapshot.paramMap.get('id');
  companyId = this.route.snapshot.parent?.paramMap.get('companyId');

  updateRolForm: FormGroup = this.fb.group({
    rolProyectoId: ['', Validators.required],
    proyectoId: ['', Validators.required],
  });

  assignForm: FormGroup = this.fb.group({
    rolProyectoId: ['', Validators.required],
    proyectoId: ['', Validators.required],
  });

  rolForm: FormGroup = this.fb.group({
    proyectoId: [''],
    nombre: [
      '',
      [
        Validators.required,
        Validators.maxLength(20),
        this.validators.firstLetterUppercase,
      ],
    ],
    descripcion: ['', [Validators.required, Validators.maxLength(30)]],
  });

  employeeResource = rxResource({
    request: () => ({
      proyectoId: this.projectId,
      numeroPagina: this.currentPageProject(),
      tamanoPagina: 10,
      reloadVersion: this.reloadTriggerProject(),
    }),
    loader: ({ request }) => {
      return this.employeeService.getEmployeesByProjectId(
        request.proyectoId!,
        request.numeroPagina,
        request.tamanoPagina
      );
    },
  });

  employeeCompaniesResource = rxResource({
    request: () => ({
      companyId: this.companyId,
      numeroPagina: this.currentPageCompany(),
      tamanoPagina: 10,
      reloadVersion: this.reloadTriggerCompany(),
    }),
    loader: ({ request }) => {
      return this.employeeService.getEmployeesByCompanyId(
        request.companyId!,
        request.numeroPagina,
        request.tamanoPagina
      );
    },
  });

  rolesProjectResource = rxResource({
    request: () => ({
      proyectoId: this.projectId,
      numeroPagina: 1,
      tamanoPagina: 100,
      reloadVersion: this.reloadTriggerProject(),
    }),
    loader: ({ request }) => {
      return this.projectService.getProjectRoles(
        request.proyectoId!,
        request.numeroPagina,
        request.tamanoPagina
      );
    },
  });

  ngOnInit() {
    this.updateRolForm.get('proyectoId')?.setValue(this.projectId);
    this.rolForm.get('proyectoId')?.setValue(this.projectId);
    this.assignForm.get('proyectoId')?.setValue(this.projectId);
  }

  onSubmit() {
    if (this.rolForm.invalid) {
      this.rolForm.markAllAsTouched();
      return;
    }

    this.projectService.createRolProject(this.rolForm.value).subscribe(() => {
      this.rolForm.reset();
      toast.success('Rol creado exitosamente');

      this.reloadTriggerProject.update((n) => n + 1);
      this.rolesProjectResource.reload();
    });
  }

  updateRol(employeeId: string) {
    if (this.updateRolForm.invalid) {
      this.updateRolForm.markAsTouched();
      return;
    }

    this.employeeService
      .updateEmployeeRol(employeeId, this.updateRolForm.value)
      .subscribe(() => {
        toast.success('Rol actualizado exitosamente');

        this.reloadTriggerProject.update((n) => n + 1);
        this.rolesProjectResource.reload();
      });
  }

  handlePageChangeProject(page: number) {
    this.currentPageProject.set(page);
    this.reloadTriggerProject.update((n) => n + 1);
    this.employeeResource.reload();
  }

  handlePageChangeCompany(page: number) {
    this.currentPageCompany.set(page);
    this.reloadTriggerCompany.update((n) => n + 1);
    this.employeeCompaniesResource.reload();
  }

  onAssign(employeeId: string) {
    this.employeeService
      .assignProjectByEmployeeId(employeeId, this.assignForm.value)
      .subscribe(() => {
        toast.success('Empleado agregado exitosamente');

        this.reloadTriggerProject.update((n) => n + 1);
        this.rolesProjectResource.reload();
      });
  }

  onDelete(employeeId: string) {
    this.employeeService
      .removeEmployeeFromProject(employeeId, this.projectId!)
      .subscribe(() => {
        toast.success('Empleado removido exitosamente');

        this.reloadTriggerProject.update((n) => n + 1);
        this.employeeResource.reload();
      });
  }

  goBack() {
    this.location.back();
  }
}
