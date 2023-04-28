import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CommentsList } from '@/entities/Comment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModelLoader, ReducersList } from '@/shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsError, getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { articleCommentsListReducer, getArticleComments } from '../../model/slices/articleCommentsListSlice';

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
  const error = useSelector(getArticleCommentsError);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });
  return (
    <DynamicModelLoader reducer={reducers} removeAfterUnmount>
      <CommentsList
        className={classNames('', [className])}
        isLoading={isLoading}
        comments={comments}
      />
    </DynamicModelLoader>
  );
});