import { StateSchema } from '@/app/providers/StoreProvider';

export const getEditableProfileCardValidateErrors = (state: StateSchema) => state?.editableProfileCard?.validateErrors;