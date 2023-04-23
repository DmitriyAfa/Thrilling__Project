import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/decorators';
import withMock from 'storybook-addon-mock';
import { Article } from '@/entities/Article';
import { ArticleRecommendations } from './ArticleRecommendations';

export default {
  title: 'features/Article/ArticleRecommendations',
  component: ArticleRecommendations,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // *Storybook mock addon for RTK query
  decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendations>;

const Template: ComponentStory<typeof ArticleRecommendations> = (args) => <ArticleRecommendations {...args} />;

const article: Article = {
  id: '1',
  img: '',
  createdAt: '',
  views: 123,
  user: { id: '1', username: '123' },
  blocks: [],
  type: [],
  title: '123',
  subtitle: 'asfsa',
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
// *Storybook mock addon for RTK query
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=3`,
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' },
        { ...article, id: '3' },
      ],
    },
  ],
};

/*
  В сторибук благорадя withMock в качестве articles придет response с массивом статей и id.
  const {
    data: articles,
    isLoading,
    error,
  } = useArticleRecommendations(3);
 */