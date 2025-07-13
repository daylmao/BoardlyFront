export interface JwtPayload {
  sub: string;
  roles: string;
  exp: number;
  ceoId: string;
  email: string;
}
