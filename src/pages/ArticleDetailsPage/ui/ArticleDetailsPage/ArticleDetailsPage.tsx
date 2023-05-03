import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

import cls from './ArticleDetailsPage.module.scss';

import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <Page className={classNames(cls.articleDetailsPage, [className])}>
      <VStack gap='16' max>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <ArticleRating articleId={id} />
        <ArticleRecommendations />
        <ArticleDetailsComments />
      </VStack>
    </Page>
  );
};

export default memo(ArticleDetailsPage);
