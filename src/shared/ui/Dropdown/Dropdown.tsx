import { Fragment, ReactNode, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Menu } from '@headlessui/react';
import cls from './Dropdown.module.scss';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from '../AppLink/AppLink';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}
const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.directionBottomLeft,
  'bottom right': cls.directionBottomRight,
  'top left': cls.directionTopLeft,
  'top right': cls.directionTopRight,
};

export const Dropdown = memo((props: DropdownProps) => {
  const {
    className,
    items,
    trigger,
    direction = 'bottom right',
  } = props;
  const menuClasses = [direction && mapDirectionClass[direction]];

  return (

    <Menu as="div" className={classNames(cls.Dropdown, [className], {})}>
      <Menu.Button className={cls.btn}>
        {trigger}
      </Menu.Button>
      <Menu.Items className={classNames(cls.menu, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              disabled={item.disabled}
              onClick={item.onClick}
              type="button"
              className={classNames(cls.item, [], { [cls.active]: active })}
            >
              {item.content}
            </button>
          );
          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          }
          return (
            <Menu.Item as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
});
