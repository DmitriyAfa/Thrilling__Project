import { memo } from 'react';

import cls from './ArticleViewSelector.module.scss';

import { ArticleView } from '@/entities/Article';
import ListIconDeprecated from '@/shared/assets/icons/bi_list.svg';
import TiledIconDeprecated from '@/shared/assets/icons/bi_tiled.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
  view: ArticleView;
  // eslint-disable-next-line no-unused-vars
  onViewClick?: (newView: ArticleView) => void;
  className?: string;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => TiledIcon,
      off: () => TiledIconDeprecated,
    }),
  },
  {
    view: ArticleView.BIG,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <Card border='round' className={classNames(cls.ArticleViewSelectorRedesigned, [className], {})}>
          <HStack gap='8'>
            {viewTypes.map((viewType) => (
              <Icon
                Svg={viewType.icon}
                className={classNames(cls.btn, [], { [cls.notSelected]: viewType.view !== view })}
                clickable
                onClick={onClick(viewType.view)}
              />
            ))}
          </HStack>
        </Card>
      )}
      off={(
        <div className={classNames(cls.ArticleViewSelector, [className], {})}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              theme={ButtonTheme.CLEAR}
              onClick={onClick(viewType.view)}
              key={viewType.view}
            >
              <IconDeprecated
                width={24}
                height={24}
                Svg={viewType.icon}
                className={classNames(cls.btn, [], { [cls.notSelected]: viewType.view !== view })}
              />
            </ButtonDeprecated>
          ))}
        </div>
      )}
    />
  );
});
