import { memo } from 'react';

import { Comment } from '../../model/type/comment';

import cls from './CommentCard.module.scss';

import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const {
    className,
    comment,
    isLoading,
  } = props;

  if (isLoading) {
    return (
      <VStack
        data-testid='CommentCard.Loading'
        gap='8'
        max
        className={classNames(cls.CommentCard, [className, cls.loading], {})}
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} border='50%' />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton width='100%' height={50} />
      </VStack>
    );
  }
  if (!comment) {
    return null;
  }
  return (
    <VStack
      data-testid='CommentCard.Content'
      gap='8'
      max
      className={classNames(cls.CommentCard, [className], {})}
    >
      <AppLink to={getRouteProfile(comment?.user.id)} className={cls.header}>
        {comment?.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
        <Text className={cls.username} title={comment?.user.username} />
      </AppLink>
      <Text text={comment?.text} />
    </VStack>
  );
});