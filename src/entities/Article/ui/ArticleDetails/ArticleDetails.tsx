/* eslint-disable indent */
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleSlice';

import cls from './ArticleDetails.module.scss';
import { renderArticleBlock } from './renderBlock';

import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

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
  вне контекста статей так как он зависит только от id статьи. А все остальное
  он изолирует внутри себя и на ружу ни чего не выходит.
*/

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData);
  return (
    <>
      <HStack justify='center' max>
        <Avatar
          className={cls.avatar}
          size={200}
          src={article?.img}
        />
      </HStack>
      <VStack gap='4' max data-testid='ArticleDetails.Info'>
        <TextDeprecated
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <HStack gap='8'>
          <Icon className={cls.icon} Svg={EyeIcon} />
          <TextDeprecated
            text={`${article?.views}`}
          />
        </HStack>
        <HStack gap='8'>
          <Icon className={cls.icon} Svg={CalendarIcon} />
          <TextDeprecated
            text={article?.createdAt}
          />
        </HStack>
      </VStack>
      {/* в колбек renderBlock будет попадать блок из blocks и в зависимости от типа будет возвращать нужную разметку */}
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData);
  return (
    <>
      <Text
        title={article?.title}
        size='l'
        bold
      />
      <Text
        title={article?.subtitle}
      />
      <AppImage
        className={cls.img}
        fallback={<Skeleton width='100%' height={420} border='16px' />}
        src={article?.img}
      />
      {/* в колбек renderBlock будет попадать блок из blocks и в зависимости от типа будет возвращать нужную разметку */}
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { id, className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <>
        <SkeletonDeprecated className={cls.avatar} width={200} height={200} border='50%' />
        <SkeletonDeprecated className={cls.title} width={300} height={32} />
        <SkeletonDeprecated className={cls.skeleton} width={600} height={24} />
        <SkeletonDeprecated className={cls.skeleton} width='100%' height={200} />
        <SkeletonDeprecated className={cls.skeleton} width='100%' height={200} />
      </>
    );
  } else if (error) {
    content = (
      <TextDeprecated
        align={TextAlign.CENTER}
        title={t('Произошла ошибка при загрузке статьи')}
      />
    );
  } else {
    content = (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<Redesigned />}
        off={<Deprecated />}
      />
    );
  }

  return (
    <DynamicModuleLoader reducer={reducers} removeAfterUnmount>
      <VStack gap='16' max className={classNames(cls.articleDetails, [className], {})}>
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});