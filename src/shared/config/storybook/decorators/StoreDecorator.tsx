import '@/app/styles/index.scss';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { ReducersList } from '@/shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { articleDetailsReducer } from '@/entities/Article';
import { editableProfileCardReducer } from '@/features/EditableProfileCard';
import { addCommentFormReducer } from '@/features/AddCommentForm';
import { articleCommentsListReducer } from '@/features/ArticleCommentsList';
import { loginReducer } from '@/features/AuthByUsername';

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
