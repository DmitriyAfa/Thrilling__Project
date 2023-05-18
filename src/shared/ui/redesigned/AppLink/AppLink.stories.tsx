import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AppLink } from './AppLink';

import { ThemeDecorator } from '@/shared/config/storybook/decorators';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/redesigned/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Prymary = Template.bind({});
Prymary.args = {
  children: 'Test',
  variant: 'primary',
};
// *I NEED REFACTORING
export const Secndary = Template.bind({});
Secndary.args = {
  children: 'Test',
  variant: 'red',
};

export const PrymaryDark = Template.bind({});
PrymaryDark.args = {
  children: 'Test',
  variant: 'primary',
};
PrymaryDark.decorators = [ThemeDecorator(Theme.DARK)];

// *I NEED REFACTORING
export const SecndaryDark = Template.bind({});
SecndaryDark.args = {
  children: 'Test',
  variant: 'red',
};
SecndaryDark.decorators = [ThemeDecorator(Theme.DARK)];
