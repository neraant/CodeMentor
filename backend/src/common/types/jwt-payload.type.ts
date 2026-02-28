import { UserRole } from './user.type';

export interface JwtPayload {
  sub: string;
  role: UserRole;
  iat: number;
  exp: number;
}
