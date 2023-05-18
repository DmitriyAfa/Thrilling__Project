import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar } from './Avatar';
import AvatarImg from './Avatar.jpeg';

export default {
  title: 'shared/deprecated/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Prymary = Template.bind({});
Prymary.args = {
  size: 150,
  alt: 'Аватар',
  src: AvatarImg,
};

export const Small = Template.bind({});
Small.args = {
  size: 50,
  alt: 'Аватар',
  src: AvatarImg,
};