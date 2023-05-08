/* eslint-disable no-unused-vars */
describe('Пользователь заходит на страницу со списком статей', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('articles');
    });
  });

  it('и статьи успешно подгружаются', () => {
    cy.getBytestId('ArticleList').should('exist');
    cy.getBytestId('ArticleListItem').should('have.length.greaterThan', 3);
  });

  it('и статьи успешно подгружаются на стабах (моках / фикстурах) - фейковых запросах', () => {
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
    cy.getBytestId('ArticleList').should('exist');
    cy.getBytestId('ArticleListItem').should('have.length.greaterThan', 3);
  });

  it.skip('пример заскипанного теста', () => {
    cy.getBytestId('ArticleList').should('exist');
    cy.getBytestId('ArticleListItem').should('have.length.greaterThan', 3);
    cy.get('sdasd').should('exist');
  });
});