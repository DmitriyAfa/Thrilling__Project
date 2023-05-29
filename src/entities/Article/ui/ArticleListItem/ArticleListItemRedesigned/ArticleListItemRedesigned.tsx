import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleBlockType, ArticleTextBLock, ArticleView } from '../../../model/types/article';
import { ArticleListItemProps } from '../ArticleListItem';

import cls from './ArticleListItemRedesigned.module.scss';

import EyeIcon from '@/shared/assets/icons/eye-new.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
    target,
  } = props;
  const { t } = useTranslation('ArticleListItem');

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} />
      <Text bold text={article.user.username} />
    </>
  );

  const views = (
    <HStack gap='8'>
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => (
      block.type === ArticleBlockType.TEXT
    )) as ArticleTextBLock;

    return (
      <Card
        padding='24'
        max
        data-testid='ArticleListItem'
        className={classNames(cls.ArticleListItem, [className, cls[view]], {})}
      >
        <VStack max gap='16'>
          <HStack gap='8' max>
            {userInfo}
            <Text text={article.createdAt} />
          </HStack>

          <Text title={article.title} bold />
          <Text title={article.subtitle} size='s' />

          <AppImage
            fallback={<Skeleton width='100%' height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />

          {textBlock?.paragraphs && (
            <Text text={textBlock.paragraphs.slice(0, 2).join(' ')} className={cls.textBlock} />
          )}

          <HStack max justify='between'>
            <AppLink
              target={target}
              to={getRouteArticleDetails(article.id)}
            >
              <Button>
                {t('Читать далее...')}
              </Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid='ArticleListItem'
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, [
        className,
        cls[view],
      ])}
    >
      <Card className={cls.card} border='round'>
        <AppImage
          fallback={<Skeleton width={200} height={200} />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
        <VStack className={cls.info} gap='4'>
          <Text title={article.title} className={cls.title} />
          <VStack gap='4' className={cls.footer} max>
            <HStack justify='between' max>
              <Text
                text={article.createdAt}
                className={cls.date}
              />
              {views}
            </HStack>
            <HStack gap='4'>{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});