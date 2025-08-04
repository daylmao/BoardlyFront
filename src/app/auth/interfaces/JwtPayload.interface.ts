export interface JwtPayload {
  sub: string;
  roles: string;
  exp: number;
  ceoId?: string;
  empleadoId?: string;
  email: string;
}
