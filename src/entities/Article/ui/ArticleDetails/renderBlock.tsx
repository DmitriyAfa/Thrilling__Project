/* eslint-disable indent */
import { ArticleBLock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBLockComponent } from '../ArticleCodeBLockComponent/ArticleCodeBLockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBLockComponent } from '../ArticleTextBLockComponent/ArticleTextBLockComponent';

import cls from './ArticleDetails.module.scss';

export const renderArticleBlock = (block: ArticleBLock) => {
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
};