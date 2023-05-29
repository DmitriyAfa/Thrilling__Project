import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Comment } from '../../model/type/comment';
import { CommentCard } from '../CommentCard/CommentCard';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';

interface CommentsListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

/*
 CommentsList в отличии от ArticleDetails переиспользуемым компонентом
  так как комментарии могут быть к профилю, товару, к продуку, к статье.
  К чему угодно.
  -
  Поэтому сами комментарии будем принимать извне, чтобы компонент со списком
  комментариев был переиспользуемым.
*/

export const CommentsList = memo((props: CommentsListProps) => {
  const {
    className,
    comments,
    isLoading,
  } = props;
  const { t } = useTranslation('comment-list');

  if (isLoading) {
    return (
      <VStack gap='16' max className={classNames('', [className], {})}>
        <CommentCard isLoading={isLoading} />
        <CommentCard isLoading={isLoading} />
        <CommentCard isLoading={isLoading} />
      </VStack>
    );
  }

  if (!comments) {
    return null;
  }

  return (
    <VStack gap='16' max className={classNames('', [className], {})}>
      {
        comments?.length
          ? (comments.map((comment) => (
            <CommentCard
              comment={comment}
              isLoading={isLoading}
              key={comment.id}
            />
          )))
          : (<Text text={t('Комментарии отсутствуют')} />)
      }
    </VStack>
  );
});