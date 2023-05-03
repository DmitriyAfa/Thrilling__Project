import { useTranslation } from 'react-i18next';

import { Counter } from '@/entities/Counter';
import { Page } from '@/widgets/Page';

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <Counter />
      {t('Главная страница')}
    </Page>
  );
};

export default MainPage;
