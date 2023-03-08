import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

// все поля необязательны - это случай когда профиль не заполнен вообще
export interface Profile {
  first?: string;
  lastname?: string;
  age?: number,
  // Функционал валют
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
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
 Использется в profileSlice.
*/
export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}