import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import {
  fetchProfileData,
  ProfileCard,
  profileReducer,
  getProfileIsLoading,
  getProfileError,
  profileActions,
  getProfileReadonly,
  getProfileForm,
  getProfileValidateErrors,
  ValidateProfileErrors,
} from 'entities/Profile';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DynamicModelLoader, ReducersList } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = () => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation('Profile');
  const dispatch = useAppDispatch();

  const formData = useSelector(getProfileForm);
  const isLodaing = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);

  useEffect(() => {
    // Разделение сред выполнения кода
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchProfileData());
    }
  }, [dispatch]);

  // Валидация - правильные переводы для ошибок

  const validateErrorTranslate = {
    [ValidateProfileErrors.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
    [ValidateProfileErrors.ICORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileErrors.INCORRECT_COUNTRY]: t('Неккоректная страна'),
    [ValidateProfileErrors.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileErrors.NO_DATA]: t('Отсутствуют данные'),
  };

  /*
    Функции для изменения полей в state схожи. Вроде бы можно было бы сделать
    одну функцию вместо всех функций ниже и передавать разные аргументы или
    сделать логику основанную на data-атрибутах или name-атрибутах.
    Но в реальной разработке для каждого поля есть своя логика, валидации и
    какие-то проверки поэтому вариант с общей функцией отпадает.
   */
  const onCnahngeFirstname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ first: value || '' }));
  }, [dispatch]);

  const onCnahngeLastname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastname: value || '' }));
  }, [dispatch]);

  const onCnahngeAge = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
  }, [dispatch]);

  const onCnahngeCity = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ city: value || '' }));
  }, [dispatch]);

  const onCnahngeUsername = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ username: value || '' }));
  }, [dispatch]);

  const onCnahngeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ avatar: value || '' }));
  }, [dispatch]);

  // Функционал валют

  const onCnahngeCurrency = useCallback((currency?: Currency) => {
    dispatch(profileActions.updateProfile({ currency }));
  }, [dispatch]);

  // Функционал обновления страны

  const onCnahngeCountry = useCallback((country?: Country) => {
    dispatch(profileActions.updateProfile({ country }));
  }, [dispatch]);

  return (
    <DynamicModelLoader reducer={reducers} key="profile" removeAfterUnmount>
      <div>
        <ProfilePageHeader />
        {validateErrors?.length && validateErrors.map((err) => (
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
          onCnahngeFirstname={onCnahngeFirstname}
          onCnahngeLastname={onCnahngeLastname}
          onCnahngeAge={onCnahngeAge}
          onCnahngeCity={onCnahngeCity}
          onCnahngeUsername={onCnahngeUsername}
          onCnahngeAvatar={onCnahngeAvatar}
          onCnahngeCurrency={onCnahngeCurrency}
          onCnahngeCountry={onCnahngeCountry}
          readonly={readonly}
        />
      </div>
    </DynamicModelLoader>
  );
};

export default ProfilePage;
