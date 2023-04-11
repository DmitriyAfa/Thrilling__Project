import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EditableProfileHeader } from './EditableProfileHeader';

export default {
  title: 'features/editableProfileCard/EditableProfileHeader',
  component: EditableProfileHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditableProfileHeader>;

const Template: ComponentStory<typeof EditableProfileHeader> = () => <EditableProfileHeader />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
