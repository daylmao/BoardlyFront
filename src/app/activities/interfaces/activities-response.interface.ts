export interface Activities {
  actividadId: string;
  proyectoId: string;
  nombre: string;
  prioridad: string;
  descripcion: string;

  actividadConteo: {
    totalTareas: number;
    totalTareasProceso: number;
    totalTareasFinalizadas: number;
  };
  estado: string;
  fechaInicio: string;
  fechaFin: string;
  orden: number;
}

export interface PaginatedActivitiesResponse {
  elementos: Activities[];
  totalElementos: number;
  paginaActual: number;
  totalPaginas: number;
}
