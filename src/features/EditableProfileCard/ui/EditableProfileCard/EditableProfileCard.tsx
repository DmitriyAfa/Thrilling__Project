import { ProfileCard } from 'entities/Profile';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme } from 'shared/ui/Text';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { DynamicModelLoader, ReducersList } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { VStack } from 'shared/ui/Stack';
import {
  getEditableProfileCardError,
} from '../../model/selectors/getEditableProfileCardError/getEditableProfileCardError';
import {
  getEditableProfileCardForm,
} from '../../model/selectors/getEditableProfileCardForm/getEditableProfileCardForm';
import { editableProfileCardActions, editableProfileCardReducer } from '../../model/slice/editableProfileCardSlice';
import {
  getEditableProfileCardIsLoading,
} from '../../model/selectors/getEditableProfileCardIsLoading/getEditableProfileCardIsLoading';
import {
  getEditableProfileCardReadonly,
} from '../../model/selectors/getEditableProfileCardReadonly/getEditableProfileCardReadonly';
import {
  fetchEditableProfileCardData,
} from '../../model/service/fetchEditableProfileCardData/fetchEditableProfileCardData';
import {
  ValidateEditableProfileCardErrors,
} from '../../model/types/editableProfileCard';
import {
  getEditableProfileCardValidateErrors,
} from '../../model/selectors/getEditableProfileCardValidateErrors/getEditableProfileCardValidateErrors';
import { EditableProfileHeader } from '../EditableProfileHeader/EditableProfileHeader';

const reducers: ReducersList = {
  editableProfileCard: editableProfileCardReducer,
};

interface EditableProfileCardProps {
  className?: string;
  id?: string;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const formData = useSelector(getEditableProfileCardForm);
  const isLodaing = useSelector(getEditableProfileCardIsLoading);
  const error = useSelector(getEditableProfileCardError);
  const readonly = useSelector(getEditableProfileCardReadonly);
  const validateErrors = useSelector(getEditableProfileCardValidateErrors);

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchEditableProfileCardData(id));
    }
  });

  // Валидация - правильные переводы для ошибок

  const validateErrorTranslate = {
    [ValidateEditableProfileCardErrors.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
    [ValidateEditableProfileCardErrors.ICORRECT_AGE]: t('Некорректный возраст'),
    [ValidateEditableProfileCardErrors.INCORRECT_COUNTRY]: t('Неккоректная страна'),
    [ValidateEditableProfileCardErrors.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateEditableProfileCardErrors.NO_DATA]: t('Отсутствуют данные'),
  };

  /*
    Функции для изменения полей в state схожи. Вроде бы можно было бы сделать
    одну функцию вместо всех функций ниже и передавать разные аргументы или
    сделать логику основанную на data-атрибутах или name-атрибутах.
    Но в реальной разработке для каждого поля есть своя логика, валидации и
    какие-то проверки поэтому вариант с общей функцией отпадает.
   */
  const onCnahngeFirstname = useCallback((value?: string) => {
    dispatch(editableProfileCardActions.updateeditableProfileCard({ first: value || '' }));
  }, [dispatch]);

  const onCnahngeLastname = useCallback((value?: string) => {
    dispatch(editableProfileCardActions.updateeditableProfileCard({ lastname: value || '' }));
  }, [dispatch]);

  const onCnahngeAge = useCallback((value?: string) => {
    dispatch(editableProfileCardActions.updateeditableProfileCard({ age: Number(value || 0) }));
  }, [dispatch]);

  const onCnahngeCity = useCallback((value?: string) => {
    dispatch(editableProfileCardActions.updateeditableProfileCard({ city: value || '' }));
  }, [dispatch]);

  const onCnahngeUsername = useCallback((value?: string) => {
    dispatch(editableProfileCardActions.updateeditableProfileCard({ username: value || '' }));
  }, [dispatch]);

  const onCnahngeAvatar = useCallback((value?: string) => {
    dispatch(editableProfileCardActions.updateeditableProfileCard({ avatar: value || '' }));
  }, [dispatch]);

  // Функционал валют

  const onCnahngeCurrency = useCallback((currency?: Currency) => {
    dispatch(editableProfileCardActions.updateeditableProfileCard({ currency }));
  }, [dispatch]);

  // Функционал обновления страны

  const onCnahngeCountry = useCallback((country?: Country) => {
    dispatch(editableProfileCardActions.updateeditableProfileCard({ country }));
  }, [dispatch]);

  return (
    <DynamicModelLoader reducer={reducers} key="profile" removeAfterUnmount>
      <VStack max gap="16" className={className}>
        <EditableProfileHeader />
        {validateErrors?.length && validateErrors.map((err: ValidateEditableProfileCardErrors) => (
          <Text
            key={err}
            theme={TextTheme.ERROR}
            text={validateErrorTranslate[err]}
          />
        ))}
        <ProfileCard
          data={formData}
          isLoading={isLodaing}
          error={error}
          readonly={readonly}
          onCnahngeFirstname={onCnahngeFirstname}
          onCnahngeLastname={onCnahngeLastname}
          onCnahngeAge={onCnahngeAge}
          onCnahngeCity={onCnahngeCity}
          onCnahngeUsername={onCnahngeUsername}
          onCnahngeAvatar={onCnahngeAvatar}
          onCnahngeCurrency={onCnahngeCurrency}
          onCnahngeCountry={onCnahngeCountry}
        />
      </VStack>
    </DynamicModelLoader>
  );
});