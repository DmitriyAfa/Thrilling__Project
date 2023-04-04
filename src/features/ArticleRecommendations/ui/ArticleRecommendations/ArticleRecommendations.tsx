import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModelLoader, ReducersList } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useSelector } from 'react-redux';
import { Text, TextSize } from 'shared/ui/Text';
import { ArticleList } from 'entities/Article';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getArticleRecommendationsError,
  getArticleRecommendationsIsLodaing,
} from '../../model/selectors/recommendations';
import cls from './ArticleRecommendations.module.scss';
import {
  articleRecommendationsReducer, getArticleRecommendations,
} from '../../model/slices/articleRecommendationsSlice';
import {
  fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';

interface ArticleRecommendationsProps {
  className?: string;
}

const reducers: ReducersList = {
  articleRecommendations: articleRecommendationsReducer,
};

export const ArticleRecommendations = memo((props: ArticleRecommendationsProps) => {
  const { className } = props;
  const { t } = useTranslation('article/ArticleRecommendations');
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const isLoading = useSelector(getArticleRecommendationsIsLodaing);
  const error = useSelector(getArticleRecommendationsError);
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchArticleRecommendations());
  });

  return (
    <DynamicModelLoader reducer={reducers} removeAfterUnmount>
      <Text
        size={TextSize.L}
        title={t('Рекоммендуем')}
        className={classNames(cls.title, [])}
      />
      <ArticleList
        articles={recommendations}
        isLoading={isLoading}
        className={className}
        target="_blank"
      />
    </DynamicModelLoader>
  );
});