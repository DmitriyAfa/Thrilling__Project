import { JsonSettings } from './jsonSettings';

import { FeatureFlags } from '@/shared/types/featureFlags';

/* eslint-disable no-unused-vars */
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

export interface User {
  id: string;
  username: string;
  avatar?: string;
  // Обязательность или не обязательность ролей roles зависит от бэкенда. Если всегда возвращает массив ролей, то обязателен. Иначе если не возвращает, то не обязателен.
  roles?: UserRole[];
  features?: FeatureFlags;
  jsonSettings?: JsonSettings;
}

export interface UserSchema {
  authData?: User;

  // Защищенные роуты - Подчеркивание говорит о том, что флаг нельзя менять вручную.
  _inited: boolean;
}
