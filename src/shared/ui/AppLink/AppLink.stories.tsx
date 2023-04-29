import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/decorators';
import { Theme } from '@/shared/const/theme';
import { AppLink, AppLinkTheme } from './AppLink';

export default {
  title: 'shared/AppLink',
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
  theme: AppLinkTheme.PRIMARY,
};

export const Secndary = Template.bind({});
Secndary.args = {
  children: 'Test',
  theme: AppLinkTheme.SECONDARY,
};

export const PrymaryDark = Template.bind({});
PrymaryDark.args = {
  children: 'Test',
  theme: AppLinkTheme.PRIMARY,
};
PrymaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecndaryDark = Template.bind({});
SecndaryDark.args = {
  children: 'Test',
  theme: AppLinkTheme.SECONDARY,
};
SecndaryDark.decorators = [ThemeDecorator(Theme.DARK)];
