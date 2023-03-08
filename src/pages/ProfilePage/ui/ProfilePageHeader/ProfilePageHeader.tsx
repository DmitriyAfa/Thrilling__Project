import { getProfileReadonly, profileActions } from 'entities/Profile';
import { updateProfileData } from 'entities/Profile/model/service/updateProfileData/updateProfileData';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Text } from 'shared/ui/Text';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps { className?: string; }

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const {
    className,
  } = props;
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  //  Функционал редактирования формы.
  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);
  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  // Функционал обновления формы на сервере (put-запрос)
  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  const { t } = useTranslation('Profile');
  return (
    <div className={classNames(cls.ProfilePageHeader, [className])}>
      <Text title={t('Профиль пользователя')} />
      {readonly
        ? (
          <Button
            className={cls.editBtn}
            theme={ButtonTheme.OUTLINE}
            onClick={onEdit}
          >
            {t('Редактировать')}
          </Button>
        ) : (
          <>
            <Button
              className={cls.editBtn}
              theme={ButtonTheme.OUTLINE_RED}
              onClick={onCancelEdit}
            >
              {t('Отменить')}
            </Button>
            <Button
              className={cls.onSaveBtn}
              theme={ButtonTheme.OUTLINE}
              onClick={onSave}
            >
              {t('Сохранить')}
            </Button>
          </>
        )}
    </div>
  );
};
