import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Sidebar } from './Sidebar';
import { ThemeDecorator } from 'shared/config/storybook/decorators';
import { Theme } from 'app/providers/ThemeProvider';

export default {
  title: 'widgets/Sidebar',
  component: Sidebar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};

Dark.decorators = [ThemeDecorator(Theme.DARK)];