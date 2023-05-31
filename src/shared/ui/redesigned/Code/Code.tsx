import { memo, useCallback } from 'react';

import { Button, ButtonTheme } from '../../deprecated/Button';
import { Icon } from '../Icon';

import cls from './Code.module.scss';

import CopyIconNew from '@/shared/assets/icons/copy-new.svg';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

interface CodeProps {
  text: string;
  className?: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <pre
          className={classNames(cls.CodeRedesigned, [className])}
        >
          <Icon
            clickable
            onClick={onCopy}
            className={cls.copyBtn}
            Svg={CopyIconNew}
          />
          <code>{text}</code>
        </pre>
      )}
      off={(
        <pre className={classNames(cls.Code, [className])}>
          <Button
            onClick={onCopy}
            className={cls.copyBtn}
            theme={ButtonTheme.CLEAR}
          >
            <CopyIcon className={cls.copyIcon} />
          </Button>
          <code>{text}</code>
        </pre>
      )}
    />
  );
});