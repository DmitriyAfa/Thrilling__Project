import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Text } from 'shared/ui/Text';
import { getUserAuthData } from 'entities/User';
import { HStack } from 'shared/ui/Stack';
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
    <HStack max justify="between" className={classNames('', [className])}>
      <Text title={t('Профиль пользователя')} />
      {canEdit && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {readonly
            ? (
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onEdit}
                data-testid="EditableProfileHeader.EditButton"
              >
                {t('Редактировать')}
              </Button>
            ) : (
              <HStack gap="8">
                <Button
                  theme={ButtonTheme.OUTLINE_RED}
                  onClick={onCancelEdit}
                  data-testid="EditableProfileHeader.CancelButton"
                >
                  {t('Отменить')}
                </Button>
                <Button
                  theme={ButtonTheme.OUTLINE}
                  onClick={onSave}
                  data-testid="EditableProfileHeader.SaveButton"
                >
                  {t('Сохранить')}
                </Button>
              </HStack>
            )}
        </>
      )}
    </HStack>
  );
};
