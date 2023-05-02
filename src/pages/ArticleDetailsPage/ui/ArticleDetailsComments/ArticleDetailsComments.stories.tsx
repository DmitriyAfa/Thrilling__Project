import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleDetailsComments } from './ArticleDetailsComments';

import { StoreDecorator } from '@/shared/config/storybook/decorators';

export default {
  title: 'pages/Article/ArticleDetailsComments',
  component: ArticleDetailsComments,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsComments>;

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => <ArticleDetailsComments {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
