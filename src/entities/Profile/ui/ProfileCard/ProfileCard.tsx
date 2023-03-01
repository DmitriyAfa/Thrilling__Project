import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Text } from 'shared/ui/Text';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps { className?: string; }

export const ProfileCard = ({ className }: ProfileCardProps) => {
  const { t } = useTranslation('Profile');
  const data = useSelector(getProfileData);
  const isLodaing = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  return (
    <div className={classNames(cls.ProfileCard, [className])}>
      <div className={cls.header}>
        <Text title={t('Профиль пользователя')} />
        <Button
          className={cls.editBtn}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Редактировать')}
        </Button>
      </div>
      <div className={cls.data}>
        <Input
          value={data?.first}
          placeholder={t('Ваша имя')}
          className={cls.input}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
        />
      </div>
    </div>
  );
};
