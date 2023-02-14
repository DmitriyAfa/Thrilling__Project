import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Navbar } from './Navbar';
import { ThemeDecorator } from 'shared/config/storybook/decorators';
import { Theme } from 'app/providers/ThemeProvider';

export default {
  title: 'widgets/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};

Dark.decorators = [ThemeDecorator(Theme.DARK)];