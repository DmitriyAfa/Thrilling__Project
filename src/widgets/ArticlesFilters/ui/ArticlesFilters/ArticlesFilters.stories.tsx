import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlesFilters } from './ArticlesFilters';

export default {
  title: 'shared/deprecated/ArticlesFilters',
  component: ArticlesFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesFilters>;

const Template: ComponentStory<typeof ArticlesFilters> = (args) => <ArticlesFilters {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
