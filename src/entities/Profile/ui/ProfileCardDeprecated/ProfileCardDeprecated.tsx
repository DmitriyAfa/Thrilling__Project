import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

import cls from './ProfileCardDeprecated.module.scss';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Text as TextDeprecated, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('Profile');
  return (
    <HStack justify='center' max className={classNames(cls.ProfileCard, [cls.error])}>
      <TextDeprecated
        theme={TextTheme.ERROR}
        title={t('Произошла ошибка при загрузке профиля')}
        text={t('Попробуйте обновить страницу')}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => (
  <HStack
    justify='center'
    max
    className={classNames(cls.ProfileCard, [cls.loading])}
  >
    <Loader />
  </HStack>
);

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onCnahngeFirstname,
    onCnahngeLastname,
    onCnahngeAge,
    onCnahngeCity,
    onCnahngeUsername,
    onCnahngeAvatar,
    onCnahngeCurrency,
    onCnahngeCountry,
  } = props;

  const { t } = useTranslation('Profile');

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack gap='12' max className={classNames(cls.ProfileCard, [className], mods)}>
      {data?.avatar && (
        <HStack
          justify='center'
          max
        >
          <AvatarDeprecated
            src={data?.avatar}
            size={200}
          />
        </HStack>
      )}
      <InputDeprecated
        value={data?.first}
        placeholder={t('Ваше имя')}
        onChange={onCnahngeFirstname}
        readonly={readonly}
        data-testid='ProfileCard.Firstname'
      />
      <InputDeprecated
        value={data?.lastname}
        placeholder={t('Ваша фамилия')}
        onChange={onCnahngeLastname}
        readonly={readonly}
        data-testid='ProfileCard.Lastname'
      />
      <InputDeprecated
        type='number'
        value={data?.age}
        placeholder={t('Ваш возраст')}
        onChange={onCnahngeAge}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.city}
        placeholder={t('Ваш город')}
        onChange={onCnahngeCity}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.username}
        placeholder={t('Имя пользователя')}
        onChange={onCnahngeUsername}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.avatar}
        placeholder={t('Ссылка на аватар')}
        onChange={onCnahngeAvatar}
        readonly={readonly}
      />
      <CurrencySelect
        value={data?.currency}
        onChange={onCnahngeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        value={data?.country}
        onChange={onCnahngeCountry}
        readonly={readonly}
      />
    </VStack>
  );
});