import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import cls from './AddCommentForm.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/deprecated/Input';
import { HStack } from '@/shared/ui/deprecated/Stack';

export interface AddCommentFormProps {
  // eslint-disable-next-line no-unused-vars
  onSendComment: (text: string) => void;
  className?: string;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = (props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  // eslint-disable-next-line no-unused-vars
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    // очистим инпут
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);
  return (
    <DynamicModuleLoader reducer={reducers}>
      <HStack
        justify='between'
        max
        className={classNames(cls.AddCommentForm, [className], {})}
        data-testid='AddCommentForm'
      >
        <Input
          className={cls.input}
          placeholder={t('Введите текст комментария')}
          value={text}
          onChange={onCommentTextChange}
          data-testid='AddCommentForm.Input'
        />
        <Button
          data-testid='AddCommentForm.Button'
          onClick={onSendHandler}
        >
          {t('Отправить')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
};

export default memo(AddCommentForm);