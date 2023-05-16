import { memo } from 'react';

import cls from './ArticleViewSelector.module.scss';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/bi_list.svg';
import TiledIcon from '@/shared/assets/icons/bi_tiled.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

interface ArticleViewSelectorProps {
  view: ArticleView;
  // eslint-disable-next-line no-unused-vars
  onViewClick?: (newView: ArticleView) => void;
  className?: string;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const {
    className,
    view,
    onViewClick,
  } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(cls.ArticleViewSelector, [className], {})}>
      {viewTypes.map((viewType) => (
        <Button
          theme={ButtonTheme.CLEAR}
          onClick={onClick(viewType.view)}
          key={viewType.view}
        >
          <Icon
            width={24}
            height={24}
            Svg={viewType.icon}
            className={classNames(cls.btn, [], { [cls.selected]: viewType.view === view })}
          />
        </Button>
      ))}
    </div>
  );
});