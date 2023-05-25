import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef?: MutableRefObject<HTMLElement>;
}

export function UseInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    /*
    if we want to watch for changes in visibility of the target element relative to the document's viewport, so root is null
    */
    const wrapperElement = wrapperRef?.current || null;
    const triggerElement = triggerRef.current;
    let observer: IntersectionObserver | null = null;
    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '20px 20px 20px 45px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);
      observer.observe(triggerElement);
    }

    return () => {
      if (observer && triggerElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerElement);
      }
    };
  }, [wrapperRef, triggerRef, callback]);
}