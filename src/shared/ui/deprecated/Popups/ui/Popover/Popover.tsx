import { Popover as HPopover } from '@headlessui/react';
import { ReactNode, memo } from 'react';

import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

import cls from './Popover.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Popover = memo((props: PopoverProps) => {
  const {
    className,
    trigger,
    direction = 'bottom right',
    children,
  } = props;

  const menuClasses = [direction && mapDirectionClass[direction]];

  return (
    <HPopover className={classNames(cls.Popover, [className, popupCls.popup], {})}>

      <HPopover.Button
        as='div'
        className={popupCls.trigger}
      >
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, menuClasses, {})}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
});