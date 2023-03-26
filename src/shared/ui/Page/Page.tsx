import {
  MutableRefObject, ReactNode, useRef,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { UseEndlessScroll } from 'shared/lib/hooks/useEndlessScroll/useEndlessScroll';
import cls from './Page.module.scss';

interface PageProps {
  children: ReactNode;
  className?: string;
  onScrollEnd?: () => void;
}

export const Page = (props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  UseEndlessScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.Page, [className], {})}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
};