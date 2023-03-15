/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text';
import { Loader } from 'shared/ui/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
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
      <div className={classNames(cls.ProfileCard, [className, cls.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <div className={classNames(cls.ProfileCard, [className], mods)}>
      {data?.avatar && (
        <div className={cls.avatarWrapper}>
          <Avatar
            src={data?.avatar}
            size={200}
          />
        </div>
      )}
      <div className={cls.data}>
        <Input
          value={data?.first}
          placeholder={t('Ваше имя')}
          className={cls.input}
          onChange={onCnahngeFirstname}
          readonly={readonly}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
          onChange={onCnahngeLastname}
          readonly={readonly}
        />
        <Input
          type="number"
          value={data?.age}
          placeholder={t('Ваш возраст')}
          className={cls.input}
          onChange={onCnahngeAge}
          readonly={readonly}
        />
        <Input
          value={data?.city}
          placeholder={t('Ваш город')}
          className={cls.input}
          onChange={onCnahngeCity}
          readonly={readonly}
        />
        <Input
          value={data?.username}
          placeholder={t('Имя пользователя')}
          className={cls.input}
          onChange={onCnahngeUsername}
          readonly={readonly}
        />
        <Input
          value={data?.avatar}
          placeholder={t('Ссылка на аватар')}
          className={cls.input}
          onChange={onCnahngeAvatar}
          readonly={readonly}
        />
        {/* Функционал валют */}
        <CurrencySelect
          className={cls.input}
          value={data?.currency}
          onChange={onCnahngeCurrency}
          readonly={readonly}
        />
        {/* Функционал обновления страны */}
        <CountrySelect
          className={cls.input}
          value={data?.country}
          onChange={onCnahngeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  );
};
