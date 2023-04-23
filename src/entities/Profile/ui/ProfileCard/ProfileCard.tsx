/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text';
import { Loader } from '@/shared/ui/Loader';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  // Колбэки не обязательны, чтобы в storybook небыло необходимости передавать множество колбэков
  // Так же в теории карточка может быть не изменяема
  onCnahngeFirstname?: (value?: string) => void;
  onCnahngeLastname?: (value?: string) => void;
  onCnahngeAge?: (value?: string) => void;
  onCnahngeCity?: (value?: string) => void;
  onCnahngeUsername?: (value?: string) => void;
  onCnahngeAvatar?: (value?: string) => void;
  onCnahngeCurrency?: (currency?: Currency) => void;
  onCnahngeCountry?: (country?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    error,
    isLoading,
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

  if (isLoading) {
    return (
      <HStack justify="center" max className={classNames(cls.ProfileCard, [className, cls.loading])}>
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack justify="center" max className={classNames(cls.ProfileCard, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack gap="12" max className={classNames(cls.ProfileCard, [className], mods)}>
      {data?.avatar && (
        <HStack
          justify="center"
          max
        >
          <Avatar
            src={data?.avatar}
            size={200}
          />
        </HStack>
      )}
      <Input
        value={data?.first}
        placeholder={t('Ваше имя')}
        onChange={onCnahngeFirstname}
        readonly={readonly}
        data-testid="ProfileCard.Firstname"
      />
      <Input
        value={data?.lastname}
        placeholder={t('Ваша фамилия')}
        onChange={onCnahngeLastname}
        readonly={readonly}
        data-testid="ProfileCard.Lastname"
      />
      <Input
        type="number"
        value={data?.age}
        placeholder={t('Ваш возраст')}
        onChange={onCnahngeAge}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        placeholder={t('Ваш город')}
        onChange={onCnahngeCity}
        readonly={readonly}
      />
      <Input
        value={data?.username}
        placeholder={t('Имя пользователя')}
        onChange={onCnahngeUsername}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t('Ссылка на аватар')}
        onChange={onCnahngeAvatar}
        readonly={readonly}
      />
      {/* Функционал валют */}
      <CurrencySelect
        value={data?.currency}
        onChange={onCnahngeCurrency}
        readonly={readonly}
      />
      {/* Функционал обновления страны */}
      <CountrySelect
        value={data?.country}
        onChange={onCnahngeCountry}
        readonly={readonly}
      />
    </VStack>
  );
};
