// import '@/app/styles/index.scss';
import { Story } from '@storybook/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { addCommentFormReducer } from '@/features/AddCommentForm/testing';
import { articleCommentsListReducer } from '@/features/ArticleCommentsList/testing';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { editableProfileCardReducer } from '@/features/EditableProfileCard/testing';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  editableProfileCard: editableProfileCardReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleCommentsList: articleCommentsListReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
  <StoreProvider
    initialState={state}
    asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
  >
    <StoryComponent />
  </StoreProvider>
);
