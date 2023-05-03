import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProfilePage from './ProfilePage';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ThemeDecorator, StoreDecorator } from '@/shared/config/storybook/decorators';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
  editableProfileCard: {
    form: {
      username: 'admin',
      age: 22,
      country: Country.BELARUS,
      lastname: 'adminich',
      first: 'asd',
      city: 'asf',
      currency: Currency.RUB,
    },
  },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  editableProfileCard: {
    form: {
      username: 'admin',
      age: 22,
      country: Country.BELARUS,
      lastname: 'adminich',
      first: 'asd',
      city: 'asf',
      currency: Currency.RUB,
    },
  },
})];
