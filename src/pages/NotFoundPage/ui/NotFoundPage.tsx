import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps { className?: string; }

/**
 * В странице нет сложной логики, нет большого количества стилей
 * поэтому выносить ее в отдельный чанк смысла нет.
 * Нет смысла в асинхронности.
 */

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();
  return (
    <Page className={classNames(cls.NotFoundPage, [className])}>
      {t('Страница не найдена')}
    </Page>
  );
};
