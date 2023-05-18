import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Drawer } from './Drawer';

export default {
  title: 'shared/deprecated/Drawer',
  component: Drawer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
