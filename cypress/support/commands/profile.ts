/* eslint-disable no-unused-vars */

export const updateProfile = (firstname: string, lastname: string) => {
  cy.getBytestId('EditableProfileHeader.EditButton').click();
  cy.getBytestId('ProfileCard.Firstname').clear().type(firstname);
  cy.getBytestId('ProfileCard.Lastname').clear().type(lastname);
  cy.getBytestId('EditableProfileHeader.SaveButton').click();
};
export const resetProfile = (profileId: string) => cy.request({
  method: 'PUT',
  url: `http://localhost:8000/profile/${profileId}`,
  headers: { Authorization: 'assda' },
  body: {
    id: '4',
    first: 'test',
    lastname: 'user',
    age: 267,
    currency: '$',
    country: 'USA',
    city: 'New Yourk',
    username: 'testusert',
    avatar: 'https://i.pinimg.com/564x/db/40/0b/db400b34d0085ab55a6dfb47fa1f6891.jpg',
  },
});

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}