import cls from './Loader.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

interface LoaderProps { className?: string;}

export const Loader = ({ className }: LoaderProps) => (
  <div className={classNames(cls.Loader, [className])}>
    <div />
    <div />
    <div />
    <div />
  </div>
);
