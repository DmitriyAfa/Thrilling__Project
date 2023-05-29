import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated';

export default {
  title: 'shared/deprecated/ArticleListItemDeprecated',
  component: ArticleListItemDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleListItemDeprecated>;

const Template: ComponentStory<typeof ArticleListItemDeprecated> = (args) => < ArticleListItemDeprecated {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
