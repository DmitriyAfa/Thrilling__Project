import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Overlay } from './Overlay';

export default {
  title: 'shared/deprecated/Overlay',
  component: Overlay,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args) => <Overlay {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
