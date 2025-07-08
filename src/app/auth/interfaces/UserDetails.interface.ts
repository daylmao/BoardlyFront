export interface UserDetails {
  usuarioId: string;
  nombre: string;
  apellido: string;
  correo: string;
  nombreUsuario: string;
  fechaCreacion: Date | string;
  estado: 'Activo' | 'Inactivo' | 'Pendiente' | 'Bloqueado';
  fotoPerfil: string;
  fechaRegistro: Date | string;
}
