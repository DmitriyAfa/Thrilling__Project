import { ArticleList, ArticleView } from 'entities/Article';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModelLoader, ReducersList } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextArticles } from '../../model/services/fetchNextArticles/fetchNextArticles';
import {
  getEndlessArticlesError,
  getEndlessArticlesIsLoading,
  getEndlessArticlesView,
} from '../../model/selectors/endlessArticlesSelectors';
import { EndlessArticlesActions, EndlessArticlesReducer, getArticles } from '../../model/slices/endlessArticlesSlice';
import cls from './EndlessArticles.module.scss';
import { initEndlessArticles } from '../../model/services/initEndlessArticles/initEndlessArticles';

interface EndlessArticlesProps {
  className?: string;
}

const reducers: ReducersList = {
  endlessArticles: EndlessArticlesReducer,
};

export const EndlessArticles = memo((props: EndlessArticlesProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getEndlessArticlesIsLoading);
  const view = useSelector(getEndlessArticlesView);
  const error = useSelector(getEndlessArticlesError);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(EndlessArticlesActions.setView(view));
  }, [dispatch]);

  const onLoadingNextPart = useCallback(() => {
    dispatch(fetchNextArticles());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initEndlessArticles());
  });

  if (error) {
    return (
      <Page>
        <h1>{error}</h1>
      </Page>
    );
  }

  return (
    <DynamicModelLoader reducer={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadingNextPart}
        className={classNames(cls.EndlessArticles, [className], {})}
      >
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </Page>
    </DynamicModelLoader>
  );
});