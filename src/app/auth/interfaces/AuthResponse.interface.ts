export interface AuthResponse {
  isSuccess: boolean;
  usuarioId: string;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  correo: string;
  estado: string;
  fotoPerfil: string;
  jwtToken: string;
  errorMessage: string | null;
}
