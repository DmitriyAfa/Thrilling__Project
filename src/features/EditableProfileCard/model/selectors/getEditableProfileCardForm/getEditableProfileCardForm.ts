import { StateSchema } from '@/app/providers/StoreProvider';

export const getEditableProfileCardForm = (state: StateSchema) => state?.editableProfileCard?.form;