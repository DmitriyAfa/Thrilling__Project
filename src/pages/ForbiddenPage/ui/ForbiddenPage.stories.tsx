import { ComponentStory, ComponentMeta } from '@storybook/react';

import ForbiddenPage from './ForbiddenPage';

import { ThemeDecorator } from '@/shared/config/storybook/decorators';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'pages/ForbiddenPage',
  component: ForbiddenPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ForbiddenPage>;

const Template: ComponentStory<typeof ForbiddenPage> = () => <ForbiddenPage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
