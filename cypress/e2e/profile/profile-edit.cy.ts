let profileId = '';

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('profile');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });

  it('И профиль успешно загружается', () => {
    cy.getBytestId('ProfileCard.Firstname').should('have.value', 'test');
  });
  it('И редактирует его', () => {
    const newName = 'new';
    const lastName = 'lastname';
    cy.updateProfile(newName, lastName);
    cy.getBytestId('ProfileCard.Firstname').should('have.value', newName);
    cy.getBytestId('ProfileCard.Lastname').should('have.value', lastName);
  });
});