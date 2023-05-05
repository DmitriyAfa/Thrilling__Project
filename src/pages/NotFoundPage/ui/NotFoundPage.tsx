import { useTranslation } from 'react-i18next';

import cls from './NotFoundPage.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface NotFoundPageProps { className?: string; }

/**
 * В странице нет сложной логики, нет большого количества стилей
 * поэтому выносить ее в отдельный чанк смысла нет.
 * Нет смысла в асинхронности.
 */

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();
  return (
    <Page data-testid='NotFoundPage' className={classNames(cls.NotFoundPage, [className])}>
      {t('Страница не найдена')}
    </Page>
  );
};
