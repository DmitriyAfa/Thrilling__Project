/* eslint-disable no-unused-vars */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal/Modal';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setisAuthModal] = useState(false);
  const onToggleModal = useCallback(() => {
    setisAuthModal((prev) => !prev);
  }, []);
  return (
    <div className={classNames(cls.Navbar, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={classNames(cls.links)}
        onClick={onToggleModal}
      >
        {t('Войти')}
      </Button>
      {/*  eslint-disable-next-line i18next/no-literal-string */}
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Architecto doloremque reiciendis eaque dolorem magni tenetur
        ut ratione fugit numquam fugiat error,
        deserunt quidem labore animi perferendis explicabo doloribus placeat. Expedita.
      </Modal>
    </div>
  );
};
