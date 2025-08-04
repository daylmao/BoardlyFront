export interface TaskDetails {
  titulo: string;
  estadoTarea: string;
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
  empleadoTareaDto: {
    empleadoId: string;
    nombreCompleto: string;
    rol: string;
    fotoPerfil: string;
  };
}
