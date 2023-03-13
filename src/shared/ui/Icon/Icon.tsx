import { memo, SVGProps, VFC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
  Svg: VFC<SVGProps<SVGSVGElement>>;
  className?: string;
}

export const Icon = memo((props: IconProps) => {
  const {
    className,
    Svg,
  } = props;

  return (
    <Svg className={classNames(cls.Icon, [className], {})} />
  );
});