import { ComponentStory, ComponentMeta } from '@storybook/react';
import { [FTName] } from './[FTName]';

export default {
  title: 'shared/deprecated/[FTName]',
  component: [FTName],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof [FTName]>;

const Template: ComponentStory<typeof [FTName]> = (args) => < [FTName] { ...args } />;

export const Normal = Template.bind({});
Normal.args = {

};
