/* eslint-disable no-unused-vars */
let currentArticleId = '';
describe('Пользователь заходит на страницу статьи', () => {
  // Чтобы не переполнять базу данных лишними данными (тестов может быть тысячи штук): сначала создаем статью - затем тестируем все, что нужно - в конце удаляем статью
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${article.id}`);
    });
  });

  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });

  it('и видит содержимое статьи', () => {
    cy.getBytestId('ArticleDetails.Info').should('exist');
  });

  it('и видит список рекомендаций', () => {
    cy.getBytestId('ArticleRecommendations').should('exist');
  });

  it('и добавляет комментарий', () => {
    const comment = 'some comment';
    cy.getBytestId('ArticleDetails.Info');
    cy.getBytestId('AddCommentForm').scrollIntoView();
    cy.addComment(comment);
    cy.getBytestId('CommentCard.Content').should('have.length', 1);
  });

  it('и ставит оценку', () => {
    const rate = 5;
    cy.getBytestId('ArticleDetails.Info');
    cy.getBytestId('RatingCard').scrollIntoView();
    cy.setRate(rate, 'feedback');
    cy.get('[data-selected=true]').should('have.length', rate);
  });

  it('и ставит оценку (пример со стабом на фикстурах)', () => {
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
    const rate = 5;
    cy.getBytestId('ArticleDetails.Info');
    cy.getBytestId('RatingCard').scrollIntoView();
    cy.setRate(rate, 'feedback');
    cy.get('[data-selected=true]').should('have.length', rate);
  });
});