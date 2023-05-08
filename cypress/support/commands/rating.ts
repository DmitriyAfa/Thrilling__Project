/* eslint-disable no-unused-vars */

export const setRate = (starCount = 5, feedback = 'feedback') => {
  cy.getBytestId(`StarRating.${starCount}`).click();
  cy.getBytestId('RatingCard.Input').type(feedback);
  cy.getBytestId('RatingCard.Send').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      setRate(starCount: number, feedback: string): Chainable<void>;
    }
  }
}