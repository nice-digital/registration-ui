beforeEach(function () {
  cy.clearCookies('appSession');
  cy.visit('/');
  cy.get('a').contains('Register as a stakeholder').click();
  cy.login();
  cy.reload();
});

afterEach(function () {
  cy.logout();
});

describe('Navigate to RegUi homepage', () => {
  it('Finds the Register as Stakeholder link', () => {
    // cy.visit('/');
    // cy.get('a').contains('Register as a stakeholder').click();
    // cy.getCookie('auth0');
    // cy.url().should('include', 'alpha-identity.nice.org.uk/login');
    // cy.login();
    // cy.wait(500);
    // cy.reload();
    cy.reload();
    cy.get('h1').contains('Profile builder');
    cy.get('.checkbox__input').should('have.attr', 'checked');
  });
});
