import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleFilters } from './ArticleFilters';

export default {
  title: 'features/Article/ArticleFilters',
  component: ArticleFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleFilters>;

const Template: ComponentStory<typeof ArticleFilters> = (args) => <ArticleFilters {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
