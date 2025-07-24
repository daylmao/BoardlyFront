export interface Task {
  tareaId: string;
  proyectoId: string;
  titulo: string;
  estadoTarea: TaskStatus;
  descripcion: string | null;
  fechaInicio: Date;
  fechaVencimiento: Date;
  fechaActualizacion?: Date | null;
  fechaCreado: Date;
  actividadId: string;
}

export type TaskStatus =
  | 'Pendiente'
  | 'EnProceso'
  | 'EnRevision'
  | 'Finalizada';
