import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useArticleRecommendations } from '../../api/articleRecommendationsApi';

import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

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

  if (isLoading || error || !articles) {
    return null;
  }

  return (
    <VStack
      data-testid='ArticleRecommendations'
      gap='8'
      className={classNames('', [className])}
    >
      <Text
        size={TextSize.L}
        title={t('Рекоммендуем')}
      />
      <ArticleList
        articles={articles}
        className={className}
        target='_blank'
      />
    </VStack>
  );
});
