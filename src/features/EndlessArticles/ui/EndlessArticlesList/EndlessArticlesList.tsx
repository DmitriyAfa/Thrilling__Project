import { ArticleList, ArticleView } from 'entities/Article';
import { EndlessArticlesReducer } from 'features/EndlessArticles/model/slices/endlessArticlesSlice';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ReducersList } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import cls from './EndlessArticlesList.module.scss';

interface EndlessArticlesListProps {
  className?: string;
}

const reducers: ReducersList = {
  endlessArticles: EndlessArticlesReducer,
};

export const EndlessArticles = memo((props: EndlessArticlesListProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.EndlessArticlesList, [className], {})}>
      <ArticleList
        isLoading={false}
        view={ArticleView.BIG}
        articles={[]}
      />
    </div>
  );
});