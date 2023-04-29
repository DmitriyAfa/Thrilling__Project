import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/decorators';
import { Theme } from '@/shared/const/theme';
import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta molestias voluptatem, perspiciatis quis accusamus distinctio dolorem facilis? Ullam nulla excepturi dignissimos,illum nemo officiis consequatur quasi a perspiciatis sunt eum?',
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta molestias voluptatem, perspiciatis quis accusamus distinctio dolorem facilis? Ullam nulla excepturi dignissimos,illum nemo officiis consequatur quasi a perspiciatis sunt eum?',
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
