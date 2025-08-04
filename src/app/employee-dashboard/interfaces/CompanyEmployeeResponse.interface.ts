export interface Empresa {
  empresaId: string;
  ceoId: string;
  nombre: string;
  proyectoEmpresa: {
    nombre: string;
    proyectoId: string;
    descripcion: string;
  };
  descripcion: string;
  rol: string;
  actividadesCount: number;
  tareasCount: number;
  estadoTareaCount: number;
  fechaFinalizacion: string;
  estado: EstadoEmpresa;
}

export interface RespuestaEmpresasPaginadas {
  elementos: Empresa[];
  totalElementos: number;
  paginaActual: number;
  totalPaginas: number;
}
export enum EstadoEmpresa {
  EnProceso = 'EnProceso',
  Completado = 'Completado',
  Pendiente = 'Pendiente',
  Cancelado = 'Cancelado',
}
