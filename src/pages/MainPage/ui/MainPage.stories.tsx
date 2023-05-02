import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainPage from './MainPage';

import { StoreDecorator, ThemeDecorator } from '@/shared/config/storybook/decorators';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'pages/MainPage',
  component: MainPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({})],
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = () => <MainPage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
