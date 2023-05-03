import { DropdownDirection } from '../../../types/ui';

import cls from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.directionBottomLeft,
  'bottom right': cls.directionBottomRight,
  'top left': cls.directionTopLeft,
  'top right': cls.directionTopRight,
};
