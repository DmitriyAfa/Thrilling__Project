import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

// все поля необязательны - это случай когда профиль не заполнен вообще
export interface Profile {
  id?: string;
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