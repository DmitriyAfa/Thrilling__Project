import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { HStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page';

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      {t('Главная страница')}
      <div>adasdad</div>
      <div>adasdad</div>
      <HStack>
        <div>adasdad</div>
        <ListBox
          defaultValue="Выбиерите значение"
          onChange={((value: string) => { })}
          value={undefined}
          items={[
            { value: '1', content: '123' },
            { value: '2', content: 'qeq', disabled: true },
            { value: '3', content: 'qwd' },
          ]}
        />
      </HStack>
      <div>adasdad</div>
      <div>adasdad</div>
      <div>adasdad</div>
      <div>adasdad</div>

    </Page>
  );
};

export default MainPage;
