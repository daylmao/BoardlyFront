import { Injectable, inject } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection?: signalR.HubConnection;

  // Subjects para las notificaciones
  private tareasPaginadasSubject = new Subject<Task[]>();
  private tareaPendienteSubject = new Subject<Task>();
  private tareaEnProcesoSubject = new Subject<Task>();
  private tareaEnRevisionSubject = new Subject<Task>();
  private tareaFinalizadaSubject = new Subject<Task>();
  private nuevaTareaSubject = new Subject<Task>();
  private tareaActualizadaSubject = new Subject<Task>();

  // Observables públicos
  public tareasPaginadas$ = this.tareasPaginadasSubject.asObservable();
  public tareaEnPendiente$ = this.tareaPendienteSubject.asObservable();
  public tareaEnProceso$ = this.tareaEnProcesoSubject.asObservable();
  public tareaEnRevision$ = this.tareaEnRevisionSubject.asObservable();
  public tareaFinalizada$ = this.tareaFinalizadaSubject.asObservable();
  public nuevaTarea$ = this.nuevaTareaSubject.asObservable();
  public tareaActualizada$ = this.tareaActualizadaSubject.asObservable();

  public startConnection(
    actividadId: string,
    numeroPagina: number = 1,
    tamanoPagina: number = 10
  ): Observable<boolean> {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `http://localhost:5207/hubs/tareas?actividadId=${actividadId}&numeroPagina=${numeroPagina}&tamanoPagina=${tamanoPagina}`,
        {
          accessTokenFactory: () => localStorage.getItem('token') || '',
        }
      )
      .withAutomaticReconnect()
      .build();

    this.setupHubHandlers();

    return new Observable((observer) => {
      this.hubConnection
        ?.start()
        .then(() => {
          observer.next(true);
          observer.complete();
        })
        .catch((err) => {
          console.error('Error al conectar con SignalR:', err);
          observer.error(err);
        });
    });
  }

  private setupHubHandlers(): void {
    if (!this.hubConnection) return;

    this.hubConnection.on('RecibirTareasPaginadas', (tareas: Task[]) => {
      this.tareasPaginadasSubject.next(tareas);
    });

    this.hubConnection.on('RecibirTareaEnPendiente', (tarea: Task) => {
      this.tareaPendienteSubject.next(tarea);
    });

    this.hubConnection.on('RecibirTareaEnProceso', (tarea: Task) => {
      this.tareaEnProcesoSubject.next(tarea);
    });

    this.hubConnection.on('RecibirTareaEnRevision', (tarea: Task) => {
      this.tareaEnRevisionSubject.next(tarea);
    });

    this.hubConnection.on('RecibirTareaFinalizada', (tarea: Task) => {
      this.tareaFinalizadaSubject.next(tarea);
    });

    this.hubConnection.on('RecibirNuevaTarea', (tarea: Task) => {
      this.nuevaTareaSubject.next(tarea);
    });

    this.hubConnection.on('ActualizarTarea', (tarea: Task) => {
      this.tareaActualizadaSubject.next(tarea);
    });
  }

  public marcarEnPendiente(tareaId: string, enRevision: boolean = false): void {
    this.hubConnection
      ?.invoke('MarcarEnPendiente', tareaId, enRevision)
      .catch((err) => console.error('Error al marcar en pendiente:', err));
  }

  public marcarEnProceso(tareaId: string, enRevision: boolean = false): void {
    this.hubConnection
      ?.invoke('MarcarEnProceso', tareaId, enRevision)
      .catch((err) => console.error('Error al marcar en proceso:', err));
  }

  public marcarEnRevision(tareaId: string, enRevision: boolean = true): void {
    this.hubConnection
      ?.invoke('MarcarEnRevision', tareaId, enRevision)
      .catch((err) => console.error('Error al marcar en revisión:', err));
  }

  public marcarFinalizada(tareaId: string, enRevision: boolean = true): void {
    this.hubConnection
      ?.invoke('MarcarFinalizada', tareaId, enRevision)
      .catch((err) => console.error('Error al marcar finalizada:', err));
  }

  public disconnect(): void {
    this.hubConnection
      ?.stop()
      .then(() => console.log('Desconectado de SignalR'))
      .catch((err) => console.error('Error al desconectar:', err));
  }
}
