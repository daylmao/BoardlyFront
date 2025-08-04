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
import { Task, TaskStatus } from '../../interfaces/task.interface';
import { SignalRService } from '../../services/signalr.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivitiesService } from '../../../activities/services/activities.service';
import CreateTaskComponent from '../create-task/create-task.component';
import { BoardService } from '../../services/board.service';
import { toast } from 'ngx-sonner';

type ColumnId = 'pendiente' | 'en-proceso' | 'en-revision' | 'finalizada';

@Component({
  selector: 'app-board-view',
  imports: [DragDropModule, CdkDropListGroup, DatePipe, RouterLink],
  templateUrl: './board-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardViewComponent {
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
  showModal = signal(false);

  ngOnInit() {
    const connectionSub = this.signalRService
      .startConnection(this.activityId, 1, 100)
      .subscribe({
        next: (connected) => {
          if (connected) {
            this.subscriptions.push(
              this.signalRService.tareasPaginadas$.subscribe((tareas) => {
                this.tasks.set(tareas);
                console.log('Tareas recibidas:', tareas);
              }),
              this.signalRService.tareaEnPendiente$.subscribe((tareaId) => {
                this.updateLocalTaskStatus(tareaId, 'Pendiente');
              }),

              this.signalRService.tareaEnProceso$.subscribe((tareaId) => {
                this.updateLocalTaskStatus(tareaId, 'EnProceso');
              }),

              this.signalRService.tareaEnRevision$.subscribe((tareaId) => {
                this.updateLocalTaskStatus(tareaId, 'EnRevision');
              }),

              this.signalRService.tareaFinalizada$.subscribe((tareaId) => {
                this.updateLocalTaskStatus(tareaId, 'Finalizada');
              })
            );
          }
        },
        error: (err) => console.error('Error de conexión:', err),
      });

    this.subscriptions.push(connectionSub);
  }

  private filterTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks().filter((task) => task.estadoTarea === status);
  }

  private updateLocalTaskStatus(tareaId: string, newStatus: TaskStatus) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.tareaId === tareaId
          ? {
              ...task,
              estadoTarea: newStatus,
            }
          : task
      )
    );
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus =
        this.STATUS_MAP[event.container.id as ColumnId] || 'Pendiente';

      this.updateLocalTaskStatus(task.tareaId, newStatus);

      switch (newStatus) {
        case 'Pendiente':
          this.signalRService.marcarEnPendiente(task.tareaId);
          break;
        case 'EnProceso':
          this.signalRService.marcarEnProceso(task.tareaId);
          break;
        case 'EnRevision':
          this.signalRService.marcarEnRevision(task.tareaId);
          break;
        case 'Finalizada':
          this.signalRService.marcarFinalizada(task.tareaId);
          break;
        default:
          break;
      }
    }
  }

  getColumnIdByStatus(status: TaskStatus): ColumnId {
    return this.REVERSE_STATUS_MAP[status];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  deleteTask(taskId: string) {
    console.log(taskId);
    this.boardService.deleteTask(taskId).subscribe(() => {
      toast.success('Tarea eliminada exitosamente');
    });
  }
}
