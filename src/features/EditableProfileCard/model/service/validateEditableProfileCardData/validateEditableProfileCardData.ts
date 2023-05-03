import { ValidateEditableProfileCardErrors } from '../../types/editableProfileCard';

import { Profile } from '@/entities/Profile';
// Валидация
export const validateEditableProfileCardData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateEditableProfileCardErrors.NO_DATA];
  }
  const {
    first,
    lastname,
    age,
    country,
  } = profile;

  const errors: ValidateEditableProfileCardErrors[] = [];

  if (!first || !lastname) {
    errors.push(ValidateEditableProfileCardErrors.INCORRECT_USER_DATA);
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateEditableProfileCardErrors.ICORRECT_AGE);
  }

  if (!country) {
    errors.push(ValidateEditableProfileCardErrors.INCORRECT_COUNTRY);
  }

  return errors;
};