import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
  title: 'shared/deprecated/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => <div style={{ padding: 100 }}><Story /></div>,
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const TopLeft = Template.bind({});
TopLeft.args = {
  direction: 'top left',
  items: [
    { content: 'OneOneOneOne', value: '1' },
    { content: 'TwoTwoTwoTwo', value: '2' },
  ],
  value: 'Click',
};

export const TopRight = Template.bind({});
TopRight.args = {
  direction: 'top right',
  items: [
    { content: 'OneOneOneOne', value: '1' },
    { content: 'TwoTwoTwoTwo', value: '2' },
  ],
  value: 'Click',
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  direction: 'bottom left',
  items: [
    { content: 'OneOneOneOne', value: '1' },
    { content: 'TwoTwoTwoTwo', value: '2' },
  ],
  value: 'Click',
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  direction: 'bottom right',
  items: [
    { content: 'OneOneOneOne', value: '1' },
    { content: 'TwoTwoTwoTwo', value: '2' },
  ],
  value: 'Click',
};