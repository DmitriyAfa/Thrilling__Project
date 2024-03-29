## e2e тесты

e2e тесты должны проверять глобальную работоспособность приложения в связке с 
backend. Проверяет полную интеграция frontend и backend частей.

Все, что можно тестировать изолированно в frontend-части должно тестироваться с 
помощью jest, react-testing-library или с помощью скриншотных тестов (например, loki).
Потому-что e2e тесты являются "дорогими" тестами для производительности и времени. Все это потому, что есть запросы на backend + async + сохранение каких-то
данных + нестабильность работы (тот же async). Все это выходит куда "дороже" чем 
остальные виды тестов.

Как итог по e2e: unit-тестов должно быть много, а вот e2e-тесты должны писаться только для взаимодействия backend + frontend для критического фунциоанала
(намприер, сохранение профиля, авторизация, удаление/сохранение/создание данных).

#### Команды для тестов

Данные команды могут использоваться во многих тест-кейсах. Для оптимизации кода они написаны в одном месте для удобного переиспользования в разных местах.

Подробнее о командах - [папка с командами](./support/commands/commands.md)

#### Изолированные тесты 

В изолированных тестах компонент отрисовывается отдельно в браузере. То есть, не 
загружается ни чего лишнего, только компонент который необходим для тестирования.

Подробнее об изолированных тестах - [папка с изолированными тестами](./component/e2e.isolatedTesting.md)