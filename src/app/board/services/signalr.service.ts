import { Injectable, inject } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection?: signalR.HubConnection;

  // Subject para las tareas paginadas
  private tareasPaginadasSubject = new Subject<any>();
  public tareasPaginadas$ = this.tareasPaginadasSubject.asObservable();

  // Subjects para actualizaciones de estado
  private tareaEnProcesoSubject = new Subject<string>();
  private tareaEnRevisionSubject = new Subject<string>();
  private tareaFinalizadaSubject = new Subject<string>();

  public tareaEnProceso$ = this.tareaEnProcesoSubject.asObservable();
  public tareaEnRevision$ = this.tareaEnRevisionSubject.asObservable();
  public tareaFinalizada$ = this.tareaFinalizadaSubject.asObservable();

  public startConnection(
    actividadId: string,
    numeroPagina: number,
    tamanoPagina: number
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

    // Configurar handlers
    this.hubConnection.on('RecibirTareasPaginadas', (tareas) => {
      this.tareasPaginadasSubject.next(tareas);
    });

    this.hubConnection.on('RecibirTareaEnProceso', (tareaId) => {
      this.tareaEnProcesoSubject.next(tareaId);
    });

    this.hubConnection.on('RecibirTareaEnRevision', (tareaId) => {
      this.tareaEnRevisionSubject.next(tareaId);
    });

    this.hubConnection.on('RecibirTareaFinalizada', (tareaId) => {
      this.tareaFinalizadaSubject.next(tareaId);
    });

    return new Observable((observer) => {
      this.hubConnection
        ?.start()
        .then(() => {
          observer.next(true);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }

  // Métodos para cambiar estado
  marcarEnProceso(tareaId: string) {
    this.hubConnection?.send('MarcarEnProceso', tareaId);
  }

  marcarEnRevision(tareaId: string) {
    this.hubConnection?.send('MarcarEnRevision', tareaId).catch((err) => {
      console.error('Error al marcar en revisión:', err);
    });
  }

  marcarFinalizada(tareaId: string) {
    this.hubConnection?.send('MarcarFinalizada', tareaId);
  }
}
