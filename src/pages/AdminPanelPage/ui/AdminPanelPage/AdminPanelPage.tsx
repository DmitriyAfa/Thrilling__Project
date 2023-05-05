/* eslint-disable no-unused-vars */
import { memo } from 'react';

import { Page } from '@/widgets/Page';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
  const { className } = props;

  return (
    <Page data-testid='AdminPanelPage'>
      AdminPanelPage
    </Page>
  );
});

export default AdminPanelPage;
