import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getArticleCommentsError, getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleCommentsListReducer, getArticleComments } from '../../model/slices/articleCommentsListSlice';

import { CommentsList } from '@/entities/Comment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

interface ArticleCommentsListProps {
  className?: string;
}

const reducers: ReducersList = {
  articleCommentsList: articleCommentsListReducer,
};

export const ArticleCommentsList = memo((props: ArticleCommentsListProps) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string; }>();

  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleCommentsIsLoading);
  // eslint-disable-next-line no-unused-vars
  const error = useSelector(getArticleCommentsError);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });
  return (
    <DynamicModuleLoader reducer={reducers} removeAfterUnmount>
      <CommentsList
        className={classNames('', [className])}
        isLoading={isLoading}
        comments={comments}
      />
    </DynamicModuleLoader>
  );
});