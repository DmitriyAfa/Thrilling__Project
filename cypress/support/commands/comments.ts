/* eslint-disable no-unused-vars */

export const addComment = (text: string) => {
  cy.getBytestId('AddCommentForm.Input').type(text);
  cy.getBytestId('AddCommentForm.Button').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      addComment(text: string): Chainable<void>;
    }
  }
}