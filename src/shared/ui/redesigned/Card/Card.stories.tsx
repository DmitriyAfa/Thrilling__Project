import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Text } from '../Text';

import { Card } from './Card';

import { ThemeDecorator } from '@/shared/config/storybook/decorators';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/deprecated/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: <Text title='Title' text='Some text' />,
};

export const Dark = Template.bind({});
Dark.args = {
  children: <Text title='Title' text='Some text' />,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
  children: <Text title='Title' text='Some text' />,
};
Dark.decorators = [ThemeDecorator(Theme.ORANGE)];