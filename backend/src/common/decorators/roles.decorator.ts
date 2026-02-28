import { UserRole } from '@/resource/users/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'Roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
