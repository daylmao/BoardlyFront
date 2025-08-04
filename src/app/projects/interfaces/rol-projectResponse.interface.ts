export interface rolInfo {
  rolProyectoId: string;
  nombre: string;
  descripcion: string;
}

export interface rolProjectResponse {
  elementos: rolInfo[];
  totalElementos: number;
  paginaActual: number;
  totalPaginas: number;
}
