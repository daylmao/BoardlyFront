export interface TaskDetails {
  titulo: string;
  estadoTarea: string;
  archivos: string;
  descripcion: string;
  fechaInicio: string;
  fechaVencimiento: string;
  comentarioDto: {
    comentarioId: string;
    texto: string;
    usuario: {
      usuarioId: string;
      nombreCompleto: string;
      fotoPerfil: string | null;
    };
  };
  empleadoTareaDto: Array<{
    empleadoId: string;
    nombreCompleto: string;
    rol: string;
    fotoPerfil: string;
  }>;
}
