import { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover as HPopover } from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';
import cls from './Popover.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
}

export const Popover = memo((props: PopoverProps) => {
  const {
    className,
    trigger,
    direction = 'bottom right',
    children,
  } = props;

  const { t } = useTranslation();

  const menuClasses = [direction && mapDirectionClass[direction]];

  return (
    <HPopover className={classNames(cls.Popover, [className, popupCls.popup], {})}>

      <HPopover.Button
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