import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Text } from 'shared/ui/Text';
import { getUserAuthData } from 'entities/User';
import {
  getEditableProfileCardData,
} from '../../model/selectors/getEditableProfileCardData/getEditableProfileCardData';
import {
  updateEditableProfileCardData,
} from '../../model/service/updateEditableProfileCardData/updateEditableProfileCardData';
import { editableProfileCardActions } from '../../model/slice/editableProfileCardSlice';
import {
  getEditableProfileCardReadonly,
} from '../../model/selectors/getEditableProfileCardReadonly/getEditableProfileCardReadonly';
import cls from './EditableProfileHeader.module.scss';

interface EditableProfileHeaderProps { className?: string; }

export const EditableProfileHeader = (props: EditableProfileHeaderProps) => {
  const {
    className,
  } = props;
  const readonly = useSelector(getEditableProfileCardReadonly);
  const dispatch = useAppDispatch();

  /*
    Позволяем редактировать только свой профиль
  */
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getEditableProfileCardData);
  const canEdit = authData?.id === profileData?.id;

  //  Функционал редактирования формы.
  const onEdit = useCallback(() => {
    dispatch(editableProfileCardActions.setReadonly(false));
  }, [dispatch]);
  const onCancelEdit = useCallback(() => {
    dispatch(editableProfileCardActions.cancelEdit());
  }, [dispatch]);

  // Функционал обновления формы на сервере (put-запрос)
  const onSave = useCallback(() => {
    dispatch(updateEditableProfileCardData());
  }, [dispatch]);

  const { t } = useTranslation('Profile');
  return (
    <div className={classNames(cls.EditableProfileHeader, [className])}>
      <Text title={t('Профиль пользователя')} />
      {canEdit && (
        <div className={cls.btnWrapper}>
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
      )}
    </div>
  );
};
