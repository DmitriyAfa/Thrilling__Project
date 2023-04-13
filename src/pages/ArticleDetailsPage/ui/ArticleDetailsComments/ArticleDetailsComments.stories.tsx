import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/decorators';
import { ArticleDetailsComments } from './ArticleDetailsComments';

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
