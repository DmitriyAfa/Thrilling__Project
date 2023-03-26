import { MutableRefObject, useEffect } from 'react';

export interface useEndlessScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export function UseEndlessScroll({
  callback,
  triggerRef,
  wrapperRef,
}: useEndlessScrollOptions) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (callback) {
      const options = {
        root: wrapperRef.current,
        rootMargin: '20px 20px 20px 45px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);
      observer.observe(triggerRef.current);
    }

    return () => {
      if (observer) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerRef.current);
      }
    };
  }, [wrapperRef, triggerRef, callback]);
}