import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { Comment } from '../../model/type/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentsList.module.scss';

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
  return (
    <div className={classNames(cls.commenstList, [className], {})}>
      {
        comments?.length
          ? (comments.map((comment) => (
            <CommentCard
              className={cls.comment}
              comment={comment}
              isLoading={isLoading}
            />
          )))
          : (<Text text={t('Комментарии отсутствуют')} />)
      }
    </div>
  );
});