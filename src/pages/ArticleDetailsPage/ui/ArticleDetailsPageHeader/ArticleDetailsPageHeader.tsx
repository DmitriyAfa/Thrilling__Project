import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig';
import { Button } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/Stack';
import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation('article/article-details');
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(RoutePaths.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePaths.articles}/${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <HStack max justify="between" className={classNames('', [className], {})}>
      <Button onClick={onBackToList}>
        {t('Назад к списку')}
      </Button>
      {canEdit && (
        <Button
          onClick={onEditArticle}
        >
          {t('Редактировать')}
        </Button>
      )}
    </HStack>
  );
});