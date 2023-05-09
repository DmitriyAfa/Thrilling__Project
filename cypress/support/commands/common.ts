/* eslint-disable no-unused-vars */

import { User } from '../../../src/entities/User';
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localStorage';
import { selectByTestId } from '../../helpers/selectByTestId';

/**
 * Авторизация нужна во мнегих тест кейсах.
 * Правильным подходом для тестирования авторизации является отправить запрос на сервер,
 * который вернерт нам необходимые данные для авторизации.
 * -
 * Заполнять форму в самом тесте является антипаттерном.
 */
export const login = (username: string = 'testuser', password: string = '123') => cy.request({
  method: 'POST',
  url: 'http://localhost:8000/login',
  body: {
    username,
    password,
  },
}).then(({ body }) => {
  window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
  return body;
});

export const getBytestId = (testId: string) => cy.get(selectByTestId(testId));

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<User>;
      getBytestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}