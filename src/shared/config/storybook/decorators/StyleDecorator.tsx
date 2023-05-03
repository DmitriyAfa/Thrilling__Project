/* eslint-disable dm-fsd-rules/layer-imports */
// Данное нарушение импортов FSD исключение - это не относится к бизнес логике. Это относится к тестам
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';

export const StyleDecorator = (story: () => Story) => story();
