import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { ComponentRender } from '@/shared/lib/tests/ComponentRender/ComponentRender';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { $api } from '@/shared/api/api';
import { editableProfileCardReducer } from '../../model/slice/editableProfileCardSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  id: '1',
  first: 'admin',
  age: 236,
  lastname: 'admin',
  currency: Currency.EUR,
  country: Country.BELARUS,
  city: 'City',
  username: 'admin123',
};
describe('features/EditableProfileCard', () => {
  beforeEach(() => {
    ComponentRender(<EditableProfileCard id='1' />, {
      initialState: {
        editableProfileCard: {
          readonly: true,
          data: profile,
          form: profile,
        },
        user: {
          authData: {
            id: '1',
            username: 'admin',
          },
        },
      },
      asyncReducers: {
        editableProfileCard: editableProfileCardReducer,
      },
    });
  });
  // добавляем асинхронность так как userEvent асинхронный
  test('Режим readonly должен переключиться', async () => {
    await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'));
    expect(screen.getByTestId('EditableProfileHeader.CancelButton')).toBeInTheDocument();
  });

  test('При отмене значения должны вернуться в исходное состояние', async () => {
    await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'));
    await userEvent.clear(screen.getByTestId('ProfileCard.Lastname'));

    await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'user');
    await userEvent.type(screen.getByTestId('ProfileCard.Lastname'), 'user');

    expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('user');
    expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('user');

    await userEvent.click(screen.getByTestId('EditableProfileHeader.CancelButton'));

    expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('admin');
  });

  // test('Должна появиться ошибка', async () => {
  //   await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'));

  //   await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'));

  //   await userEvent.click(screen.getByTestId('EditableProfileHeader.SaveButton'));

  //   expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
  // });

  test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
    const mockPutReq = jest.spyOn($api, 'put');

    await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'));
    await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'user');

    await userEvent.click(screen.getByTestId('EditableProfileHeader.SaveButton'));

    expect(mockPutReq).toHaveBeenCalled();
  });
});
