import { Flex, FlexProps } from '../Flex/Flex';

// исключаем из FlexProps свойство direction
type HStackProps = Omit<FlexProps, 'direction'>;
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const HStack = (props: HStackProps) => (
  <Flex
    direction='row'
    {...props}
  />
);