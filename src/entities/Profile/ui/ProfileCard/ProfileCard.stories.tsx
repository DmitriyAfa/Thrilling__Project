import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/decorators';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatarImg from '@/shared/assets/tests/Avatar.jpeg';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: 'admin',
    age: 22,
    country: Country.USA,
    first: 'first',
    lastname: 'lastname',
    city: 'city',
    currency: Currency.USD,
    avatar: avatarImg,
  },
};
Primary.decorators = [StoreDecorator({})];

export const WithError = Template.bind({});
WithError.args = {
  error: 'error',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
