import { Suspense, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { AddCommentForm } from '@/features/AddCommentForm';
import { ArticleCommentsList, addCommentForArticle } from '@/features/ArticleCommentsList';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { Text } from '@/shared/ui/deprecated/Text';

interface ArticleDetailsCommentsProps {
  className?: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onSendComment = useCallback((value: string) => {
    dispatch(addCommentForArticle(value));
  }, [dispatch]);
  return (
    <VStack gap='16' max className={classNames('', [className], {})}>
      <Text title={t('Комментарии')} />
      <Suspense fallback={<Loader />}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <ArticleCommentsList />
    </VStack>
  );
});