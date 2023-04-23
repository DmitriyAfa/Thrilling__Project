import { ArticleDetails } from '@/entities/Article';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();

  // if (!id) {
  //   return (
  //     <Page className={classNames(cls.ArticleDetailsPage, [className])}>
  //       {t('Статья не найдена')}
  //     </Page>
  //   );
  // }

  return (
    <Page className={classNames(cls.articleDetailsPage, [className])}>
      <VStack gap="16" max>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <ArticleRecommendations />
        <ArticleDetailsComments />
      </VStack>
    </Page>
  );
};

export default memo(ArticleDetailsPage);

// eslint-disable-next-line no-lone-blocks
{ /* <Text className={cls.commentTitle} title={t('Комментарии')} />
        <AddCommentForm onSendComment={onSendComment} />
        <ArticleCommentsList />  */ }