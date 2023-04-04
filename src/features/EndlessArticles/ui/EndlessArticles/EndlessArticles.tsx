import { ArticleList } from 'entities/Article';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModelLoader, ReducersList } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'widgets/Page';
import { useSearchParams } from 'react-router-dom';
import { fetchNextArticles } from '../../model/services/fetchNextArticles/fetchNextArticles';
import {
  getEndlessArticlesError,
  getEndlessArticlesIsLoading,
  getEndlessArticlesView,
} from '../../model/selectors/endlessArticlesSelectors';
import { EndlessArticlesReducer, getArticles } from '../../model/slices/endlessArticlesSlice';
import cls from './EndlessArticles.module.scss';
import { initEndlessArticles } from '../../model/services/initEndlessArticles/initEndlessArticles';
import { ArticleFilters } from '../ArticleFilters/ArticleFilters';

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
  const [serachParams] = useSearchParams();

  const onLoadingNextPart = useCallback(() => {
    dispatch(fetchNextArticles());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initEndlessArticles(serachParams));
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
        <ArticleFilters />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
          className={cls.list}
        />
      </Page>
    </DynamicModelLoader>
  );
});