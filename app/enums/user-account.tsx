import { ShieldCheck, Wrench, User } from 'lucide-react';
import type { ReactNode } from 'react';

export enum UserRole {
  GLOBAL_ADMIN = 'GLOBAL_ADMIN',
  IT_TECHNICIAN = 'IT_TECHNICIAN',
  ADMIN = 'ADMIN',
}

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.GLOBAL_ADMIN]: 'Quản trị hệ thống',
  [UserRole.IT_TECHNICIAN]: 'IT',
  [UserRole.ADMIN]: 'Quản trị viên',
};

export const ROLE_STYLES: Record<UserRole, string> = {
  [UserRole.GLOBAL_ADMIN]: 'bg-blue-500 text-white',
  [UserRole.IT_TECHNICIAN]: 'bg-green-500 text-white',
  [UserRole.ADMIN]: 'bg-yellow-500 text-black',
};

export const ROLE_ICONS: Record<UserRole, ReactNode> = {
  [UserRole.GLOBAL_ADMIN]: <ShieldCheck className="w-4 h-4 mr-1" />,
  [UserRole.IT_TECHNICIAN]: <Wrench className="w-4 h-4 mr-1" />,
  [UserRole.ADMIN]: <User className="w-4 h-4 mr-1" />,
};
