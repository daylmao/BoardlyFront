import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import {
  CdkDragDrop,
  CdkDropListGroup,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { SignalRService } from '../../services/signalr.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivitiesService } from '../../../activities/services/activities.service';
import { BoardService } from '../../services/board.service';
import { toast } from 'ngx-sonner';
import { Task, TaskStatus } from '../../interfaces/task.interface';

type ColumnId = 'pendiente' | 'en-proceso' | 'en-revision' | 'finalizada';

@Component({
  selector: 'app-board-view',
  imports: [DragDropModule, CdkDropListGroup, DatePipe, RouterLink],
  templateUrl: './board-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardViewComponent implements OnDestroy {
  private signalRService = inject(SignalRService);
  private boardService = inject(BoardService);
  private route = inject(ActivatedRoute);
  private activityService = inject(ActivitiesService);
  private subscriptions: Subscription[] = [];

  readonly STATUS_MAP: Record<ColumnId, TaskStatus> = {
    pendiente: 'Pendiente',
    'en-proceso': 'EnProceso',
    'en-revision': 'EnRevision',
    finalizada: 'Finalizada',
  };

  readonly REVERSE_STATUS_MAP: Record<TaskStatus, ColumnId> = {
    Pendiente: 'pendiente',
    EnProceso: 'en-proceso',
    EnRevision: 'en-revision',
    Finalizada: 'finalizada',
  };

  readonly COLUMN_IDS = {
    PENDIENTE: 'pendiente' as ColumnId,
    EN_PROCESO: 'en-proceso' as ColumnId,
    EN_REVISION: 'en-revision' as ColumnId,
    FINALIZADA: 'finalizada' as ColumnId,
  };

  tasks = signal<Task[]>([]);
  pendienteTasks = computed(() => this.filterTasksByStatus('Pendiente'));
  enProcesoTasks = computed(() => this.filterTasksByStatus('EnProceso'));
  enRevisionTasks = computed(() => this.filterTasksByStatus('EnRevision'));
  finalizadaTasks = computed(() => this.filterTasksByStatus('Finalizada'));
  activityId = this.route.snapshot.params['activityId'];

  activityResource = rxResource({
    request: () => ({ activityId: this.activityId }),
    loader: ({ request }) => {
      return this.activityService.getActivities(request.activityId);
    },
  });

  ngOnInit() {
    this.setupSignalRConnection();
  }

  private setupSignalRConnection(): void {
    const connectionSub = this.signalRService
      .startConnection(this.activityId, 1, 100)
      .subscribe({
        next: (connected) => {
          if (connected) {
            this.setupSignalRSubscriptions();
          }
        },
        error: (err) => console.error('Error de conexión:', err),
      });

    this.subscriptions.push(connectionSub);
  }

  private setupSignalRSubscriptions(): void {
    this.subscriptions.push(
      this.signalRService.tareasPaginadas$.subscribe((tareas) => {
        this.tasks.set(tareas);
        console.log('Tareas iniciales recibidas:', tareas);
      }),

      this.signalRService.tareaEnPendiente$.subscribe((tarea) => {
        this.updateLocalTask(tarea);
      }),

      this.signalRService.tareaEnProceso$.subscribe((tarea) => {
        this.updateLocalTask(tarea);
      }),

      this.signalRService.tareaEnRevision$.subscribe((tarea) => {
        this.updateLocalTask(tarea);
      }),

      this.signalRService.tareaFinalizada$.subscribe((tarea) => {
        this.updateLocalTask(tarea);
      }),

      this.signalRService.nuevaTarea$.subscribe((tarea) => {
        this.addNewTask(tarea);
      }),

      this.signalRService.tareaActualizada$.subscribe((tarea) => {
        this.updateLocalTask(tarea);
      })
    );
  }

  private filterTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks().filter((task) => task.estadoTarea === status);
  }

  private updateLocalTask(updatedTask: Task): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.tareaId === updatedTask.tareaId ? updatedTask : task
      )
    );
  }

  private addNewTask(newTask: Task): void {
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  drop(event: CdkDragDrop<Task[]>) {
    const task = event.previousContainer.data[event.previousIndex];
    const previousStatus: TaskStatus = task.estadoTarea;
    const targetColumn = event.container.id as ColumnId;
    const newStatus = this.STATUS_MAP[targetColumn];

    if (previousStatus === 'Finalizada') {
      return;
    }

    if (newStatus === 'Finalizada' && previousStatus !== 'EnRevision') {
      toast.error('Solo puedes finalizar tareas que estén en revisión');
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const updatedTask = {
        ...task,
        estadoTarea: newStatus,
        enRevision: newStatus === 'Finalizada' ? true : task.enRevision,
      };

      this.updateLocalTask(updatedTask);

      switch (newStatus) {
        case 'Pendiente':
          this.signalRService.marcarEnPendiente(
            task.tareaId,
            updatedTask.enRevision
          );
          break;
        case 'EnProceso':
          this.signalRService.marcarEnProceso(
            task.tareaId,
            updatedTask.enRevision
          );
          break;
        case 'EnRevision':
          this.signalRService.marcarEnRevision(task.tareaId, true);
          break;
        case 'Finalizada':
          this.signalRService.marcarFinalizada(task.tareaId, true);
          break;
      }
    }
  }

  getColumnIdByStatus(status: TaskStatus): ColumnId {
    return this.REVERSE_STATUS_MAP[status];
  }

  deleteTask(taskId: string) {
    this.boardService.deleteTask(taskId).subscribe({
      next: () => {
        toast.success('Tarea eliminada exitosamente');
        this.tasks.update((tasks) => tasks.filter((t) => t.tareaId !== taskId));
      },
      error: (err) => toast.error('Error al eliminar la tarea'),
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.signalRService.disconnect();
  }
}
