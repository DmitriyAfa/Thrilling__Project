import { StateSchema } from 'app/providers/StoreProvider';
// State с текстом проинициализируется как пустая строка только тогда, когда state.addCommentForm?.text будет null или undefined
export const getAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';
export const getAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;
