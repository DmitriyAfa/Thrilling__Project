import { Flex, FlexProps } from '../Flex/Flex';

// исключаем из FlexProps свойство direction
type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = (props: HStackProps) => (
  <Flex
    direction="row"
    {...props}
  />
);