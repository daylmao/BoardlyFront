export interface ProjectInfo {
  titulo: string;
  estado: 'En Proceso' | 'Completado' | 'Pendiente';
  descripcion: string;
  nombreEncargado: string;
  fechaEntrega: Date;
  miembros: number;
}
