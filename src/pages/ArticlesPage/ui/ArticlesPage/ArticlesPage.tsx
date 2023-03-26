import { EndlessArticles } from 'features/EndlessArticles';
import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;

  return (
    // <Page className={classNames(cls.ArticlesPage, [className])}>
    <EndlessArticles />
    // </Page>
  );
};

export default memo(ArticlesPage);