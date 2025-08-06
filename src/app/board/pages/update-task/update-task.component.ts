import { DatePipe, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { BoardService } from '../../services/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { EmployeeService } from '../../../employee-dashboard/services/employee.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../../auth/services/AuthService.service';

@Component({
  selector: 'app-update-task',
  imports: [ReactiveFormsModule],
  templateUrl: './update-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateTaskComponent {
  private location = inject(Location);
  private boardService = inject(BoardService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userId = inject(AuthService).user()?.uid;
  private employeeService = inject(EmployeeService);
  private fb = inject(FormBuilder);

  taskId = this.route.snapshot.paramMap.get('id')!;
  projectId =
    this.route.parent?.parent?.parent?.snapshot.paramMap.get('projectId');

  activityId = this.route.parent?.snapshot.paramMap.get('activityId');

  paginaActual = signal(1);
  totalElementos = signal(0);

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
  selectedEmployees = new Set<string>();

  updateTaskForm: FormGroup = this.fb.group({
    usuarioId: [''],
    empleadoIds: [[]],
    descripcion: ['', [Validators.required]],
    titulo: ['', Validators.required],
  });

  private _loadData = this.boardService
    .getTaskById(this.taskId)
    .subscribe((Task) => {
      if (!Task) return;
      this.updateTaskForm.patchValue(Task);

      if (Task.empleadoTareaDto && Array.isArray(Task.empleadoTareaDto)) {
        for (const empleado of Task.empleadoTareaDto) {
          this.selectedEmployees.add(empleado.empleadoId);
        }
      }
    });

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

  goBack() {
    this.location.back();
  }

  taskResource = rxResource({
    request: () => ({ taskId: this.taskId }),
    loader: ({ request }) => {
      return this.boardService.getTaskById(request.taskId!);
    },
  });

  onSubmit() {
    if (this.updateTaskForm.invalid)
      return this.updateTaskForm.markAllAsTouched();

    this.updateTaskForm.get('usuarioId')?.setValue(this.userId);

    this.updateTaskForm
      .get('empleadoIds')
      ?.setValue(this.getSelectedEmployeeIds());

    this.boardService
      .updateTaskById(this.taskId!, this.updateTaskForm.value)
      .subscribe(() => {
        toast.success('Tarea actualizada exitosamente');
        this.router.navigate(['../..'], { relativeTo: this.route });
      });
  }
}
