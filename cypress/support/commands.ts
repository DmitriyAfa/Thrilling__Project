/* eslint-disable no-unused-vars */
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { login } from './commands/login';

/**
 * Авторизация нужна во мнегих тест кейсах.
 * Правильным подходом для тестирования авторизации является отправить запрос на сервер,
 * который вернерт нам необходимые данные для авторизации.
 * -
 * Заполнять форму в самом тесте является антипаттерном.
 */
Cypress.Commands.add('login', login);

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>
    }
  }
}

export { };