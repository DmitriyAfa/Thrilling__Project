import { ArticleDetails } from 'entities/Article';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { ArticleCommentsList, addCommentForArticle } from 'features/ArticleCommentsList';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Page } from 'widgets/Page';
import {
  ArticleRecommendations,
} from 'features/ArticleRecommendations/ui/ArticleRecommendations/ArticleRecommendations';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const onSendComment = useCallback((value: string) => {
    dispatch(addCommentForArticle(value));
  }, [dispatch]);

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, [className])}>
        {t('Статья не найдена')}
      </Page>
    );
  }

  return (
    <Page className={classNames(cls.articleDetailsPage, [className])}>
      <ArticleDetailsPageHeader />
      <ArticleDetails id={id} />
      <ArticleRecommendations
        className={cls.recommendations}
      />
      <Text className={cls.commentTitle} title={t('Комментарии')} />
      <AddCommentForm onSendComment={onSendComment} />
      <ArticleCommentsList />
    </Page>
  );
};

export default memo(ArticleDetailsPage);