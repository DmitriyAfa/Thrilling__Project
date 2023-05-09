import { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useArticleItemById } from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticles } from '../../model/services/fetchNextArticles/fetchNextArticles';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticleFilters } from '../ArticleFilters/ArticleFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

import cls from './ArticlesPage.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';

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
  const articleItem = useArticleItemById('2');

  console.log(articleItem);

  const onLoadingNextPart = useCallback(() => {
    dispatch(fetchNextArticles());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(serachParams));
  });

  return (
    <DynamicModuleLoader reducer={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadingNextPart}
        className={classNames(cls.articlesPage, [className], {})}
        data-testid='ArticlesPage'
      >
        <ArticleFilters />
        <ArticleInfiniteList className={cls.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);