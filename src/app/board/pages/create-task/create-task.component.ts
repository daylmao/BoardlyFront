import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import { EmployeeService } from '../../../employee-dashboard/services/employee.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidators } from '../../../utils/form-validator';
import { AuthService } from '../../../auth/services/AuthService.service';
import { BoardService } from '../../services/board.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateTaskComponent {
  onFileChange($event: Event) {
    throw new Error('Method not implemented.');
  }
  private location = inject(Location);
  private employeeService = inject(EmployeeService);
  private boardService = inject(BoardService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private userId = inject(AuthService).user()?.uid;
  private router = inject(Router);
  validators = FormValidators;
  register = output<FormData>();

  paginaActual = signal(1);
  totalElementos = signal(0);

  projectId =
    this.route.parent?.parent?.parent?.snapshot.paramMap.get('projectId');

  activityId = this.route.parent?.snapshot.paramMap.get('activityId');

  employeeResource = rxResource({
    request: () => ({
      projectId: this.projectId,
      numeroPagina: this.paginaActual(),
      tamanoPagina: 30,
    }),
    loader: ({ request }) => {
      return this.employeeService.getEmployeesByProjectId(
        request.projectId!,
        request.numeroPagina,
        request.tamanoPagina
      );
    },
  });
  goBack() {
    this.location.back();
  }
  selectedEmployees = new Set<string>();

  toggleEmployeeSelection(employeeId: string) {
    if (this.selectedEmployees.has(employeeId)) {
      this.selectedEmployees.delete(employeeId);
    } else {
      this.selectedEmployees.add(employeeId);
    }
  }

  getSelectedEmployeeIds(): string[] {
    return Array.from(this.selectedEmployees);
  }

  // getSelectedEmployeeIds(): string | null {
  //   const ids = Array.from(this.selectedEmployees);
  //   return ids.length > 0 ? ids[0] : null;
  // }

  createTaskForm: FormGroup = this.fb.group({
    ProyectoId: [''],
    UsuarioId: [''],
    EmpleadoIds: [[]],
    Titulo: ['', Validators.required],
    Descripcion: ['', [Validators.required]],
    FechaVencimiento: [null, [Validators.required]],
    FechaInicio: [null, [Validators.required]],
    ActividadId: [''],
  });

  onSubmit() {
    if (this.createTaskForm.invalid)
      return this.createTaskForm.markAllAsTouched();

    this.createTaskForm.get('ProyectoId')?.setValue(this.projectId);
    this.createTaskForm.get('UsuarioId')?.setValue(this.userId);
    this.createTaskForm.get('ActividadId')?.setValue(this.activityId);

    this.createTaskForm
      .get('EmpleadoIds')
      ?.setValue(this.getSelectedEmployeeIds());

    const formValue = {
      ...this.createTaskForm.value,
      FechaInicio: new Date(
        this.createTaskForm.value.FechaInicio
      ).toISOString(),
      FechaVencimiento: new Date(
        this.createTaskForm.value.FechaVencimiento
      ).toISOString(),
    };

    this.boardService.createTask(formValue).subscribe(() => {
      toast.success('Tarea creada exitosamente');
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }
}
