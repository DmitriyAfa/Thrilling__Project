import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentsList } from './CommentsList';

export default {
  title: 'entities/comment/CommentsList',
  component: CommentsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentsList>;

const Template: ComponentStory<typeof CommentsList> = (args) => <CommentsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comments: [
    {
      id: '1',
      text: 'hello world',
      user: { id: '1', username: 'Rick' },
    },
    {
      id: '2',
      text: 'Hi everybody',
      user: { id: '2', username: 'Morty' },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};

export const NoComments = Template.bind({});
NoComments.args = {
  comments: [],
};