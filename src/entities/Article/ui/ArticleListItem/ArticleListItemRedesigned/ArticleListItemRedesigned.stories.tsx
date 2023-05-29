import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned';

export default {
  title: 'shared/deprecated/ArticleListItemRedesigned',
  component: ArticleListItemRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleListItemRedesigned>;

const Template: ComponentStory<typeof ArticleListItemRedesigned> = (args) => < ArticleListItemRedesigned {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
