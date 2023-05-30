import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import cls from './AdditionalInfoContainer.module.scss';

import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/router';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData);
  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) navigate(getRouteArticleEdit(article.id));
  }, [article, navigate]);

  if (!article) {
    return null;
  }

  return (
    <Card padding='24' border='round' className={cls.card}>
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        createdAt={article.createdAt}
        views={article.views}
        author={article.user}
      />
    </Card>
  );
});