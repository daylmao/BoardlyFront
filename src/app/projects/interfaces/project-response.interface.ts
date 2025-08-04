export interface ProjectResponse {
  elementos: Project[];
  totalElementos: number;
  paginaActual: number;
  totalPaginas: number;
}

export interface Project {
  proyectoId: string;
  nombre: string;
  descripcion: string;
  fechaCreado: string;
  fechaInicio: string;
  fechaFin: string;
  estado: number;
  proyectoConteo: {
    conteoActividades: number;
    conteoTareas: number;
    conteoTareasCompletadas: number;
    conteoTareasPendientes: number;
  };
}
