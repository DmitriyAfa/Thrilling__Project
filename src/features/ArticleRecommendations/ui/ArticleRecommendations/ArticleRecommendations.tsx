import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text';
import { ArticleList } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { useArticleRecommendations } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsProps {
  className?: string;
}

export const ArticleRecommendations = memo((props: ArticleRecommendationsProps) => {
  const { className } = props;
  const { t } = useTranslation('article/ArticleRecommendations');

  const {
    data: articles,
    isLoading,
    error,
  } = useArticleRecommendations(3);

  if (isLoading || error) {
    return null;
  }

  return (
    <VStack gap="8" className={classNames('', [className])}>
      <Text
        size={TextSize.L}
        title={t('Рекоммендуем')}
      />
      <ArticleList
        articles={articles}
        // isLoading={isLoading}
        className={className}
        target="_blank"
      />
    </VStack>
  );
});

// const recommendations = useSelector(getArticleRecommendations.selectAll);
// const isLoading = useSelector(getArticleRecommendationsIsLodaing);
// const error = useSelector(getArticleRecommendationsError);
// const dispatch = useAppDispatch();

// useInitialEffect(() => {
//   dispatch(fetchArticleRecommendations());
// });

// return (
//   <DynamicModelLoader reducer={reducers} removeAfterUnmount>
// <Text
//   size={TextSize.L}
//   title={t('Рекоммендуем')}
//   className={classNames(cls.title, [])}
// />
// <ArticleList
//   articles={recommendations}
//   isLoading={isLoading}
//   className={className}
//   target="_blank"
// />
//   </DynamicModelLoader>
// );