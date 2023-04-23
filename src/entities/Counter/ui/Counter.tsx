import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

const valueTitle = 'value-title';
const incrementBtn = 'increment-btn';
const decrementBtn = 'decrement-btn';

export const Counter = () => {
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);
  const { t } = useTranslation('Profile');
  const increment = () => {
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <h1 data-testid={valueTitle}>{counterValue}</h1>
      <Button
        onClick={increment}
        data-testid={incrementBtn}
      >
        {t('increment')}
      </Button>
      <Button
        onClick={decrement}
        data-testid={decrementBtn}
      >
        {t('decrement')}
      </Button>
    </div>
  );
};
