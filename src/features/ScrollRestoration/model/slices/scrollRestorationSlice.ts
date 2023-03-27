import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollRestorationSchema } from '../types/ScrollRestorationSchema';

const initialState: ScrollRestorationSchema = {
  scroll: {},
};

export const scrollRestorationSlice = createSlice({
  name: 'scrollRestoration',
  initialState,
  reducers: {
    setScrtollPosition: (state, action: PayloadAction<{ path: string; position: number; }>) => {
      state.scroll[action.payload.path] = action.payload.position;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: scrollRestorationActions } = scrollRestorationSlice;
export const { reducer: scrollRestorationReducer } = scrollRestorationSlice;
