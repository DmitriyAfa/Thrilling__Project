/* eslint-disable no-unused-vars */
import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';
import { StateSchema } from '@/app/providers/StoreProvider';

jest.mock('axios');

type ActionCreatorType<Return, Arg, RejectedValue>
  = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThun<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>;

  getState: () => StateSchema;

  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

  api: jest.MockedFunctionDeep<AxiosStatic>;

  navigate: jest.MockedFn<any>;

  /*
    initialState - для отдельных тестовых случаев зададим deafult initialState (состояние по умолчанию)
    -
    понадобится в updateProfileData.test.ts
  */
  constructor(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    initialState?: DeepPartial<StateSchema>,
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    // Возвращаем state посредством метода getState
    this.getState = jest.fn(() => initialState as StateSchema);

    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(
      this.dispatch,
      this.getState,
      {
        api: this.api,
        navigate: this.navigate,
      },
    );

    return result;
  }
}