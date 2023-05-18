import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Text, TextSize, TextTheme } from './Text';

import { ThemeDecorator } from '@/shared/config/storybook/decorators';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/deprecated/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title',
  text: 'Description Description Description Description ',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'Description Description Description Description ',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Title',
  text: 'Description Description Description Description ',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: 'Title',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: 'Description Description Description Description ',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error = Template.bind({});
Error.args = {
  title: 'Error',
  text: 'Error Error Error Error ',
  theme: TextTheme.ERROR,
};

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Size L',
  text: 'Description Description Description Description ',
  size: TextSize.L,
};

export const SizeM = Template.bind({});
SizeM.args = {
  title: 'Size M',
  text: 'Description Description Description Description ',
  size: TextSize.M,
};

export const SizeS = Template.bind({});
SizeS.args = {
  title: 'Size S',
  text: 'Description Description Description Description ',
  size: TextSize.S,
};
