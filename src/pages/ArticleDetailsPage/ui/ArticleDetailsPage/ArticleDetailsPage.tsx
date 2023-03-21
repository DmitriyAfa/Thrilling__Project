import { ArticleDetails } from 'entities/Article';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { ArticleCommentsList, addCommentForArticle } from 'features/ArticleCommentsList';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import cls from './ArticleDetailsPage.module.scss';

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
      <div className={classNames(cls.ArticleDetailsPage, [className])}>
        {t('Статья не найдена')}
      </div>
    );
  }

  return (
    <div className={classNames(cls.articleDetailsPage, [className])}>
      <ArticleDetails id={id} />
      <Text className={cls.commentTitle} title={t('Комментарии')} />
      <AddCommentForm onSendComment={onSendComment} />
      <ArticleCommentsList />
    </div>
  );
};

export default memo(ArticleDetailsPage);