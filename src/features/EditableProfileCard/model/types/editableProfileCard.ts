/* eslint-disable no-unused-vars */

import { Profile } from 'entities/Profile';

// Валидация
export enum ValidateEditableProfileCardErrors {
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  ICORRECT_AGE = 'ICORRECT_AGE',
  INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR'
}

/*
 Функционал редактирования формы.
-
 Релизация функционала отмены редактирования - нужно вернуть
 первоначальное состояние в котором форма была.
-
 В схеме профиля есть поле data в котором храним данные которые получили с сервера.
 В поле form будем хранить то, что изменил сам пользователь.
 -
 Использется в editableProfileCardSlice.
*/
export interface EditableProfileCardSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  // Валидация
  validateErrors?: ValidateEditableProfileCardErrors[];
}