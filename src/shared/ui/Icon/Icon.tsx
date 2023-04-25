import { memo, SVGProps, VFC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
  Svg: VFC<SVGProps<SVGSVGElement>>;
  className?: string;
  inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
  const {
    className,
    Svg,
    inverted,
    ...otherProps
  } = props;

  return (
    <Svg
      className={classNames(cls.Icon, [className], { [cls.inverted]: inverted })}
      {...otherProps}
    />
  );
});