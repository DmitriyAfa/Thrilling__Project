import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { isMobile } from 'react-device-detect';
import { Drawer } from '@/shared/ui/Drawer';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation('article/ArticlePageGreeting');
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlesPageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
    }
  }, [isArticlesPageWasOpened, dispatch]);

  const onClose = () => setIsOpen(false);
  const text = (
    <Text
      title={t('Добро пожаловать на страницу статей')}
      text={t('Здесь вы можете искать и просматривать статьи на различные темы')}
    />
  );

  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});