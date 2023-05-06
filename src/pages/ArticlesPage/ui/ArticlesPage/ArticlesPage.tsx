import { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchNextArticles } from '../../model/services/fetchNextArticles/fetchNextArticles';
import { initArticleInfiniteList } from '../../model/services/initArticleInfiniteList/initArticleInfiniteList';
import { ArticleInfiniteListReducer } from '../../model/slices/articleInfiniteListSlice';
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
  ArticleInfiniteList: ArticleInfiniteListReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const [serachParams] = useSearchParams();

  const onLoadingNextPart = useCallback(() => {
    dispatch(fetchNextArticles());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticleInfiniteList(serachParams));
  });

  return (
    <DynamicModuleLoader reducer={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadingNextPart}
        className={classNames(cls.ArticleInfiniteList, [className], {})}
        data-testid='ArticlesPage'
      >
        <ArticleFilters />
        <ArticleInfiniteList className={cls.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);