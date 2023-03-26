import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EndlessArticles } from './EndlessArticles';

export default {
  title: 'shared/EndlessArticles',
  component: EndlessArticles,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EndlessArticles>;

const Template: ComponentStory<typeof EndlessArticles> = (args) => <EndlessArticles {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
