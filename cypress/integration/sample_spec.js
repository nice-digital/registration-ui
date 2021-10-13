describe('Navigate to RegUi homepage', () => {
  it('Finds the Register as Stakeholder link', () => {
    cy.clearCookies();
    cy.visit('/');
    cy.get('a').contains('Register as a stakeholder').click();
    cy.url().should('include', 'alpha-identity.nice.org.uk/login');
    cy.login();
    cy.wait(500);
    cy.reload();
    cy.get('h1').contains('Profile builder');
    cy.get('.checkbox__input').should('have.attr', 'checked');
  });
});
