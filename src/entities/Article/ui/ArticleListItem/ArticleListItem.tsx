import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import {
  Article, ArticleBlockType, ArticleTextBLock, ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBLockComponent } from '../ArticleTextBLockComponent/ArticleTextBLockComponent';

interface ArticleListItemProps {
  article: Article;
  view: ArticleView;
  className?: string;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
  } = props;
  const { t } = useTranslation('ArticleListItem');
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(RoutePaths.article_details + article.id);
  }, [article.id, navigate]);

  const types = <Text text={article.type.join(', ')} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => (
      block.type === ArticleBlockType.TEXT
    )) as ArticleTextBLock;
    return (
      <div className={classNames(cls.ArticleListItem, [className, cls[view]], {})}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.data} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} className={cls.img} alt={article.title} />
          {textBlock && (
            <ArticleTextBLockComponent block={textBlock} className={cls.textBlock} />
          )}
          <div className={cls.footer}>
            <Button onClick={onOpenArticle}>
              {t('Читать далее...')}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleListItem, [className, cls[view]], {})}>
      <Card className={cls.card} onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img src={article.img} className={cls.img} alt={article.title} />
          <Text text={article.createdAt} className={cls.data} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </div>
  );
});