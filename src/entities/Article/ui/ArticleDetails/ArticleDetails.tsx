/* eslint-disable indent */
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModelLoader, ReducersList } from '@/shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon } from '@/shared/ui/Icon/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { articleDetailsReducer } from '../../model/slice/articleSlice';
import cls from './ArticleDetails.module.scss';
import { ArticleBLock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBLockComponent } from '../ArticleCodeBLockComponent/ArticleCodeBLockComponent';

import { ArticleTextBLockComponent } from '../ArticleTextBLockComponent/ArticleTextBLockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';

interface ArticleDetailsProps {
  id?: string;
  className?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

/*
  Компонент ArticleDetails изолирует в себе state и редьюсер
  -
  Другими словами данная сущность всю информацию изолирует в себе:
  + С помощью fetchArticleById подгружаем данную сущность по id
  + Изолирует state с помощью useSelector и никуда не отдает во вне
  -
  Получается, что данный компонент не предназначен для переиспользования
  вне контекста статей так, как он зависит только от id статьи. А все остальное
  он изолирует внутри себя и на ружу ни чего не выходит.
*/

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { id, className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  const renderBlock = useCallback((block: ArticleBLock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBLockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBLockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={t('Произошла ошибка при загрузке статьи')}
      />
    );
  } else {
    content = (
      <>
        <HStack justify="center" max>
          <Avatar
            className={cls.avatar}
            size={200}
            src={article?.img}
          />
        </HStack>
        <VStack gap="4" max>
          <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />
          <HStack gap="8">
            <Icon className={cls.icon} Svg={EyeIcon} />
            <Text
              text={`${article?.views}`}
            />
          </HStack>
          <HStack gap="8">
            <Icon className={cls.icon} Svg={CalendarIcon} />
            <Text
              text={article?.createdAt}
            />
          </HStack>
        </VStack>
        {/* в колбек renderBlock будет попадать блок из blocks и в зависимости от типа будет возвращать нужную разметку */}
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModelLoader reducer={reducers} removeAfterUnmount>
      <VStack gap="16" max className={classNames(cls.articleDetails, [className], {})}>
        {content}
      </VStack>
    </DynamicModelLoader>
  );
});