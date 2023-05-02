import { FC, memo } from 'react';

import { EndlessArticles } from '@/features/EndlessArticles';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;

  return (
    // <Page className={classNames(cls.ArticlesPage, [className])}>
    <EndlessArticles className={className} />
    // </Page>
  );
};

export default memo(ArticlesPage);