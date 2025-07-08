export interface RespuestaEmpresas {
  elementos: Empresa[];
  totalElementos: number;
  paginaActual: number;
  totalPaginas: number;
}

export interface Empresa {
  empresaId: string;
  ceoId: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  estado: string;
}
