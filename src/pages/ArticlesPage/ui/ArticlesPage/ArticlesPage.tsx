import { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchNextArticles } from '../../model/services/fetchNextArticles/fetchNextArticles';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticleFilters } from '../ArticleFilters/ArticleFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';

import cls from './ArticlesPage.module.scss';

import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const [serachParams] = useSearchParams();

  const onLoadingNextPart = useCallback(() => {
    dispatch(fetchNextArticles());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(serachParams));
  });

  const content = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <StickyContentLayout
          left={(<ViewSelectorContainer />)}
          right={<FiltersContainer />}
          content={(
            <Page
              onScrollEnd={onLoadingNextPart}
              className={classNames(cls.ArticlesPageRedesigned, [className], {})}
              data-testid='ArticlesPage'
            >
              <ArticleInfiniteList className={cls.list} />
              <ArticlePageGreeting />
            </Page>
          )}
        />
      )}
      off={(
        <Page
          onScrollEnd={onLoadingNextPart}
          className={classNames(cls.ArticlesPage, [className], {})}
          data-testid='ArticlesPage'
        >
          <ArticleFilters />
          <ArticleInfiniteList className={cls.list} />
          <ArticlePageGreeting />
        </Page>
      )}
    />
  );

  return (
    <DynamicModuleLoader reducer={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);