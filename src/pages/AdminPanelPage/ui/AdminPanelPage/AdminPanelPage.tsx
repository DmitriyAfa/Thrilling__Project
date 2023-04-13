/* eslint-disable no-unused-vars */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import cls from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page>
      AdminPanelPage
    </Page>
  );
});

export default AdminPanelPage;
