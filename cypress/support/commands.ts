import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comments';
import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as ratingCommands from './commands/rating';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);

export { };

/*
   Упрощенный пример для тестов на фикстурах (фейковом API).
   Перепишем команду intercept для CI.
   -
   Команда может быть большая и грузить backend во время тестирования, так же
   backend может временно не работать или быть неисправным, что замедляет тестирование.
   К тому же делает его неудобным и заставляет относится менее серьезно из-за возможных ошибок сервера.
   Поэтому логично для CI делать фейковое API и тестировать с его помощью;
   -
   Предполагается переписать команду intercept или написать новую команду и передать
   туда 3-и мода:
   1.Чтение - тогда используются уже существующие фейковые данные.
   2. Запись - тогда фейковые данные для проверки передаются непосредственно в сам метод и тем самым они запишутся.
   3. API - продуктовый режим, здесь идет обращение к реальному backend;
   -
   Как итог когда будет выбран API режим к реальнмоу серверу будет всего 1 (или несколько) обращений.
   А все что нужно для режима разработки будет использовать фейковые данные, не нагружая сервер.
 */
// Cypress.Commands.overwrite('intercept', () => {
//   const FIXTURE_MODE = process.env.FIXTURE_MODE;
//   const fixtureName = req.METHOD + req.url + hash(req.body);
//   if (FIXTURE_MODE === "READ") {
//     // Считываем уже имеющиеся данные ( по хешу или другому способу обращения к данным)
//     readFixture(fixtureName)
//   }
//   if (FIXTURE_MODE === "WRITE") {
//     // получаем данные из запроса и сохраняем в отдельную папку/файл
//     createFixture(fixtureName, req.body)
//   }
//   if (FIXTURE_MODE === "API") {
//     // Считываем уже имеющиеся данные ( по хешу или другому способу обращения к данным)
//     readFixture(fixtureName)
//   }
// });