import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
  getEndlessArticlesError,
  getEndlessArticlesIsLoading,
  getEndlessArticlesView,
} from '../../model/selectors/endlessArticlesSelectors';
import { fetchNextArticles } from '../../model/services/fetchNextArticles/fetchNextArticles';
import { initEndlessArticles } from '../../model/services/initEndlessArticles/initEndlessArticles';
import { EndlessArticlesReducer, getArticles } from '../../model/slices/endlessArticlesSlice';
import { ArticleFilters } from '../ArticleFilters/ArticleFilters';

import cls from './EndlessArticles.module.scss';

import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
// *I NEED REFACTORING
// eslint-disable-next-line dm-fsd-rules/layer-imports
import { Page } from '@/widgets/Page';

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
    <DynamicModuleLoader reducer={reducers} removeAfterUnmount={false}>
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
    </DynamicModuleLoader>
  );
});