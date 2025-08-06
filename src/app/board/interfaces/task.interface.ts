export interface Task {
  tareaId: string;
  proyectoId: string;
  titulo: string;
  estadoTarea: TaskStatus;
  descripcion: string;
  fechaInicio: string | Date;
  fechaVencimiento: string | Date;
  fechaActualizacion: string | Date;
  fechaCreado: string | Date;
  actividadId: string;
  usuarioFotoPerfil: UsuarioFotoPerfilDto[];
  archivo?: string;
  enRevision: boolean;
}
export interface UsuarioFotoPerfilDto {
  usuarioId: string;
  fotoPerfil: string;
}

export type TaskStatus =
  | 'Pendiente'
  | 'EnProceso'
  | 'EnRevision'
  | 'Finalizada';
