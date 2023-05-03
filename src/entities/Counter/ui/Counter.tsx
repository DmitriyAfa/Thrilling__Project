import { useTranslation } from 'react-i18next';

import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

import { Button } from '@/shared/ui/Button';

const valueTitle = 'value-title';
const incrementBtn = 'increment-btn';
const decrementBtn = 'decrement-btn';

export const Counter = () => {
  const counterValue = useCounterValue();
  const { t } = useTranslation('Profile');
  const { add, decrement, increment } = useCounterActions();

  const handleInc = () => {
    increment();
  };
  const handleDec = () => {
    decrement();
  };
  const handleAddFive = () => {
    add(5);
  };

  return (
    <div>
      <h1 data-testid={valueTitle}>{counterValue}</h1>
      <Button
        onClick={handleAddFive}
        data-testid={incrementBtn}
      >
        {t('Add 5')}
      </Button>
      <Button
        onClick={handleInc}
        data-testid={incrementBtn}
      >
        {t('increment')}
      </Button>
      <Button
        onClick={handleDec}
        data-testid={decrementBtn}
      >
        {t('decrement')}
      </Button>
    </div>
  );
};
