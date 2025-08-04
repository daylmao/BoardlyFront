export interface PaginatedElement {
  elementos: EmployeeTaskInfo[];
  totalElementos: number;
  paginaActual: number;
  totalPaginas: number;
}

export interface EmployeeTaskInfo {
  empleadoId: string;
  nombreCompleto: string;
  posicion: string;
  fotoPerfil: string;
}
