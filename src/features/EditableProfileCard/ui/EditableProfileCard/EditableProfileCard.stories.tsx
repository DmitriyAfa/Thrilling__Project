import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditableProfileCard } from './EditableProfileCard';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatarImg from '@/shared/assets/tests/Avatar.jpeg';
import { StoreDecorator, ThemeDecorator } from '@/shared/config/storybook/decorators';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'features/editableProfileCard/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = () => <EditableProfileCard />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
  editableProfileCard: {
    form: {
      username: 'admin',
      age: 22,
      country: Country.USA,
      first: 'first',
      lastname: 'lastname',
      city: 'city',
      currency: Currency.USD,
      avatar: avatarImg,
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
      country: Country.USA,
      first: 'first',
      lastname: 'lastname',
      city: 'city',
      currency: Currency.USD,
      avatar: avatarImg,
    },
  },
})];
