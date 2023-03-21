import { StateSchema } from 'app/providers/StoreProvider';

export const getEditableProfileCardIsLoading = (state: StateSchema) => state?.editableProfileCard?.isLoading;